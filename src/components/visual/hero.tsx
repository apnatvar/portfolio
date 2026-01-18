"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import SplitText from "gsap/SplitText";
import VerticalNavButtons from "@/components/visual/nav";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import Antigravity from "../Antigravity";

gsap.registerPlugin(
  ScrollToPlugin,
  ScrambleTextPlugin,
  SplitText,
  ScrollTrigger,
);

type AnyTween = gsap.TweenVars & Record<string, unknown>;

export default function HeroPage() {
  const [hoveredWordIdx, setHoveredWordIdx] = useState<number>(4);

  const devWord: { [key: string]: string } = {
    Apnatva: "अपनत्व",
    Singh: "सिंह",
    Rawat: "रावत",
  };
  const engWord = "Apnatva";
  const pron = "/ˈʌp.nəː.tvə/";

  const [showContent, setShowContent] = useState(false);

  const devRefs = useRef<HTMLHeadingElement[]>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const engRef = useRef<HTMLDivElement | null>(null);
  const pronRef = useRef<HTMLDivElement | null>(null);
  const meaningRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);

  const addToDevRefs = (el: HTMLImageElement) => {
    if (el) {
      devRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(pronRef.current, { opacity: 0, y: 8 });
      gsap.set(ctaRef.current, { opacity: 0, x: -50 });
      const tl = gsap.timeline({
        defaults: { ease: "power4.in" },
        onComplete: () => setShowContent(true),
      });

      if (fadeRef.current) {
        tl.to(fadeRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: fadeRef.current,
            start: "top top",
            end: "bottom 20%",
            scrub: true,
          },
        });
      }
      engRef.current?.classList.add("text-secondary-foreground");
      tl.to(
        engRef.current,
        {
          duration: 2,
          scrambleText: {
            text: engWord,
            chars: "upperAndLowerCase",
            speed: 0.8,
          },
        } as AnyTween,
        0,
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
        split.lines[0].classList.add(
          "animate-pulse",
          "hover:animate-none",
          "text-accent-foreground",
          "hover:text-secondary-foreground",
          "text-lg",
          "md:text-xl",
        );
      if (split.lines[1])
        split.lines[1].classList.add(
          "animate-pulse",
          "hover:animate-none",
          "text-accent-foreground",
          "hover:text-secondary-foreground",
          "text-lg",
          "md:text-xl",
        );
      if (split.lines[2])
        split.lines[2].classList.add(
          "animate-pulse",
          "hover:animate-none",
          "text-accent-foreground",
          "hover:text-secondary-foreground",
          "text-lg",
          "md:text-xl",
        );

      gsap.from(split.lines, {
        yPercent: 200,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });
    }
    if (devRefs.current.length === 0) return;

    devRefs.current.forEach((el) => {
      const split = new SplitText(el, {
        type: "chars",
        charsClass: "split-char",
      });

      split.chars.forEach((char) => {
        gsap.from(char, {
          opacity: 0.1,
          scale: gsap.utils.random(0, 3, 1),
          transformOrigin: `center ${gsap.utils.random(10, 100, 10)}%`,
          x: gsap.utils.random(-100, 100, 10),
          rotateZ: gsap.utils.random(-180, 180, 90),
          duration: 4,
          ease: "power3.out",
          stagger: {
            each: 1,
            from: "end",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [engWord, fadeRef, pronRef, ctaRef, meaningRef, engRef, rootRef, devRefs]);

  return (
    <>
      <section className="w-full mb-20">
        <div className="w-full h-full absolute inset-0 z-5 opacity-40">
          <Antigravity
            count={910}
            magnetRadius={15}
            ringRadius={15}
            waveSpeed={1.9}
            waveAmplitude={4.5}
            particleSize={1.5}
            lerpSpeed={0.38}
            color="#43a047"
            autoAnimate={true}
            particleVariance={0.7}
            rotationSpeed={0.1}
            depthFactor={2.3}
            pulseSpeed={4.5}
            particleShape="sphere"
            fieldStrength={30}
          />
        </div>
        <div
          ref={rootRef}
          className="mx-auto relative z-10 px-4 py-6 md:py-2 pointer-events-none"
        >
          <div className="relative min-h-[70vh] md:min-h-[75vh] flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
            <div className="min-w-2/3">
              {Object.keys(devWord).map((word, idx) => (
                <div key={idx} className={cn("relative w-fit", `z-${idx}`)}>
                  <h1
                    ref={addToDevRefs}
                    onMouseEnter={() => setHoveredWordIdx(idx)}
                    onMouseLeave={() =>
                      setHoveredWordIdx((v) => (v === idx ? 4 : v))
                    }
                    className="font-amita text-foreground/90 leading-[2] md:leading-[1.18] tracking-[3.3] text-8xl md:text-9xl pointer-events-auto"
                  >
                    {devWord[word]}
                  </h1>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "hidden md:block",
                      "absolute top-0 -right-15 z-10",
                      "pointer-events-none",
                      "text-xs font-orbitron whitespace-nowrap",
                      "transition-all duration-1000 ease-out",
                      hoveredWordIdx === idx
                        ? "translate-x-0"
                        : "-translate-x-10",
                      showContent ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {hoveredWordIdx === idx ? word : word[0]}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "md:hidden block",
                      "absolute top-8 -right-15 z-10",
                      "pointer-events-none",
                      "text-xs font-orbitron whitespace-nowrap",
                      "transition-opacity duration-1000 ease-out",
                      showContent ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {word}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex md:flex-col md:min-w-1/3 flex-row-reverse md:gap-5 justify-between md:py-10">
              <div className="text-right">
                <div
                  ref={engRef}
                  className="font-libre font-medium tracking-tight text-muted-foreground will-change-transform text-5xl leading-none"
                  aria-label={`${engWord} (animated)`}
                >
                  {engWord}
                </div>

                <div
                  ref={pronRef}
                  className="mt-3 italic text-accent-foreground leading-tight text-3xl"
                >
                  {pron}
                </div>

                <div
                  ref={meaningRef}
                  className="mt-6 font-unbounded leading-[1.35] text-foreground text-[clamp(0.95rem,1.2vw,1.05rem)] split pointer-events-auto"
                >
                  1. sense of belonging
                  <br />
                  2. digital designer
                  <br />
                  3. oneness
                </div>
              </div>
              <div className="flex justify-end">
                <VerticalNavButtons className="w-fit relative pointer-events-auto" />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-amber-400 font-orbitron text-center mt-5 md:mt-0">
          Searching for memorable designs.
        </p>
      </section>
    </>
  );
}
