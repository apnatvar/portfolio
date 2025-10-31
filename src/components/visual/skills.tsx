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
            const n = gsap.utils.clamp(-1, 1, (mid - centerY) / band);
            const c = Math.cos(Math.PI * n);

            const x = (side === "left" ? -1 : 1) * AMP() * c;
            const s = gsap.utils.mapRange(
              1,
              0,
              minScale,
              maxScale
            )(Math.abs(n));
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
      ScrollTrigger.create({
        trigger: rootRef.current!,
        start: "top bottom",
        end: "bottom top",
        onUpdate: updateDial,
        onRefresh: updateDial,
        scrub: true,
      });
      updateDial();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-[140dvh] bg-background text-foreground overflow-x-hidden my-5"
    >
      <section className="relative container mx-auto px-4 py-16 md:py-24 z-1">
        <div
          className="
            grid grid-cols-1 md:grid-cols-[1fr_minmax(260px,400px)_1fr]
            items-center gap-10 md:gap-12
          "
        >
          <div
            ref={leftColRef}
            className="md:order-1 flex flex-col items-center justify-center gap-8 md:gap-12 text-green-600 font-share-tech"
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

          <div
            ref={centerRef}
            className="order-first max-h-full text-muted-foreground text-justify gap-5 mt-[40px] md:mt-auto grid md:order-2 md:gap-2 "
          >
            <h1 className="text-xl md:text-2xl text-green-600 text-center font-libre">
              From Systems to Screens
            </h1>
            <p className="text-xs text-amber-400 text-center font-orbitron">
              Engineering roots, design-driven present.
            </p>
            <p className="font-space-grotestk">
              I have built web applications, written automation and scraping
              scripts, and designed ML models and pipelines. My experience with
              Python, Go, Java, Docker, and Kubernetes gave me a solid
              understanding of backend systems, scalability, and
              production-grade architecture.
            </p>
            <p className="font-space-grotestk">
              Currently, I am focussing on front-end design. I work extensively
              with TypeScript, Next.js, Tailwind CSS, Shadcn, GSAP, and
              PayloadCMS to create visually refined, interactive, and scalable
              web experiences. I now can design, develop, and deliver full-stack
              web-apps.
            </p>
            <span className="text-center font-space-grotestk">
              Some additional tools that I rely on
              <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                <li>
                  <Link
                    target="_blank"
                    href="https://tweakcn.com/"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 decoration-teal-500 hover:text-teal-500 hover:decoration-muted-foreground"
                  >
                    Tweakcn
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    target="_blank"
                    href="https://reactbits.dev/"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 decoration-teal-500 hover:text-teal-500 hover:decoration-muted-foreground"
                  >
                    React Bits
                  </Link>
                </li>
              </ul>
            </span>
          </div>

          <div
            ref={rightColRef}
            className="md:order-3 flex flex-col items-center justify-center gap-8 md:gap-12 text-green-600 font-share-tech"
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
