"use client";
import Lightning from "@/components/visual/Lightning";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import SplitText from "gsap/SplitText";
import VerticalNavButtons from "@/components/visual/nav";
import { useIsMobile } from "@/hooks/isMobile";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicBento from "@/components/visual/MagicBento";

gsap.registerPlugin(
  ScrollToPlugin,
  ScrambleTextPlugin,
  SplitText,
  ScrollTrigger
);

type AnyTween = gsap.TweenVars & Record<string, unknown>;

export default function HeroPage() {
  const isMobile = useIsMobile();
  const devWord = "अपनत्व";
  const engWord = "Apnatva";
  const pron = "/ˈʌp.nəː.tvə/";
  const rootRef = useRef<HTMLDivElement>(null);
  const engRef = useRef<HTMLDivElement>(null);
  const pronRef = useRef<HTMLDivElement>(null);
  const meaningRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const fadeRef = React.useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(pronRef.current, { opacity: 0, y: 8 });
      gsap.set(ctaRef.current, { opacity: 0, x: -50 });
      const tl = gsap.timeline({ defaults: { ease: "power4.in" } });

      tl.to(fadeRef, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".fade-me",
          start: "top top",
          end: "+=100vh",
          scrub: true,
        },
      });

      tl.to(
        engRef.current,
        {
          duration: 3,
          scrambleText: {
            text: engWord,
            chars: "upperAndLowerCase",
            speed: 0.8,
          },
        } as AnyTween,
        0
      );
      tl.to(pronRef.current, { opacity: 1, y: 0, duration: 2 }, 0.1);
      tl.to(ctaRef.current, { opacity: 1, x: 0, duration: 1 }, ">-0.1");
    }, rootRef);
    const el = meaningRef.current;
    if (el) {
      const split = SplitText.create(".split", {
        type: "lines",
        linesClass: "overflow-hidden will-change-transform",
      });

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
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!fadeRef.current) return;
      gsap.fromTo(
        fadeRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: fadeRef.current,
            start: "top top",
            end: "bottom 6%", // or "+=100vh" for a fixed distance
            scrub: true,
          },
        }
      );
    }, fadeRef);
    return () => ctx.revert();
  }, []);
  return (
    <>
      <section className="w-full min-h-[200dvh] h-fit">
        <div
          ref={fadeRef}
          className="w-full h-full fixed z-0 pointer-events-none"
        >
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
          <div className="max-h-full items-center justify-center place-content-center w-full max-w-3xl text-center space-y-3 md:space-y-4">
            {/* 1) Devanagari — always visible */}
            <h1 className="font-semibold tracking-tight text-2xl md:text-5xl leading-[1.1] text-foreground animate-pulse">
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
        <div ref={ctaRef} className="md:top-1/3 md:left-1/15 md:absolute z-10">
          <VerticalNavButtons className="w-fit mx-auto justify-self-center md:justify-start relative" />
        </div>
        <p className="text-xs text-white text-center mt-5 md:mt-0">
          From Brain<span className="text-green-600">storms</span> to Products
        </p>
        <div className="justify-items-center mt-40 md:mt-10">
          <MagicBento />
        </div>
      </section>
    </>
  );
}
