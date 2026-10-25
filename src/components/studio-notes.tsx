"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
export function StudioNotes() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".studio-word", { opacity: 0.2 }, { opacity: 1, stagger: 0.15, ease: "none", scrollTrigger: { trigger: ".studio-statement", start: "top 80%", end: "bottom 40%", scrub: 0.6 } });
        gsap.from(".studio-note", { y: 70, rotation: 5, opacity: 0, stagger: 0.2, scrollTrigger: { trigger: ".studio-notes", start: "top 90%", end: "top 45%", scrub: 1 } });
        gsap.to(".studio-drift", { xPercent: -25, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.5 } });
        gsap.fromTo(".studio-loop", { strokeDasharray: 1000, strokeDashoffset: 1000 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 65%", end: "bottom 70%", scrub: 1 } });
        gsap.to(".journal-photo", { y: -18, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.4 } });
        gsap.fromTo(".notebook-draw", { strokeDasharray: 700, strokeDashoffset: 700 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "center 45%", scrub: 1 } });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  return <section id="studio" ref={root} className="studio-section">
    <div className="studio-heading"><span className="atelier-label">01 / A way of looking</span><span className="atelier-label">A small introduction</span></div>
    <h2 className="studio-statement">{"Somewhere between a sketch and a working thing.".split(" ").map((word, i) => <span key={i} className="studio-word">{word} </span>)}</h2>
    <svg className="studio-scribble" viewBox="0 0 400 100" fill="none" aria-hidden="true"><path className="studio-loop" d="M5 65C60 10 310 0 380 45S180 110 90 65 250 10 390 75" stroke="currentColor" strokeWidth="1.5" /></svg>
    <div className="studio-notes">
      <div className="studio-note-copy">
        <p className="studio-note">I’m happiest when I can follow an idea all the way through. From the first scrappy layout to the React components, the responsive details, and the strange little bug that only turns up on a phone.</p>
        <p className="studio-note">My work sits between front-end development, interface design, and technical SEO. A useful page needs a considered layout, a sound implementation, and a way for people to reach it. I like being responsible for how those pieces fit.</p>
        <span className="studio-note studio-signature">Always a work in progress,<br /><span>AP</span></span>
      </div>
      <figure className="journal-photo">
        <Image src="/3.webp" alt="Apnatva on a neon-lit city street at night" width={420} height={560} sizes="(max-width: 899px) 42vw, 220px" />
        <figcaption className="journal-caption">A night out, somewhere in the city.</figcaption>
      </figure>
      <svg className="notebook-study" viewBox="0 0 300 230" fill="none" aria-hidden="true">
        <path className="notebook-draw" d="M25 185H276M45 205V24M34 176L230 48L263 181Z" stroke="currentColor" strokeWidth="1" />
        <circle className="notebook-draw" cx="146" cy="127" r="57" stroke="currentColor" strokeWidth="1" />
        <circle className="notebook-draw" cx="146" cy="127" r="75" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 5" />
        <path className="notebook-draw" d="M45 127H263M146 24V205M72 152L220 102M84 57L218 196" stroke="currentColor" strokeWidth="0.7" />
        <path className="notebook-draw" d="M230 48V181M224 48H236M224 181H236M45 185L35 180M45 185L35 190" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </div>
    <div className="studio-drift" aria-hidden="true">A good place to get a little carried away.</div>
  </section>;
}
