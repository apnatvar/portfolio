"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

  useEffect(() => {
    const bootstrappedMode = document.documentElement.dataset.displayMode ?? null;
    setModeState(isDisplayMode(bootstrappedMode) ? bootstrappedMode : "creative");
    setReady(true);
  }, []);

  const setMode = useCallback((nextMode: DisplayMode) => {
    document.documentElement.dataset.displayMode = nextMode;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {
      // The visual mode still works when storage is unavailable.
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setModeState(nextMode);
  }, []);

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
