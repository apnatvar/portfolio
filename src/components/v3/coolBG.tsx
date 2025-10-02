"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  /** number of stacked “dice” rows */
  count?: number;
  /** face labels */
  faces?: [string, string, string];
  /** base hue range (deg) applied across the stack */
  hueStart?: number; // default 130
  hueSpan?: number; // default 75
  /** base width/height of each row */
  width?: number; // px, default 400
  height?: number; // px, default 55
};

/**
 * CodeDrivenAnimation
 * - Next.js + TS version of your GSAP animation
 * - No direct DOM cloning; uses React rendering with GSAP timelines per row
 */
export default function CodeDrivenAnimation({
  count = 10,
  faces = ["TOOLS", "", "LANGUAGES"],
  hueStart = 530,
  hueSpan = 20,
  width = 80,
  height = 55,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trayRef = useRef<HTMLDivElement | null>(null);
  const dieRefs = useRef<HTMLDivElement[]>([]);
  const cubeRefs = useRef<HTMLDivElement[]>([]);
  const faceRefs = useRef<HTMLDivElement[][]>([]);

  // rotation definitions (kept from your original)
  const rots = useMemo(
    () => [
      { ry: 270, a: 0.5 },
      { ry: 0, a: 0.85 },
      { ry: 90, a: 0.4 },
      { ry: 180, a: 0.0 },
    ],
    []
  );

  // helper to set ref arrays without "any"
  const setDieRef = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    dieRefs.current[i] = el;
  };
  const setCubeRef = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    cubeRefs.current[i] = el;
  };
  const setFaceRef = (
    el: HTMLDivElement | null,
    rowIndex: number,
    faceIndex: number
  ) => {
    if (!el) return;
    if (!faceRefs.current[rowIndex]) faceRefs.current[rowIndex] = [];
    faceRefs.current[rowIndex][faceIndex] = el;
  };

  useLayoutEffect(() => {
    if (!rootRef.current || !trayRef.current) return;

    const ctx = gsap.context(() => {
      // Prepare faces: position in 3D like original gsap.set(".face"...)
      faceRefs.current.forEach((rowFaces) => {
        gsap.set(rowFaces, {
          z: width / 2,
          rotateY: (i: number) => rots[i].ry,
          transformOrigin: `50% 50% -${width / 2 + 1}px`,
        });
      });

      // Per-row timelines (like your loop/clone)
      for (let i = 0; i < count; i++) {
        const cube = cubeRefs.current[i];
        const facesEls = faceRefs.current[i] ?? [];

        const rowTL = gsap
          .timeline({
            repeat: -1,
            yoyo: true,
            defaults: { ease: "power3.inOut", duration: 1 },
          })
          .fromTo(
            cube,
            { rotateY: -90 },
            { rotateY: 90, ease: "power1.inOut", duration: 6 }
          )
          .fromTo(
            facesEls,
            {
              color: (j: number) =>
                `hsl(${(i / count) * hueSpan + hueStart}, 90%, ${
                  20 * [rots[3].a, rots[0].a, rots[1].a][j]
                }%)`,
            },
            {
              color: (j: number) =>
                `hsl(${(i / count) * hueSpan + hueStart}, 90%, ${
                  20 * [rots[0].a, rots[1].a, rots[2].a][j]
                }%)`,
            }
          )
          .to(
            facesEls,
            {
              color: (j: number) =>
                `hsl(${(i / count) * hueSpan + hueStart}, 90%, ${
                  20 * [rots[1].a, rots[2].a, rots[3].a][j]
                }%)`,
            },
            1
          )
          .progress(i / count);

        // keep a reference if you want later control (pause/resume) — not required now
        void rowTL;
      }

      // Master tray animation (same as your chained timeline at the end)
      const master = gsap.timeline();
      master
        .from(trayRef.current, {
          yPercent: -3,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        })
        .fromTo(
          trayRef.current,
          { rotate: -15 },
          {
            rotate: 15,
            duration: 40,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          },
          0
        )
        .from(
          dieRefs.current,
          {
            duration: 5,
            opacity: 0,
            stagger: { each: -0.05, ease: "power1.in" },
          },
          0
        )
        .to(
          trayRef.current,
          {
            scale: 1.2,
            duration: 20,
            ease: "power3.inOut",
            yoyo: true,
            repeat: -1,
          },
          0
        );

      // initial sizing + responsive scale (equivalent to window.onload/onresize)
      const applySizing = () => {
        const totalH = count * (height + 1); // +1 similar to your 56 w/ 55 base
        gsap.set(trayRef.current, { height: totalH });
        const ih = window.innerHeight;
        const scale = ih / totalH;
        gsap.set(rootRef.current, { scale });
      };

      applySizing();
      const onResize = () => applySizing();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, [count, height, rots, hueSpan, hueStart, width]);

  // rows (instead of cloning)
  const rows = useMemo(
    () => Array.from({ length: count }, (_, i) => i),
    [count]
  );

  return (
    <section
      ref={rootRef}
      className={`
        ${montserrat.className}
        relative mx-auto flex items-center justify-center
        overflow-hidden
        w-full min-h-full
        bg-background
      `}
      aria-label="Code Driven Animation"
    >
      <div
        ref={trayRef}
        className="relative flex flex-col items-center justify-start will-change-transform"
        style={{ width }}
      >
        {rows.map((rowIdx) => (
          <div
            key={rowIdx}
            ref={(el) => setDieRef(el, rowIdx)}
            className="relative"
            style={{
              width,
              height,
              paddingBottom: 9,
              perspective: 999,
            }}
          >
            <div
              ref={(el) => setCubeRef(el, rowIdx)}
              className="absolute inset-0 will-change-transform"
              style={{
                transformStyle:
                  "preserve-3d" as React.CSSProperties["transformStyle"],
              }}
            >
              {faces.map((label, faceIdx) => (
                <div
                  key={faceIdx}
                  ref={(el) => setFaceRef(el, rowIdx, faceIdx)}
                  className="absolute inset-0 flex items-center justify-center select-none will-change-transform"
                  style={{
                    fontSize: [60, 58, 55][faceIdx],
                    backfaceVisibility: "hidden",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
