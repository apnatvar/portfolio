"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { useDisplayMode } from "./display-mode-provider";

const PROMPT_DISMISSED_KEY = "ap-portfolio-display-mode-prompt-dismissed";

export function DisplayModePrompt() {
  const { ready } = useDisplayMode();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ready) return;

    try {
      setVisible(window.localStorage.getItem(PROMPT_DISMISSED_KEY) !== "true");
    } catch {
      setVisible(true);
    }
  }, [ready]);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(PROMPT_DISMISSED_KEY, "true");
    } catch {
      // Dismissal still works for the current page when storage is unavailable.
    }
  }

  if (!ready || !visible) return null;

  return (
    <aside
      className="display-mode-prompt fixed bottom-[4.75rem] left-4 z-[54] w-[min(22rem,calc(100vw-2rem))] border bg-background p-4 shadow-xl md:bottom-[5.5rem] md:left-6"
      role="dialog"
      aria-label="Try another portfolio display mode"
    >
      <button
        type="button"
        className="display-mode-prompt-close"
        onClick={dismiss}
        aria-label="Dismiss display mode suggestion"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
      <p className="display-mode-prompt-kicker">Three ways to explore</p>
      <h2>Try another display mode.</h2>
      <p>Creative, Resume, and Swiss each present the same portfolio through a different visual lens.</p>
      <button type="button" className="display-mode-prompt-action" onClick={dismiss}>Got it</button>
    </aside>
  );
}
