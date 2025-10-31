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
    src: "https://live.staticflickr.com/65535/54888664057_55bbe2d3e2_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54888664057/in/dateposted-public/",
    alt: "17887716397094171",
    aspect: 1.0,
  },
  {
    id: "2",
    src: "https://live.staticflickr.com/65535/54888664062_9dbc7d2440_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54888664062/in/dateposted-public/",
    alt: "17875899428254786",
    aspect: 1,
  },
  {
    id: "4",
    src: "https://live.staticflickr.com/65535/54889541331_2873982e01_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54889541331/in/dateposted-public/",
    alt: "17867156662585940",
    aspect: 0.8,
  },
  {
    id: "5",
    src: "https://live.staticflickr.com/65535/54888664092_aaa53443d5_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54888664092/in/dateposted-public/",
    alt: "17866820963288583",
    aspect: 0.8,
  },
  {
    id: "6",
    src: "https://live.staticflickr.com/65535/54889832925_c9c528a0ab_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54889832925/in/dateposted-public/",
    alt: "17855304025610906",
    aspect: 0.8,
  },
  {
    id: "7",
    src: "https://live.staticflickr.com/65535/54889783374_0a5897d701_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54889783374/in/dateposted-public/",
    alt: "17846217435413300",
    aspect: 0.8,
  },
  {
    id: "8",
    src: "https://live.staticflickr.com/65535/54889541366_fbe6d75d55_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54889541366/in/dateposted-public/",
    alt: "3",
    aspect: 16 / 9,
  },
  {
    id: "10",
    src: "https://live.staticflickr.com/65535/54889541396_4efc4630c6_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54889541396/in/dateposted-public/",
    alt: "18394570492138723",
    aspect: 0.75,
  },
  {
    id: "11",
    src: "https://live.staticflickr.com/65535/54888664117_e3b797ff2f_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54888664117/in/dateposted-public/",
    alt: "18271660087264956",
    aspect: 0.8,
  },
  {
    id: "12",
    src: "https://live.staticflickr.com/65535/54889541401_59944113a3_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54889541401/in/dateposted-public/",
    alt: "18104725240483422",
    aspect: 16 / 12,
  },
  {
    id: "13",
    src: "https://live.staticflickr.com/65535/54889832985_b5908850ef_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54889832985/in/dateposted-public/",
    alt: "18092023000645450",
    aspect: 1,
  },
  {
    id: "14",
    src: "https://live.staticflickr.com/65535/54889832980_544b3e2282_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54889832980/in/dateposted-public/",
    alt: "17996441557983266",
    aspect: 16 / 9,
  },
  {
    id: "15",
    src: "https://live.staticflickr.com/65535/54889833005_0f991d1e7f_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54889833005/in/dateposted-public/",
    alt: "17946597058311749",
    aspect: 1.0,
  },
  {
    id: "16",
    src: "https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg",
    href: "https://www.flickr.com/photos/203680033@N06/54847521978/in/dateposted-public/",
    alt: "Snapseed",
    aspect: 0.75,
  },
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
  const mm = gsap.matchMedia();

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
    mm.add("(min-width: 800px)", () => {
      ScrollTrigger.create({
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
      mm.kill();
      fadeCTX.kill();
      floatTweens.forEach((t) => t.kill());
      tl.kill();
    };

    return () => {
      killAll.current?.();
    };
  }, [images, scrollSpan, maxSkew, baseTravel, itemRefs, sectionRef, mm]);

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
        className={`relative w-full ${heightClass} bg-background overflow-hidden`}
        aria-label="Scroll-pinned flowing gallery"
      >
        <div className="relative w-full h-full pointer-events-none md:p-[40dvh] flex flex-col items-center">
          <Link
            href="https://www.flickr.com/photos/203680033@N06/54889783404/in/dateposted-public/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://live.staticflickr.com/65535/54889783404_fbc7f64c95_b.jpg"
              alt="A photo of AP with a Kanji background"
              fill
              className="absolute inset-0 object-cover opacity-10 object-[60%_50%] md:object-[100%_63%]"
            />
          </Link>
          <h2 className="pt-[40%] md:pt-0 text-3xl md:text-6xl font-semibold tracking-tight font-unbounded text-green-600 text-center select-none z-22 ">
            Between Work
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
                      className={`relative ${radiusClass} overflow-hidden shadow-md shadow-black/30 perspective-near md:mb-[25dvh]`}
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
