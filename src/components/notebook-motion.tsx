"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
export function FolioThread() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to(".folio-orbit-one", { y: -180, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 2 } });
        gsap.to(".folio-orbit-two", { y: 130, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 2.5 } });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  return <div ref={root} className="folio-atmosphere" aria-hidden="true">
    <svg className="folio-thread" viewBox="0 0 1440 3200" preserveAspectRatio="none" fill="none"><path d="M1390 40C1100 200 1540 450 1310 650S1220 1050 1400 1250 1210 1600 1320 1900 1400 2180 1250 2400 1340 2870 1410 3160" /><path className="folio-thread-dashed" d="M38 300C150 600 -70 720 60 1050S-90 1550 90 1850 10 2300 60 2730 130 3000 40 3180" /></svg>
    <div className="folio-orbit folio-orbit-one"><svg viewBox="0 0 240 240" fill="none"><circle cx="120" cy="120" r="90" /><circle cx="120" cy="120" r="63" /><path d="M120 14V226M14 120H226M56 56H184V184H56Z" /><path d="M120 30L198 165H42Z" /><circle className="orbit-ink-dot" cx="120" cy="30" r="4" /></svg><span>fig. ii / form & structure</span></div>
    <div className="folio-orbit folio-orbit-two"><svg viewBox="0 0 240 240" fill="none"><ellipse cx="120" cy="120" rx="100" ry="48" /><ellipse cx="120" cy="120" rx="100" ry="48" transform="rotate(60 120 120)" /><ellipse cx="120" cy="120" rx="100" ry="48" transform="rotate(120 120 120)" /><circle cx="120" cy="120" r="75" /><circle cx="120" cy="120" r="7" fill="currentColor" /></svg><span>fig. iii / connected systems</span></div>
  </div>;
}
