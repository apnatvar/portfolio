"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export type FlowImage = {
  id: string;
  src: string; // you may need to allow the domain in next.config.js if remote
  alt?: string;
  href?: string; // optional link wrapper
  aspect?: number; // width/height (e.g., 4/3 = 1.333). Defaults: random pleasant ratio
};
const MOCK: FlowImage[] = [
  {
    id: "1",
    src: "/mountain.svg",
    alt: "Emerald sari",
    href: "https://example.com/a",
    aspect: 4 / 5,
  },
  { id: "2", src: "/mountain.svg", alt: "Crimson lehenga", aspect: 3 / 4 },
  { id: "3", src: "/mountain.svg", alt: "Portrait" },
  { id: "4", src: "/mountain.svg", alt: "Street" },
  { id: "5", src: "/mountain.svg", alt: "Mountains", aspect: 16 / 10 },
  { id: "6", src: "/mountain.svg", alt: "Studio" },
  { id: "7", src: "/mountain.svg", alt: "City lights" },
  { id: "8", src: "/mountain.svg", alt: "Textures" },
  { id: "9", src: "/mountain.svg", alt: "Candid" },
  { id: "10", src: "/ap-icon.svg", alt: "Editorial" },
];

type Props = {
  images?: FlowImage[];
  columns?: 2 | 3 | 4;
  scrollSpan?: string;
  maxSkew?: number;
  baseTravel?: number;
  heightClass?: string;
  gapClass?: string;
  radiusClass?: string;
};

const FlowingGallery: React.FC<Props> = ({
  images = MOCK,
  columns = 3,
  scrollSpan = `${Math.floor(images.length / 3)}50`,
  maxSkew = 14,
  baseTravel = 90,
  heightClass = "h-[100dvh]",
  gapClass = "gap-4 md:gap-6",
  radiusClass = "rounded-xl",
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const killAll = useRef<(() => void) | null>(null);

  const cols = useMemo(() => {
    const count = Math.max(2, Math.min(4, columns));
    const arr: FlowImage[][] = Array.from({ length: count }, () => []);
    images.forEach((img, i) => arr[i % count].push(img));
    return arr;
  }, [images, columns]);

  const setItemRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    itemRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    itemRefs.current.forEach((el) => gsap.killTweensOf(el));
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === section || st.vars.scroller === section)
        st.kill();
    });

    const speeds: number[] = itemRefs.current.map(() =>
      gsap.utils.random(1, 1.001)
    );
    const scales: number[] = itemRefs.current.map(() =>
      gsap.utils.random(0.92, 1.06)
    );

    gsap.set(itemRefs.current, {
      scale: (i: number) => scales[i],
      transformOrigin: "50% 100%",
      willChange: "transform, opacity",
      opacity: 0.9,
      rotateY: 20,
      rotateX: 10,
      rotateZ: 1,
      skewY: 3,
    });
    const tl = gsap.timeline({
      paused: true,
    });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${scrollSpan}%`, // e.g. "+=250%"
      pin: true,
      scrub: true,
      pinSpacing: false,
      anticipatePin: 1,
      fastScrollEnd: true,
      onUpdate(self) {
        const p = self.progress; // 0..1
        const skew = gsap.utils.clamp(
          -maxSkew,
          maxSkew,
          (self.getVelocity() / 1000) * maxSkew
        );
        itemRefs.current.forEach((el, i) => {
          const travel = baseTravel * speeds[i];
          const y = p * travel;
          gsap.set(el, {
            yPercent: -y,
            skewY: skew,
            stagger: 0.1,
            rotateZ: 1,
          });
        });
      },
    });

    const floatTweens: gsap.core.Tween[] = itemRefs.current.map((el) =>
      gsap.to(el, {
        x: () =>
          Math.random() > 0.5
            ? `+=${gsap.utils.random(-40, -20, 10)}`
            : `+=${gsap.utils.random(20, 40, 10)}`,
        duration: gsap.utils.random(2.2, 3.4),
        yoyo: true,
        repeat: -1,
        ease: "linear",
      })
    );

    const fadeCTX = gsap.context(() => {
      itemRefs.current.forEach((itemRef) => {
        gsap.to(itemRef, {
          opacity: 0.5,
          duration: 0.15,
          skewY: 0,
          stagger: { each: 0.02, from: "random" },
          scrollTrigger: {
            trigger: itemRef,
            start: "top top",
            end: "bottom 50%",
            scrub: true,
          },
        });
      });
    });

    killAll.current = () => {
      st.kill();
      fadeCTX.kill();
      floatTweens.forEach((t) => t.kill());
      tl.kill();
    };

    return () => {
      killAll.current?.();
    };
  }, [images, scrollSpan, maxSkew, baseTravel, itemRefs, sectionRef]);

  const gridTemplate =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  const normalizedCols = useMemo(
    () =>
      cols.map((col) =>
        col.map((img) => ({
          ...img,
          aspect:
            img.aspect ??
            [1, 4 / 5, 3 / 4, 4 / 3][Math.floor(Math.random() * 4)],
        }))
      ),
    [cols]
  );
  let idx = 0;
  return (
    <>
      <section
        ref={sectionRef}
        className={`relative w-full ${heightClass} bg-background text-[#f5f5f5] overflow-hidden`}
        aria-label="Scroll-pinned flowing gallery"
      >
        <div className="pointer-events-none p-[40dvh] flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight font-unbounded text-green-600 select-none z-22 ">
            Travel Memoirs
          </h2>
          <p className="text-xs text-amber-400 font-orbitron text-center">
            Crafting experiences, on-screen and off.
          </p>
        </div>
      </section>
      <section className={`relative min-w-dvw h-fit bg-transparent z-10`}>
        <div ref={gridRef} className={`relative z-10 h-full px-4 md:px-8`}>
          <div
            className={`grid ${gridTemplate} ${gapClass} auto-rows-min h-full items-end`}
          >
            {normalizedCols.map((col, cIdx) => (
              <div
                key={`col-${cIdx}`}
                className="flex flex-col h-full justify-end gap-1"
              >
                {col.map((img) => {
                  const localIndex = idx++;
                  const AR = img.aspect || 1.3333;
                  const content = (
                    <div
                      ref={setItemRef}
                      className={`relative ${radiusClass} overflow-hidden shadow-md shadow-black/30 perspective-near mb-[25dvh]`}
                      style={{
                        aspectRatio: `${AR} / 1`,
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <Image
                        src={img.src || "/change-this.svg"}
                        alt={img.alt ?? "photo"}
                        fill
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 33vw"
                        priority={localIndex < 4}
                        style={{ objectFit: "cover" }}
                        className="z-10"
                      />
                    </div>
                  );

                  return (
                    <div key={img.id} className="mb-4 md:mb-6 last:mb-0">
                      {img.href ? (
                        <Link
                          href={img.href}
                          aria-label={img.alt ?? "photo link"}
                        >
                          {content}
                        </Link>
                      ) : (
                        content
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FlowingGallery;
