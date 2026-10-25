"use client";

import dynamic from "next/dynamic";
const SmoothScrollProvider = dynamic(() => import("@/components/smooth-scroll"));
import { SiteFooter } from "@/components/footer";
import { usePathname } from "next/navigation";

export function DisplayModeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/portable-context") {
    return <main id="main-content" tabIndex={-1} className="font-manrope">{children}</main>;
  }

  const content = (
    <>
      <main id="main-content" tabIndex={-1} className="font-manrope">
        {children}
      </main>
      <SiteFooter />
    </>
  );

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {["/about-ap", "/hire-ap"].includes(pathname) ? <SmoothScrollProvider enabled>{content}</SmoothScrollProvider> : content}
    </>
  );
}
