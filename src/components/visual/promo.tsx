"use client";

import * as React from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
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

const MOCK_STATS: StatItem[] = [
  { label: "Components", value: 128, suffix: "+" },
  { label: "Demos", value: 42 },
  { label: "Variants", value: 76 },
  { label: "Benchmarks", value: 19 },
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
        trigger: sectionRef.current,
        start: "top 90%",
        end: "top top",
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
        start: "top 50%",
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
      {/* div - 1 */}
      <div className="border-dashed">
        <div className="p-4 md:p-6">
          <p
            ref={splitTextRef}
            className="text-sm text-muted-foreground leading-relaxed text-center font-space-grotestk"
          >
            Something I observed in my learning journey was I would initially
            build what was `cool`. I would find a bunch of designs and
            animations and cram them all together and think I made the greatest
            thing ever[1,2,3 (add links)]. I realised that good design has
            purpose, cohesion and is not merely `attractive`. So I built a
            collection{" "}
            <Link
              href="https://modelcontextprotocol.io/docs/getting-started/intro"
              target="_blank"
              rel="noreferrer"
            >
              <FaLink className="inline-block text-amber-400 font-orbitron text-xs" />
            </Link>{" "}
            of the possible designs just to push the limits of what I can
            actually build. This serves as my personal registry which I will
            integrate into an{" "}
            <Link
              href="https://modelcontextprotocol.io/docs/getting-started/intro"
              target="_blank"
              rel="noreferrer"
            >
              <span className="underline underline-offset-2 hover:text-teal-500 decoration-teal-500">
                MCP
              </span>{" "}
              <FaLink className="inline-block text-amber-400 font-orbitron text-xs" />
            </Link>{" "}
            so I can build more than just basic components with GenAI. Something
            extra that my components have is that I try ot have each one be
            dynamically constructed i.e. no data is hard-coded making it easy to
            reuse.
          </p>
        </div>
      </div>
      <div ref={separatorRef}>
        <Separator className=" bg-teal-500" />
      </div>

      {/* div - 2 */}
      <div
        className={cn(
          "flex flex-row flex-wrap gap-3",
          "[&>*]:min-w-[180px] [&>*]:grow [&>*]:shrink-0"
        )}
      >
        {MOCK_STATS.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-green-600 font-syncopate"
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
