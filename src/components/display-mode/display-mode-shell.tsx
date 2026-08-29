"use client";

import SmoothScrollProvider from "@/components/smooth-scroll";
import { SiteFooter } from "@/components/footer";
import { DisplayModeSwitcher } from "./display-mode-switcher";
import { DisplayModePrompt } from "./display-mode-prompt";
import { useDisplayMode } from "./display-mode-provider";
import { usePathname } from "next/navigation";

export function DisplayModeShell({ children }: { children: React.ReactNode }) {
  const { mode, ready } = useDisplayMode();
  const pathname = usePathname();

  if (pathname === "/portable-context") {
    return <main className="font-manrope">{children}</main>;
  }

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
