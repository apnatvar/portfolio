"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type SkillItem = {
  label: string;
};

const SKILLS: SkillItem[] = [
  { label: "Python" },
  { label: "TypeScript" },
  { label: "Next.js" },
  { label: "React" },
  { label: "JavaScript" },
  { label: "GSAP" },
  { label: "PayloadCMS" },
  { label: "Node.js" },
  { label: "PostgreSQL" },
  { label: "MongoDB" },
  { label: "Docker" },
  { label: "Git" },
  { label: "REST APIs" },
  { label: "UI/UX" },
  { label: "Automation" },
];

export default function SkillsExplosionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const promptRef = useRef<HTMLParagraphElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const prompt = promptRef.current;
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !grid || !prompt || items.length === 0) return;

    const ctx = gsap.context(() => {
      const setupItemsAtCenter = () => {
        const gridRect = grid.getBoundingClientRect();
        const gridCenterX = gridRect.left + gridRect.width / 2;
        const gridCenterY = gridRect.top + gridRect.height / 2;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenterX = rect.left + rect.width / 2;
          const itemCenterY = rect.top + rect.height / 2;

          const deltaX = gridCenterX - itemCenterX;
          const deltaY = gridCenterY - itemCenterY;

          gsap.set(item, {
            x: deltaX * 2,
            y: deltaY,
            scale: 0.2,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });
        });

        gsap.set(prompt, {
          autoAlpha: 1,
          y: 0,
        });
      };

      setupItemsAtCenter();

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(
        prompt,
        {
          autoAlpha: 0,
          y: -16,
          duration: 1.35,
        },
        0,
      ).to(
        items,
        {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 3.2,
          stagger: {
            each: 0.08,
            from: "random",
          },
        },
        0.1,
      );

      ScrollTrigger.create({
        trigger: section,
        start: "bottom 99%",
        end: "+=800",
        pin: true,
        anticipatePin: 1,
        animation: tl,
        scrub: true,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-svh overflow-hidden bg-background"
    >
      <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 md:px-8">
        <p
          ref={promptRef}
          className="font-italianno pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 text-center text-3xl text-muted-foreground uppercase sm:text-8xl"
        >
          <span className="text-9xl">T</span>ech{" "}
          <span className="text-9xl">S</span>kills <br />
        </p>

        <div
          ref={gridRef}
          className="grid h-full w-full grid-cols-2 grid-rows-8 gap-2 sm:gap-3 md:grid-cols-5 md:grid-rows-3 md:gap-4"
        >
          {SKILLS.map((skill, index) => (
            <div
              key={skill.label}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="flex items-center justify-center"
            >
              <div className="inline-flex min-h-10 items-center justify-center rounded-full border border-border/60 bg-background/80 px-3 py-2 text-center text-sm font-medium tracking-tight text-foreground shadow-sm backdrop-blur md:min-h-12 md:px-4 md:text-base">
                {skill.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
