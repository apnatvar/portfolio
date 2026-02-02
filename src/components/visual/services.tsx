"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { Card } from "../ui/card";

gsap.registerPlugin(ScrollTrigger, SplitText);

type ProcessStep = {
  stepLabel: string;
  title: string;
  bullets: string[];
};

export default function ProcessRolodexSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);
  const spineFillRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const cardRefs = useRef<HTMLDivElement[]>([]);
  cardRefs.current = [];

  const data: ProcessStep[] = useMemo(
    () => [
      {
        stepLabel: "Step-1",
        title: "Discovery & Requirements",
        bullets: [
          "Stakeholder goals, success metrics, constraints",
          "Audience, positioning, brand voice (draft)",
          "Sitemap draft + content inventory",
        ],
      },
      {
        stepLabel: "Step-2",
        title: "Information Architecture",
        bullets: [
          "Navigation model and page hierarchy",
          "Content model and reusable sections",
          "SEO basics: URL structure, metadata plan",
        ],
      },
      {
        stepLabel: "Step-3",
        title: "Wireframes & UX Flows",
        bullets: [
          "Low-fidelity layout structure per page",
          "Critical flows: inquiry, signup, checkout (if any)",
          "Mobile-first constraints and accessibility pass",
        ],
      },
      {
        stepLabel: "Step-4",
        title: "UI Design System",
        bullets: [
          "Typography scale, spacing, grid rules",
          "Components: buttons, cards, forms, alerts",
          "Light/dark tokens and contrast checks",
        ],
      },
      {
        stepLabel: "Step-5",
        title: "Build & Integrate CMS",
        bullets: [
          "Component implementation with reusable blocks",
          "CMS schema + validation + previews",
          "Performance budgets and image strategy",
        ],
      },
      {
        stepLabel: "Step-6",
        title: "QA, Performance, SEO",
        bullets: [
          "Cross-browser/device QA + edge cases",
          "Core Web Vitals pass and bundle trimming",
          "Indexing, sitemap/robots, structured data (as needed)",
        ],
      },
      {
        stepLabel: "Step-7",
        title: "Deploy & Monitor",
        bullets: [
          "CI/CD, environment variables, secrets",
          "CDN caching strategy and redirects",
          "Uptime + logging + analytics instrumentation",
        ],
      },
    ],
    [],
  );

  function registerCardRef(el: HTMLDivElement | null) {
    if (!el) return;
    if (!cardRefs.current.includes(el)) cardRefs.current.push(el);
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cardsWrap = cardsWrapRef.current;
    const spineFill = spineFillRef.current;
    const cards = cardRefs.current;

    if (!section || !cardsWrap || !spineFill || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(cardsWrap, { perspective: 1200 });
      gsap.set(cards, {
        position: "absolute",
        inset: 0,
        margin: "auto",
        height: "fit-content",
        transformStyle: "preserve-3d",
        opacity: 0,
        z: -250,
        rotateX: 35,
        pointerEvents: "none",
      });

      const split = new SplitText(headingRef.current, {
        type: "words",
      });

      gsap.from(split.words, {
        x: 300,
        opacity: 0,
        ease: "power3.out",
        stagger: {
          each: 0.1,
          from: "start",
        },
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
          scrub: true,
        },
      });

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (m) => {
          if (m.conditions?.mobile) {
            ScrollTrigger.getAll().forEach((t) => {
              if (t?.vars?.trigger === section) t.kill();
            });

            gsap.set(spineFill, { scaleY: 1, transformOrigin: "top" });
            gsap.set(cards, { clearProps: "all" });
            return;
          }

          const perCard = 1;

          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${Math.max(900, cards.length * 700)}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                gsap.set(spineFill, {
                  scaleY: self.progress,
                  transformOrigin: "top",
                });
              },
            },
          });

          cards.forEach((card, i) => {
            const t0 = i * perCard;
            tl.fromTo(
              card,
              { opacity: 0, y: 0, z: -260, rotateX: 38 },
              { opacity: 1, y: -30, z: 0, rotateX: 0, duration: 0.35 },
              t0,
            );
            tl.to(card, { opacity: 1, duration: 0.25 }, t0 + 0.35);
            tl.to(
              card,
              {
                opacity: 0,
                y: 240,
                z: 80,
                rotateX: -18,
                duration: 0.4,
                ease: "power2.in",
              },
              t0 + 0.3,
            );
          });

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    }, section);

    return () => ctx.revert();
  }, [data.length]);

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-4">
        <div className="relative z-0 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h2
            ref={headingRef}
            className="text-center font-libre tracking-wide text-6xl md:text-5xl font-extralight text-green-600 my-6"
          >
            Simplifying Project Timelines
          </h2>
          <p className="text-md md:text-xs text-center text-amber-400 font-orbitron mb-2">
            Plan → Design → Build → Deploy
          </p>
        </div>

        <div className="relative mt-8 grid gap-10 md:grid-cols-[64px_1fr]">
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-border" />
            <div
              ref={spineFillRef}
              className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-foreground"
              style={{ transform: "scaleY(0)", transformOrigin: "top" }}
            />
          </div>

          <div className="relative">
            <div
              ref={cardsWrapRef}
              className="relative hidden min-h-[60vh] w-full md:block"
            >
              {data.map((item) => (
                <Card
                  key={item.stepLabel}
                  ref={registerCardRef}
                  className="mx-auto w-full max-w-2xl rounded-2xl border border-green-600 bg-background p-6 shadow-sm font-space-grotestk"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {item.stepLabel}
                      </p>
                      <h3 className="text-xl font-semibold leading-tight font-libre">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4">
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground">
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-6 md:hidden">
              {data.map((item) => (
                <Card
                  key={item.stepLabel}
                  className="w-full rounded-2xl border border-green-600 bg-card p-5 shadow-sm"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {item.stepLabel}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
