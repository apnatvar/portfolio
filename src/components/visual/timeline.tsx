"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

export type TimelineMilestone = {
  /** 0–100 where the milestone sits along the line */
  positionPct: number;
  title: string;
  subtitle?: string;
  /** small tag shown above the dot */
  tag?: string;
  /** optional id for stable keys/test-ids */
  id?: string;
};

export interface HorizontalTimelineProps {
  title?: string;
  milestones: TimelineMilestone[];
  /** px distance to scroll while pinned; increase for slower fill */
  scrollDistance?: number;
  /** when true, shows subtle alternating card positions for variety */
  alternateCards?: boolean;
  className?: string;
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export default function HorizontalTimeline({
  title = "Timeline",
  milestones,
  scrollDistance = 1600,
  alternateCards = true,
  className,
}: HorizontalTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    dotsRef.current = dotsRef.current.slice(0, milestones.length);
    const root = rootRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!root || !track || !fill) return;

    // clear any previous ScrollTriggers if this component remounts
    ScrollTrigger.getAll().forEach((t) => {
      if (t.vars?.id?.toString().startsWith("htl-")) t.kill();
    });

    // baseline state
    gsap.set(fill, { width: "0%" });
    dotsRef.current.forEach(
      (el) => el && gsap.set(el, { scale: 0.1, opacity: 0 })
    );
    cardsRef.current.forEach(
      (el) =>
        el &&
        gsap.set(el, {
          autoAlpha: 0,
          yPercent: -8,
        })
    );

    // pin when the section center hits viewport center
    // then scrub through the distance to fill the line
    const master = gsap.timeline({
      scrollTrigger: {
        id: "htl-master",
        trigger: root,
        start: "center center", // when section center aligns with viewport center
        end: `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // progress of the master timeline drives the fill % (0 → 100)
    master.to(fill, { width: "100%", ease: "none" }, 0);

    // for each milestone, reveal the dot + card as the fill passes it
    milestones.forEach((m, i) => {
      const pct = clamp01(m.positionPct / 100 - 0.5);
      const dot = dotsRef.current[i];
      const card = cardsRef.current[i];

      // little marker on the master timeline at that progress
      master.addLabel(`m_${i}`, pct);

      if (dot) {
        master.to(
          dot,
          { scale: 1, opacity: 1, duration: 0.15, ease: "power2.out" },
          `m_${i}`
        );
      }
      if (card) {
        master.to(
          card,
          { autoAlpha: 1, yPercent: 0, duration: 0.25, ease: "power2.out" },
          `m_${i}+=0.02`
        );
      }
    });

    // subtle grey-to-foreground tint on the whole track as soon as we pin
    const tint = gsap.to(track, {
      filter: "grayscale(0%)",
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
      scrollTrigger: {
        id: "htl-tint",
        trigger: root,
        start: "center center",
      },
    });

    return () => {
      master.kill();
      tint.kill();
    };
  }, [milestones, scrollDistance]);

  return (
    <div
      ref={rootRef}
      className={clsx("relative w-full", "text-foreground", className)}
      aria-label={title}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <header className="mb-8 sm:mb-12">
          <h2 className="text-lg text-center tracking-tight sm:text-sm mb-10">
            Keep Scrolling
          </h2>
        </header>

        {/* TRACK */}
        <div
          ref={trackRef}
          className={clsx(
            "relative min-h-1/3 sm:min-h-3/4", // vertical space for cards
            "opacity-90",
            "filter grayscale"
          )}
        >
          {/* base line */}
          <div className="absolute left-0 right-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-muted-foreground/30" />

          {/* fill line */}
          <div
            ref={fillRef}
            className="absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-primary"
            style={{ width: "0%" }}
          />

          {/* milestones (dots + cards) */}
          {milestones.map((m, i) => {
            const leftPct = `${clamp01(m.positionPct / 100) * 100}%`;
            const above = alternateCards ? i % 2 === 0 : true; // alternate positions or always above
            return (
              <div
                key={m.id ?? `${i}-${m.title}`}
                className="absolute top-0 left-0 h-full w-full"
              >
                {/* dot */}
                <div
                  ref={(el: HTMLDivElement): void => {
                    dotsRef.current[i] = el;
                  }}
                  className="absolute -mt-[6px] h-[18px] w-[18px] -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow"
                  style={{ left: leftPct, top: "50%" }}
                  aria-hidden
                />

                {/* tag */}
                {m.tag ? (
                  <div
                    className={clsx(
                      "absolute -translate-x-1/2",
                      above ? "bottom-[calc(50%+18px)]" : "top-[calc(50%+18px)]"
                    )}
                    style={{ left: leftPct }}
                  >
                    <Badge variant="secondary">{m.tag}</Badge>
                  </div>
                ) : null}

                {/* card */}
                <div
                  ref={(el: HTMLDivElement): void => {
                    cardsRef.current[i] = el;
                  }}
                  className={clsx(
                    "absolute w-[min(82vw,22rem)] -translate-x-1/2",
                    above ? "bottom-[calc(50%+48px)]" : "top-[calc(50%+48px)]"
                  )}
                  style={{ left: leftPct }}
                >
                  <Card className="shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg">
                        {m.title}
                      </CardTitle>
                      {m.subtitle ? (
                        <p className="text-muted-foreground text-sm">
                          {m.subtitle}
                        </p>
                      ) : null}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-xs">
                        This detail fades in as the progress reaches this point.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
