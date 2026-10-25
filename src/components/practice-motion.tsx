"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type ReactNode } from "react";
gsap.registerPlugin(ScrollTrigger);

export function PracticeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".practice-connector path", { strokeDasharray: 1000, strokeDashoffset: 1000 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".practice-connector", start: "top 85%", end: "bottom 45%", scrub: 1 } });
        gsap.utils.toArray<HTMLElement>(".discipline-row").forEach(row => {
          gsap.from(row, { y: 28, opacity: .25, scrollTrigger: { trigger: row, start: "top 95%", end: "top 75%", scrub: .5 } });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  return <section ref={root} id="practice" className="technical-practice journal-section">{children}</section>;
}
