"use client";

import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
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
import Link from "next/link";

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

      if (centerRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: centerRef.current!,
              start: "top 80%",
              end: "bottom 30%",
              scrub: 1,
              invalidateOnRefresh: true,
              toggleActions: "restart",
            },
          })
          .fromTo(
            centerRef.current!,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, ease: "power4.out" }
          )
          .to(centerRef.current!, { y: -38, opacity: 0, ease: "power4.in" });
      }

      gsap.set([...leftItems, ...rightItems], {
        opacity: 0.3,
        scale: 0.86,
        x: 0,
        willChange: "transform",
      });

      const AMP = () => Math.min(36, Math.max(20, window.innerWidth * 0.04));
      const maxScale = 1.14;
      const minScale = 0.84;

      const updateDial = () => {
        const centerY = window.innerHeight / 2;
        const band = window.innerHeight * 0.42;

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
      className="relative min-h-[140dvh] bg-background text-foreground overflow-x-hidden my-20"
    >
      <section className="relative container mx-auto px-4 py-16 md:py-24 z-1">
        <div
          className="
            grid grid-cols-1 md:grid-cols-[1fr_minmax(260px,400px)_1fr]
            items-center gap-10 md:gap-12
          "
        >
          {/* LEFT COLUMN (scrolls naturally, animated by dial calc) */}
          <div
            ref={leftColRef}
            className="md:order-1 flex flex-col items-center justify-center gap-8 md:gap-12 text-green-600"
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
          <div
            ref={centerRef}
            className="order-first max-h-full text-muted-foreground text-justify gap-6 mt-[40px] md:mt-auto md:grid md:order-2 md:gap-4 "
          >
            <h1 className="text-xl md:text-2xl text-green-600 text-center">
              Tool Box
            </h1>
            <p>
              Initially I developed backend systems for web apps, desktop apps,
              web scraping scripts, and ML models using Python, GO, and Java.
              Since 2024 I have been teaching myself React(Next.js), with TSX. I
              can now design, develop, and deploy fully dynamic websites on
              Vercel with a complete backend.
            </p>
            <p>
              I use{" "}
              <Link
                target="_blank"
                href="http://ui.shadcn.com/"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-green-600 hover:text-green-600 hover:decoration-muted-foreground"
              >
                Shadcn
              </Link>{" "}
              for UI development, with{" "}
              <Link
                target="_blank"
                href="http://gsap.com/"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-green-600 hover:text-green-600 hover:decoration-muted-foreground"
              >
                GSAP
              </Link>{" "}
              and{" "}
              <Link
                target="_blank"
                href="https://motion.dev/examples"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-green-600 hover:text-green-600 hover:decoration-muted-foreground"
              >
                Motion.dev
              </Link>{" "}
              for animating this and other websites.
            </p>
            <p>
              To track everything I made I developed{" "}
              <Link
                target="_blank"
                href="https://ap-sample.vercel.app/"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-green-600 hover:text-green-600 hover:decoration-muted-foreground"
              >
                ap-samples
              </Link>
              , showcasing unstyled components, blocks, and entire pages.
            </p>
            <span className="text-center">
              Some additional websites/tools that I rely on
              <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                <li>
                  <Link
                    target="_blank"
                    href="https://tweakcn.com/"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 decoration-green-600 hover:text-green-600 hover:decoration-muted-foreground"
                  >
                    Tweakcn
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    target="_blank"
                    href="https://reactbits.dev/"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 decoration-green-600 hover:text-green-600 hover:decoration-muted-foreground"
                  >
                    React Bits
                  </Link>
                </li>
              </ul>
            </span>
          </div>

          {/* RIGHT COLUMN (scrolls naturally, animated by dial calc) */}
          <div
            ref={rightColRef}
            className="md:order-3 flex flex-col items-center justify-center gap-8 md:gap-12 text-green-600"
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
        <p className="text-xs text-muted-foreground text-center mt-9">
          Yes, <span className="text-green-600">Green</span> is my favourite
          colour.
        </p>
      </section>
    </div>
  );
}
