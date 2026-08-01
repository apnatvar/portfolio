"use client";

import SmoothScrollProvider from "@/components/smooth-scroll";
import { SiteFooter } from "@/components/footer";
import { DisplayModeSwitcher } from "./display-mode-switcher";
import { DisplayModePrompt } from "./display-mode-prompt";
import { useDisplayMode } from "./display-mode-provider";

export function DisplayModeShell({ children }: { children: React.ReactNode }) {
  const { mode, ready } = useDisplayMode();

  if (!ready) {
    return <div className="min-h-dvh bg-background" aria-hidden="true" />;
  }

  const content = (
    <main className="font-narrow">
      {children}
      <SiteFooter />
    </main>
  );

  return (
    <>
      {mode === "creative" ? (
        <SmoothScrollProvider>{content}</SmoothScrollProvider>
      ) : (
        content
      )}
      <DisplayModePrompt />
      <DisplayModeSwitcher />
    </>
  );
}
