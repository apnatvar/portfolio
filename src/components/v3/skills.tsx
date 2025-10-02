"use client";

import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
// icons
import {
  SiTypescript,
  SiPayloadcms,
  SiKubernetes,
  SiSupabase,
  SiVercel,
  SiShadcnui,
} from "react-icons/si";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
import { FaPython, FaDatabase, FaGitAlt, FaDocker } from "react-icons/fa6";
import CodeDrivenAnimation from "./coolBG";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type IconCmp = React.ComponentType<{ className?: string }>;
type SkillItem = { name: string; icon: IconCmp };

const SKILLS_DATA: SkillItem[] = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: FaPython },
  { name: "SQL", icon: FaDatabase },
  { name: "PayloadCMS", icon: SiPayloadcms },
  { name: "Tailwind", icon: RiTailwindCssFill },
  { name: "Next.js", icon: RiNextjsFill },
  { name: "Shadcn", icon: SiShadcnui },
  { name: "Git", icon: FaGitAlt },
  { name: "Docker", icon: FaDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Supabase", icon: SiSupabase },
  { name: "Vercel", icon: SiVercel },
];

export default function SkillPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [leftSkills, rightSkills] = useMemo(() => {
    const mid = Math.ceil(SKILLS_DATA.length / 2);
    return [SKILLS_DATA.slice(0, mid), SKILLS_DATA.slice(mid)];
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftCol = leftColRef.current!;
      const rightCol = rightColRef.current!;
      const leftItems = Array.from(
        leftCol.querySelectorAll<HTMLElement>('[data-skill-item="left"]')
      );
      const rightItems = Array.from(
        rightCol.querySelectorAll<HTMLElement>('[data-skill-item="right"]')
      );

      // photo: simple fade-in from bottom
      if (centerRef.current) {
        gsap.from(centerRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: centerRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // base styles for items
      gsap.set([...leftItems, ...rightItems], {
        opacity: 0.3,
        scale: 0.86,
        x: 0,
        willChange: "transform",
      });

      // dial-like scaler/offset on scroll
      const AMP = () => Math.min(36, Math.max(20, window.innerWidth * 0.04)); // x amplitude (px)
      const maxScale = 1.14;
      const minScale = 0.84;

      const updateDial = () => {
        const centerY = window.innerHeight / 2;
        const band = window.innerHeight * 0.42; // active band height

        const updateSet = (items: HTMLElement[], side: "left" | "right") => {
          items.forEach((el) => {
            const r = el.getBoundingClientRect();
            const mid = r.top + r.height / 2;
            const n = gsap.utils.clamp(-1, 1, (mid - centerY) / band); // -1..1
            // cosine gives 1 at center, -1 at edges => nice dial curve
            const c = Math.cos(Math.PI * n);

            const x = (side === "left" ? -1 : 1) * AMP() * c;
            const s = gsap.utils.mapRange(
              1,
              0,
              minScale,
              maxScale
            )(Math.abs(n)); // peak at center
            const o = gsap.utils.mapRange(1, 0, 0.28, 1)(Math.abs(n));

            gsap.to(el, {
              x,
              scale: s,
              opacity: o,
              duration: 0.12,
              ease: "power2.out",
              overwrite: true,
            });
          });
        };

        updateSet(leftItems, "left");
        updateSet(rightItems, "right");
      };
      // tie updates to scroll & refresh
      ScrollTrigger.create({
        trigger: rootRef.current!,
        start: "top bottom",
        end: "bottom top",
        onUpdate: updateDial,
        onRefresh: updateDial,
        scrub: true,
      });

      // initial
      updateDial();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-[140svh] bg-background text-foreground overflow-x-hidden pt-36"
    >
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div
          className="
            grid grid-cols-1 md:grid-cols-[1fr_minmax(260px,400px)_1fr]
            items-center gap-10 md:gap-12
          "
        >
          {/* LEFT COLUMN (scrolls naturally, animated by dial calc) */}
          <div
            ref={leftColRef}
            className="order-1 md:order-1 flex flex-col items-center justify-center gap-8 md:gap-12"
          >
            {leftSkills.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={`left-${s.name}-${i}`}
                  data-skill-item="left"
                  className="flex items-center gap-4 md:gap-5"
                >
                  <Icon className="h-6 w-6 md:h-7 md:w-7 text-muted-foreground" />
                  <span className="text-base md:text-lg font-medium">
                    {s.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CENTER PHOTO (simple fade-in from bottom) */}
          <div ref={centerRef} className="hidden md:grid md:order-2 max-h-full">
            <CodeDrivenAnimation />
          </div>

          {/* RIGHT COLUMN (scrolls naturally, animated by dial calc) */}
          <div
            ref={rightColRef}
            className="order-2 md:order-3 flex flex-col items-center justify-center gap-8 md:gap-12"
          >
            {rightSkills.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={`right-${s.name}-${i}`}
                  data-skill-item="right"
                  className="flex items-center gap-4 md:gap-5"
                >
                  <span className="text-base md:text-lg font-medium">
                    {s.name}
                  </span>
                  <Icon className="h-6 w-6 md:h-7 md:w-7 text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
