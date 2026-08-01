"use client";

import { FileText, Grid3X3, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  type DisplayMode,
  useDisplayMode,
} from "./display-mode-provider";

const options: Array<{
  mode: DisplayMode;
  label: string;
  Icon: typeof Sparkles;
}> = [
  { mode: "creative", label: "Creative", Icon: Sparkles },
  { mode: "resume", label: "Resume", Icon: FileText },
  { mode: "swiss", label: "Swiss", Icon: Grid3X3 },
];

export function DisplayModeSwitcher() {
  const { mode, ready, setMode } = useDisplayMode();

  if (!ready) return null;

  return (
    <fieldset
      className="display-mode-switcher fixed bottom-4 left-4 z-[55] flex items-center gap-1 rounded-full border p-1 shadow-lg md:bottom-6 md:left-6"
      aria-label="Portfolio display mode"
    >
      <legend className="sr-only">Portfolio display mode</legend>
      {options.map(({ mode: optionMode, label, Icon }) => {
        const active = mode === optionMode;

        return (
          <button
            key={optionMode}
            type="button"
            aria-pressed={active}
            aria-label={`${label} display mode`}
            onClick={() => setMode(optionMode)}
            className={cn(
              "display-mode-option inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:px-3",
              active && "is-active",
            )}
          >
            <Icon aria-hidden="true" className="size-3.5" />
            <span className="max-sm:sr-only">{label}</span>
          </button>
        );
      })}
    </fieldset>
  );
}
