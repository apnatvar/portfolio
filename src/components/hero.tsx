"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroGridReveal() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-entrance", { y: 38, opacity: 0, stagger: 0.12, duration: 1.1, ease: "power3.out" });
        gsap.to(".hero-line-one", { xPercent: -12, rotate: -5, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
        gsap.to(".hero-line-two", { xPercent: 13, rotate: 4, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.3 } });
        gsap.to(".hero-orbit", { rotation: 170, y: 100, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.5 } });
        gsap.to(".hero-footnote", { y: -65, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.7 } });
        gsap.to(".hero-portrait", { y: -90, rotate: 3, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.2 } });
        gsap.fromTo(".hero-rule", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 70%", scrub: true } });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <section ref={root} id="profile" data-first-section className="atelier-hero">
      <div className="hero-topline hero-entrance"><span>Apnatva Singh Rawat</span><span>Next.js developer & designer / Technical SEO</span></div>
      <div className="hero-composition">
        <p className="hero-aside hero-entrance">Hello, I’m AP.<br />Front-end, design & SEO.<br />Based in India.</p>
        <figure className="hero-portrait hero-entrance">
          <div className="portrait-mount"><Image src="/6.webp" alt="AP sitting beside a wall of design prints" width={300} height={400} sizes="(max-width: 899px) 140px, 220px" priority /><span className="portrait-cross portrait-cross-one" aria-hidden="true">+</span><span className="portrait-cross portrait-cross-two" aria-hidden="true">+</span></div>
          <figcaption>A face to put to the initials.</figcaption>
        </figure>
        <h1 aria-label="A little particular." className="atelier-title hero-entrance"><span className="hero-line-one">A little</span>{" "}<span className="hero-line-two">particular.</span></h1>
        <div className="hero-orbit" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="46" /><circle cx="60" cy="60" r="28" /><path d="M60 0V120M0 60H120M13 13L107 107M13 107L107 13M20 20H100V100H20ZM60 14L100 84H20Z" /><path d="M13 60A47 47 0 0 1 60 13" strokeWidth="2" /></svg><span>fig. i / a small study</span></div>
        <div className="hero-footnote hero-entrance"><span className="atelier-label">A note on the work</span><p>I design and build React and Next.js front-ends for content-rich websites, catalogues, and useful tools. The layout, the loading, and the technical SEO all belong in the same conversation. I like being responsible for how those pieces fit.</p><Link href="#practice" className="atelier-link">A closer look at the craft <ArrowUpRight size={17} /></Link></div>
      </div>
      <div className="hero-bottom hero-entrance"><a href="#practice">The design, the code, the search layer <ArrowDown size={15} /></a><span>React / Next.js / TypeScript / Technical SEO</span></div>
      <div className="hero-rule" />
    </section>
  );
}
