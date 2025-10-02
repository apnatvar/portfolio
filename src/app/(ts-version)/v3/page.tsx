"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Button } from "@/components/ui/button";
import SplitText from "gsap/SplitText";
import SkillPage from "@/components/v3/skills";
import SocialShowcase from "@/components/v3/socials";

gsap.registerPlugin(ScrollToPlugin, ScrambleTextPlugin, SplitText);

type AnyTween = gsap.TweenVars & Record<string, unknown>;

export default function Page() {
  // ---- Content (feel free to change) ----
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
      gsap.set(ctaRef.current, { opacity: 0, y: 16 });

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
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, ">-0.1");
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
        split.lines[0].classList.add("text-accent-foreground", "md:text-lg");
      if (split.lines[1])
        split.lines[1].classList.add("text-secondary-foreground", "md:text-lg");

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

  // ---- Scroll helpers (GSAP-only) ----
  const scrollToId = (hash: `#${string}`) => {
    gsap.to(window, {
      duration: 1,
      ease: "power2.out",
      scrollTo: { y: hash, offsetY: 12 },
    } as AnyTween);
  };

  return (
    <>
      {/* HERO */}
      <section
        ref={rootRef}
        className="container mx-auto px-4 py-16 md:py-24 flex max-h-[100svh] text-foreground items-center justify-center"
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
            2. oneness
          </div>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-4"
          >
            <Button
              size="sm"
              onClick={() => scrollToId("#hello")}
              className="rounded-2xl"
              variant="ghost"
            >
              Socials
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => scrollToId("#socials")}
              className="rounded-2xl"
            >
              Say Hello
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => scrollToId("#work")}
              className="rounded-2xl"
            >
              Work
            </Button>
          </div>
        </div>
      </section>

      {/* Target sections (placeholders for now) */}
      <section
        id="hello"
        className="container mx-auto px-4 py-24 md:py-32 min-h-[70svh] flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-2">
            Hello
          </h2>
          <p className="text-muted-foreground">
            This is the “Say Hello” section.
          </p>
        </div>
      </section>

      <section
        id="socials"
        className="container mx-auto px-4 py-24 md:py-32 min-h-[70svh] flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-accent-foreground mb-2">
            Socials
          </h2>
          <p className="text-muted-foreground">Links and handles live here.</p>
        </div>
      </section>

      <section
        id="work"
        className="container mx-auto px-4 py-24 md:py-32 min-h-[70svh] flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-secondary-foreground mb-2">
            Work
          </h2>
          <p className="text-muted-foreground">
            Selected projects and case studies.
          </p>
        </div>
      </section>
      <SkillPage />
      <SocialShowcase />
    </>
  );
}
