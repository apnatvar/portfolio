"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type DisplayMode = "creative" | "resume" | "swiss";

const STORAGE_KEY = "ap-portfolio-display-mode";
const DISPLAY_MODES: DisplayMode[] = ["creative", "resume", "swiss"];

type DisplayModeContextValue = {
  mode: DisplayMode;
  ready: boolean;
  setMode: (mode: DisplayMode) => void;
};

const DisplayModeContext = createContext<DisplayModeContextValue | null>(null);

function isDisplayMode(value: string | null): value is DisplayMode {
  return DISPLAY_MODES.includes(value as DisplayMode);
}

export const displayModeBootstrapScript = `
  try {
    var storedMode = localStorage.getItem("${STORAGE_KEY}");
    var validMode = storedMode === "resume" || storedMode === "swiss" || storedMode === "creative";
    document.documentElement.dataset.displayMode = validMode ? storedMode : "creative";
  } catch (_) {
    document.documentElement.dataset.displayMode = "creative";
  }
`;

export function DisplayModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<DisplayMode>("creative");
  const [ready, setReady] = useState(false);
  const pendingScrollRestore = useRef<{ id: string | null; top: number; y: number } | null>(null);

  useEffect(() => {
    const bootstrappedMode = document.documentElement.dataset.displayMode ?? null;
    setModeState(isDisplayMode(bootstrappedMode) ? bootstrappedMode : "creative");
    setReady(true);
  }, []);

  const setMode = useCallback((nextMode: DisplayMode) => {
    if (nextMode === mode) return;

    const hashId = window.location.hash.slice(1);
    const viewportCenter = document.elementFromPoint(
      window.innerWidth / 2,
      window.innerHeight / 2,
    );
    const landmark = viewportCenter?.closest<HTMLElement>("section[id], #history");
    const hashAnchor = hashId ? document.getElementById(hashId) : null;
    const hashBounds = hashAnchor?.getBoundingClientRect();
    const visibleHashAnchor = hashBounds && hashBounds.top < window.innerHeight && hashBounds.bottom > 0 ? hashAnchor : null;
    const anchor = window.scrollY < 80 ? null : landmark ?? visibleHashAnchor;

    pendingScrollRestore.current = {
      id: anchor?.id ?? null,
      top: anchor?.getBoundingClientRect().top ?? 0,
      y: window.scrollY,
    };
    document.documentElement.dataset.displayMode = nextMode;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {
      // The visual mode still works when storage is unavailable.
    }
    setModeState(nextMode);
  }, [mode]);

  useEffect(() => {
    const savedPosition = pendingScrollRestore.current;
    if (!savedPosition) return;

    pendingScrollRestore.current = null;
    const anchor = savedPosition.id ? document.getElementById(savedPosition.id) : null;
    const top = anchor
      ? window.scrollY + anchor.getBoundingClientRect().top - savedPosition.top
      : savedPosition.y;

    window.scrollTo({ top, left: 0, behavior: "auto" });
  }, [mode]);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.displayMode = mode;
  }, [mode, ready]);

  const value = useMemo(() => ({ mode, ready, setMode }), [mode, ready, setMode]);

  return (
    <DisplayModeContext.Provider value={value}>
      {children}
    </DisplayModeContext.Provider>
  );
}

export function useDisplayMode() {
  const context = useContext(DisplayModeContext);

  if (!context) {
    throw new Error("useDisplayMode must be used within DisplayModeProvider");
  }

  return context;
}
