"use client";

import SmoothScrollProvider from "@/components/smooth-scroll";
import { SiteFooter } from "@/components/footer";
import { DisplayModeSwitcher } from "./display-mode-switcher";
import { DisplayModePrompt } from "./display-mode-prompt";
import { useDisplayMode } from "./display-mode-provider";
import { usePathname } from "next/navigation";

export function DisplayModeShell({ children }: { children: React.ReactNode }) {
  const { mode } = useDisplayMode();
  const pathname = usePathname();

  if (pathname === "/portable-context") {
    return <main id="main-content" tabIndex={-1} className="font-manrope">{children}</main>;
  }

  const content = (
    <>
      <main id="main-content" tabIndex={-1} className="font-narrow">
        {children}
      </main>
      <SiteFooter />
    </>
  );

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SmoothScrollProvider enabled={mode === "creative"}>{content}</SmoothScrollProvider>
      <DisplayModePrompt />
      <DisplayModeSwitcher />
    </>
  );
}
