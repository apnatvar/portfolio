"use client";
import Lightning from "@/components/visual/Lightning";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import SplitText from "gsap/SplitText";
import VerticalNavButtons from "@/components/visual/nav";
import { useIsMobile } from "@/hooks/isMobile";

gsap.registerPlugin(ScrollToPlugin, ScrambleTextPlugin, SplitText);

type AnyTween = gsap.TweenVars & Record<string, unknown>;

export default function Page() {
  const isMobile = useIsMobile();
  const devWord = "अपनत्व"; // Devanagari (always visible)
  const engWord = "Apnatva"; // English (scramble)
  const pron = "/ˈʌp.nəː.tvə/"; // Enunciation (fade-in)

  // ---- Refs ----
  const rootRef = useRef<HTMLDivElement>(null);
  const engRef = useRef<HTMLDivElement>(null);
  const pronRef = useRef<HTMLDivElement>(null);
  const meaningRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // ---- Animations ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states for animated lines
      gsap.set(pronRef.current, { opacity: 0, y: 8 });
      gsap.set(ctaRef.current, { opacity: 0, x: -50 });

      // Timeline to orchestrate hero text
      const tl = gsap.timeline({ defaults: { ease: "power4.in" } });

      // Scramble English word
      tl.to(
        engRef.current,
        {
          duration: 3,
          // Scramble to the final english text
          scrambleText: {
            text: engWord,
            chars: "upperAndLowerCase",
            speed: 0.8,
          },
        } as AnyTween,
        0
      );

      // Enunciation fade-in (after a short beat)
      tl.to(pronRef.current, { opacity: 1, y: 0, duration: 2 }, 0.1);

      // CTAs pop in
      tl.to(ctaRef.current, { opacity: 1, x: 0, duration: 1 }, ">-0.1");
    }, rootRef);
    const el = meaningRef.current;
    if (el) {
      // create line splits and style lines differently
      const split = SplitText.create(".split", {
        type: "lines",
        linesClass: "overflow-hidden will-change-transform",
      });

      // optional per-line styling
      if (split.lines[0])
        split.lines[0].classList.add("text-accent-foreground", "md:text-sm");
      if (split.lines[1])
        split.lines[1].classList.add("text-secondary-foreground", "md:text-sm");
      if (split.lines[2])
        split.lines[2].classList.add("text-accent-foreground", "md:text-sm");

      gsap.from(split.lines, {
        yPercent: 200,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });
    }

    return () => ctx.revert();
  }, [engWord]);

  return (
    <section className="w-full h-[550dvh]">
      <div className="w-full h-full fixed z-0">
        <Lightning
          hue={100}
          xOffset={isMobile ? -0.8 : -1.8}
          speed={0.8}
          intensity={isMobile ? 1 : 2}
          size={2}
        />
      </div>
      <div
        ref={rootRef}
        className="container mx-auto px-4 py-16 md:py-24 flex text-foreground items-center justify-center z-10 relative"
      >
        <div className="w-full max-w-3xl text-center space-y-3 md:space-y-4">
          {/* 1) Devanagari — always visible */}
          <h1 className="font-semibold tracking-tight text-2xl md:text-5xl leading-[1.1] text-foreground">
            {devWord}
          </h1>

          {/* 2) English — scrambled text */}
          <div
            ref={engRef}
            className="font-medium tracking-tight text-1xl md:text-2xl leading-[1.1] text-primary will-change-transform"
            aria-label={`${engWord} (animated)`}
          >
            {/* ScrambleText will replace this */}▮
          </div>

          {/* 3) Enunciation — fade in place */}
          <div
            ref={pronRef}
            className="italic text-sm md:text-lg text-muted-foreground"
          >
            {pron}
          </div>

          {/* 4) Meanings — split (by line) reveal */}
          <div
            ref={meaningRef}
            className="mt-3 md:mt-4 space-y-[1/2] md:space-y-1 split"
          >
            1. sense of belonging
            <br />
            2. marketing technologist
            <br />
            3. oneness
          </div>
        </div>
      </div>
      <div ref={ctaRef} className="md:top-1/3 md:left-1/15 md:absolute">
        <VerticalNavButtons className=" z-10 w-fit  mx-auto justify-self-center md:justify-start relative" />
      </div>
    </section>
  );
}
