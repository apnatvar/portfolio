"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      if (!wrapper.current || !content.current) return;
      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: .8,
        smoothTouch: false,
        normalizeScroll: false,
      });
      const anchor = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
        if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;
        let target: HTMLElement | null = null;
        try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
        if (!target) return;
        event.preventDefault();
        history.pushState(null, "", url.hash);
        if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
        smoother.scrollTo(target, true, "top 96px");
      };
      document.addEventListener("click", anchor, true);
      return () => { document.removeEventListener("click", anchor, true); smoother.kill(); };
    });
    return () => media.revert();
  }, []);
  return <div ref={wrapper} data-smooth-wrapper><div ref={content} data-smooth-content>{children}</div></div>;
}
