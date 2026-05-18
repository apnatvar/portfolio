"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type ScrollRibbonBackgroundProps = {
  className?: string;
};

export function ScrollRibbonBackground({
  className = "",
}: ScrollRibbonBackgroundProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ribbonOneRef = useRef<SVGPathElement | null>(null);
  const ribbonTwoRef = useRef<SVGPathElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const ribbonOne = ribbonOneRef.current;
    const ribbonTwo = ribbonTwoRef.current;

    if (!root || !ribbonOne || !ribbonTwo) return;

    const ctx = gsap.context(() => {
      gsap.set([ribbonOne, ribbonTwo], {
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=1700%",
          scrub: 1.2,
        },
      });

      tl.to(
        ribbonOne,
        {
          attr: {
            d: "M -120 620 C 160 420, 260 180, 520 280 C 820 400, 760 720, 1120 560 C 1380 440, 1520 180, 1780 300",
          },
          rotate: 4,
          scale: 1.08,
          ease: "none",
        },
        0,
      )
        .to(
          ribbonTwo,
          {
            attr: {
              d: "M -160 780 C 180 520, 420 820, 680 560 C 900 340, 1080 460, 1260 680 C 1440 900, 1600 620, 1780 520",
            },
            rotate: -3,
            scale: 1.04,
            ease: "none",
          },
          0,
        )
        .to(
          root,
          {
            yPercent: -8,
            ease: "none",
          },
          0,
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1728 1117"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient
            id="ribbon-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="hsl(var(--foreground))"
              stopOpacity="0.08"
            />
            <stop
              offset="35%"
              stopColor="hsl(var(--foreground))"
              stopOpacity="0.22"
            />
            <stop
              offset="70%"
              stopColor="hsl(var(--foreground))"
              stopOpacity="0.12"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--foreground))"
              stopOpacity="0.05"
            />
          </linearGradient>

          <linearGradient
            id="ribbon-highlight"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="hsl(var(--background))"
              stopOpacity="0.4"
            />
            <stop
              offset="50%"
              stopColor="hsl(var(--foreground))"
              stopOpacity="0.18"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--background))"
              stopOpacity="0.24"
            />
          </linearGradient>

          <filter id="soft-blur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <path
          ref={ribbonOneRef}
          d="M -120 560 C 180 360, 280 140, 560 240 C 840 340, 780 660, 1120 500 C 1380 380, 1500 140, 1780 260"
          fill="none"
          stroke="url(#ribbon-gradient)"
          strokeWidth="92"
          strokeLinecap="round"
          opacity="0.85"
        />

        <path
          ref={ribbonTwoRef}
          d="M -160 840 C 160 600, 400 900, 660 620 C 860 400, 1080 520, 1240 740 C 1420 980, 1600 700, 1780 600"
          fill="none"
          stroke="url(#ribbon-gradient)"
          strokeWidth="42"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
