"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Logic,", "Beautifully"];

export default function LessIsMoreTransition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const circle = circleRef.current;

    if (!section || !text || !circle) return;

    const ctx = gsap.context(() => {
      gsap.set(circle, {
        scale: 0,
        opacity: 0,
        borderRadius: "9999px",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        text,
        {
          scale: 3.18,
          letterSpacing: "0.25em",
          duration: 0.95,
          ease: "none",
        },
        0,
      )
        .to(
          circle,
          {
            scale: 12,
            duration: 0.65,
            opacity: 1,
            ease: "power1.inOut",
          },
          0.38,
        )
        .to(
          text,
          {
            scale: 1.42,
            opacity: 0,
            letterSpacing: "0.75em",
            filter: "blur(16px) contrast(2)",
            duration: 0.35,
            ease: "power2.inOut",
          },
          0.58,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-dvh overflow-hidden text-[#f5f0e8]"
      >
        <div
          ref={circleRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-[18vmax] -translate-x-1/2 -translate-y-1/2 bg-foreground"
        />

        <div className="relative z-20 flex h-full items-center justify-center px-5">
          <h2
            ref={textRef}
            className="
              text-center leading-[0.82]
              text-transparent
              animated-gradient              
              bg-clip-text
              text-[clamp(4.5rem,12.8vw,12.5rem)]
              md:whitespace-nowrap
              max-md:max-w-dvw
              max-md:text-[clamp(2.2rem,24vw,5.5rem)]
              will-change-auto transform-gpu font-manufacturing-consent py-4 transition-all
            "
          >
            {WORDS.join(" ")}
          </h2>
        </div>
      </section>
    </>
  );
}
