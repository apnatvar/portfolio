"use client";

import * as React from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";
import CustomEase from "gsap/CustomEase";
import { FaLink } from "react-icons/fa6";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, CustomEase);

type StatItem = {
  label: string;
  value: number;
  suffix?: string; // e.g., "+", "k", "%"
};

function daysSinceDate(targetDate: Date): number {
  const today = new Date(); // Get the current date
  const timeDifference = today.getTime() - targetDate.getTime(); // Difference in milliseconds
  const millisecondsPerDay = 1000 * 60 * 60 * 24; // Milliseconds in one day

  // Calculate the number of days and round down to get whole days
  const daysSince = Math.floor(timeDifference / millisecondsPerDay);

  return daysSince;
}

const MOCK_STATS: StatItem[] = [
  { label: "Components", value: 128, suffix: "+" },
  { label: "Blocks", value: 42, suffix: "+" },
  {
    label: "Days Spent",
    value: daysSinceDate(new Date("2025-08-13")),
    suffix: "+",
  },
];

export default function PromoPreviewSection() {
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const separatorRef = useRef<HTMLDivElement | null>(null);
  const splitTextRef = useRef<HTMLParagraphElement | null>(null);
  const addtoValueRefs = (el: HTMLImageElement) => {
    if (el) {
      valueRefs.current.push(el);
    }
  };
  useEffect(() => {
    if (
      !sectionRef.current ||
      !separatorRef.current ||
      !valueRefs.current ||
      !splitTextRef.current
    )
      return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: separatorRef.current,
        start: "top 90%",
        end: "top 10%",
        invalidateOnRefresh: true,
        scrub: true,
      },
    });
    tl.from(
      separatorRef.current,
      {
        scaleX: 0,
        ease: "none",
      },
      0
    );

    const split = new SplitText(splitTextRef.current, { type: "lines" });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        scrub: false,
      },
    });
    tl2.from(split.lines, {
      y: 30,
      opacity: 0,
      stagger: -0.4,
    });

    valueRefs.current.forEach((el, idx) => {
      const target = MOCK_STATS[idx]?.value ?? 0;
      const obj = { n: 0 };
      tl2.to(
        obj,
        {
          n: target,
          duration: 5,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.084,0.61 0.052,0.728 0.118,0.782 0.194,0.844 0.374,1 1,1 "
          ),
          onUpdate: () => {
            if (!el) return;
            el.textContent = Math.floor(obj.n).toString();
          },
        },
        0
      );
    });

    return () => {
      tl2.revert();
      tl.revert();
    };
  }, [sectionRef, valueRefs, separatorRef]);

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col gap-4 max-w-dvw p-6 border-2 border-background"
      aria-label="Promo preview library"
    >
      <div className="border-dashed">
        <div className="p-4 md:p-6">
          <p
            ref={splitTextRef}
            className="text-lg text-muted-foreground leading-relaxed text-center font-space-grotestk"
          >
            My{" "}
            <Link
              href="https://modelcontextprotocol.io/docs/getting-started/intro"
              target="_blank"
              rel="noreferrer"
            >
              <span className="underline underline-offset-2 hover:text-teal-500 decoration-teal-500">
                UI Component Library
              </span>
              <FaLink className="inline-block text-amber-400 font-orbitron text-xs" />
            </Link>{" "}
            was initially to showcase what I can build, letting clients `shop`
            sections for their sites, while acting as a foundation for
            refinement. Built with Shadcn UI and Tailwind, it&apos;s dynamic,
            reusable, and theme-ready. A eureka moment led to me working to
            integrate{" "}
            <Link
              href="https://modelcontextprotocol.io/docs/getting-started/intro"
              target="_blank"
              rel="noreferrer"
            >
              <span className="underline underline-offset-2 hover:text-teal-500 decoration-teal-500">
                MCP
              </span>
              <FaLink className="inline-block text-amber-400 font-orbitron text-xs" />
            </Link>
            . It&apos;ll evolve into an AI-driven design system trained to
            create with my taste. Currently the library only hosts simple
            components, the blocks get creative, and full websites take it
            further.
          </p>
        </div>
      </div>
      <div ref={separatorRef}>
        <Separator className=" bg-teal-500" />
      </div>

      <div className="flex flex-col flex-wrap md:grid md:grid-cols-3 gap-3">
        {MOCK_STATS.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-green-600 font-orbitron"
          >
            <div className="flex items-center justify-between p-4">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.label}
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  ref={addtoValueRefs}
                  className="text-2xl font-semibold tabular-nums"
                  aria-live="polite"
                  aria-label={`${item.label} count`}
                >
                  0
                </span>
                {item.suffix ? (
                  <span className="text-base font-medium text-muted-foreground">
                    {item.suffix}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
