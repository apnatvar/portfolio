"use client";

import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, Observer);

type InfinitePinnedWordsProps = {
  words?: string[];
  sideLabelLeft?: string;
  sideLabelRight?: string;
};

const VISIBLE_RADIUS = 4;
const STEP_PX = 72;
const ANIMATION_DURATION = 0.55;
const SEO_CAPABILITIES = [
  "Web Design",
  "Creative Development",
  "Typography",
  "Small Useful Tools",
  "Interaction Design",
  "Automation",
  "Writing",
  "Things Worth Making",
];

export default function InfinitePinnedWords({
  words = SEO_CAPABILITIES,
  sideLabelLeft = "Home",
  sideLabelRight = "Hire me",
}: InfinitePinnedWordsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const repeatedWords = useMemo(() => {
    if (words.length < 3) {
      return [...words, ...words, ...words];
    }

    return words;
  }, [words]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !viewport || items.length === 0) return;

    const media = gsap.matchMedia(section);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const wrapIndex = gsap.utils.wrap(0, repeatedWords.length);

      const getVisualState = (distance: number) => {
        const abs = Math.abs(distance);

        if (abs === 0) {
          return {
            y: -25,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            zIndex: 10,
          };
        }

        if (abs === 1) {
          return {
            y: distance * STEP_PX - 25,
            scale: 0.72,
            opacity: 0.55,
            filter: "blur(1px)",
            zIndex: 8,
          };
        }

        if (abs === 2) {
          return {
            y: distance * STEP_PX - 25,
            scale: 0.54,
            opacity: 0.28,
            filter: "blur(5px)",
            zIndex: 6,
          };
        }

        if (abs === 3) {
          return {
            y: distance * STEP_PX - 25,
            scale: 0.38,
            opacity: 0.14,
            filter: "blur(10px)",
            zIndex: 4,
          };
        }

        return {
          y: distance * STEP_PX - 25,
          scale: 0.26,
          opacity: 0.06,
          filter: "blur(20px)",
          zIndex: 2,
        };
      };

      const shortestSignedDistance = (
        from: number,
        to: number,
        total: number,
      ) => {
        let delta = to - from;
        const half = total / 2;

        if (delta > half) delta -= total;
        if (delta < -half) delta += total;

        return delta;
      };

      const render = (nextIndex: number, immediate = false) => {
        activeIndexRef.current = wrapIndex(nextIndex);

        items.forEach((item, index) => {
          const distance = shortestSignedDistance(
            activeIndexRef.current,
            index,
            repeatedWords.length,
          );

          const clampedDistance =
            Math.abs(distance) > VISIBLE_RADIUS
              ? Math.sign(distance) * (VISIBLE_RADIUS + 1)
              : distance;

          const state = getVisualState(clampedDistance);
          const isActive = distance === 0;

          if (immediate) {
            gsap.set(item, state);
          } else {
            gsap.to(item, {
              ...state,
              duration: ANIMATION_DURATION,
              ease: "power3.out",
              overwrite: true,
            });
        }

        item.setAttribute("data-active", isActive ? "true" : "false");
        item.setAttribute("aria-hidden", isActive ? "false" : "true");
      });
    };

    const move = (direction: 1 | -1) => {
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      render(activeIndexRef.current + direction);

      gsap.delayedCall(ANIMATION_DURATION * 0.8, () => {
        isAnimatingRef.current = false;
      });
    };

    render(0, true);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
      // scrub: true,
      anticipatePin: 1,
    });

    const observer = Observer.create({
      target: viewport,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: false,
      lockAxis: true,
      onUp: () => move(-1),
      onDown: () => move(1),
      onLeft: () => move(-1),
      onRight: () => move(1),
    });

    return () => {
      observer.kill();
      trigger.kill();
      isAnimatingRef.current = false;
      items.forEach((item) => {
        item.removeAttribute("data-active");
        item.removeAttribute("aria-hidden");
      });
    };
    });

    return () => media.revert();
  }, [repeatedWords]);

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh w-full overflow-hidden bg-background text-foreground motion-reduce:h-auto motion-reduce:min-h-dvh motion-reduce:overflow-visible"
      aria-label="Infinite highlighted word list"
    >
      <h2 className="sr-only">Services and capabilities</h2>
      <ul className="sr-only">{words.map((word) => <li key={word}>{word}</li>)}</ul>
      <div className="md:grid h-full w-full md:grid-cols-[1fr_6fr_1fr] items-center px-4 md:px-8 lg:px-12 motion-reduce:flex motion-reduce:h-auto motion-reduce:min-h-dvh motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-2 motion-reduce:py-16">
        <aside className="max-md:hidden flex h-full items-center justify-center motion-reduce:hidden">
          <Link href={"/"}>
            {" "}
            <p className="select-none text-xs uppercase tracking-[0.35em] text-muted-foreground md:text-sm hover:underline underline-offset-2">
              {sideLabelLeft}
            </p>
          </Link>
        </aside>

        <div className="relative mx-auto flex h-full w-full items-center justify-center motion-reduce:static motion-reduce:h-auto motion-reduce:w-full motion-reduce:flex-[1_1_100%]">
          <div
            ref={viewportRef}
            aria-hidden="true"
            className="relative h-full w-full overflow-hidden motion-reduce:static motion-reduce:flex motion-reduce:h-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-2 motion-reduce:overflow-visible"
          >
            {repeatedWords.map((word, index) => (
              <div
                key={`${word}-${index}`}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center will-change-transform motion-reduce:static motion-reduce:w-auto motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:will-change-auto"
              >
                <span className="block text-balance px-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl data-[active=true]:text-primary motion-reduce:rounded-[var(--radius)] motion-reduce:border motion-reduce:border-border motion-reduce:bg-card motion-reduce:px-3 motion-reduce:py-2 motion-reduce:text-base motion-reduce:font-medium motion-reduce:md:text-lg">
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>

        <aside className="max-md:hidden flex h-full items-center justify-center motion-reduce:hidden">
          <Link href="/hire-ap">
            <p className="select-none text-xs uppercase tracking-[0.35em] text-muted-foreground md:text-sm hover:underline underline-offset-2">
              {sideLabelRight}
            </p>
          </Link>
        </aside>
      </div>
    </section>
  );
}
