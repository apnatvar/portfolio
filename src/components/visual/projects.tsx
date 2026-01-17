"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "../ui/badge";
import { FaLink } from "react-icons/fa6";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Slide = {
  title: string;
  desc: string;
  projectLink: string;
  tools: string[];
};

const MOCK_SLIDES: Slide[] = [
  {
    title: "AI Traffic System",
    desc: "FYP built to minimise reliance of automated traffic systems on street-level hardware like cameras bringing down setup and running costs while optimising algorithmic inputs.",
    projectLink: "https://github.com/apnatvar/adaptive-traffic-control",
    tools: ["Python", "PyTorch", "SUMO"],
  },
  {
    title: "Cyclistic Data Analysis",
    desc: "Technical Project analysing company data using technical and visual analysis, following up with insights and recommendations regarding SLG.",
    projectLink: "https://github.com/apnatvar/analytics/tree/main/Cyclistic",
    tools: ["Python", "SQL", "Pandas", "Tableau"],
  },
  // {
  //   title: "Dhan Automated Trading",
  //   desc: "Automated trading strategy building and executing trades via the dhanhq Python Library and API.",
  //   projectLink: "https://www.google.com",
  //   tools: ["Python", "Pandas", "Finance"],
  // },
  {
    title: "Emissions Tracking Software",
    desc: "MVP to publicly track and record emissions using Blockchain technology incentivising the users to drive conciously and responsibly.",
    projectLink:
      "https://github.com/apnatvar/Computer-Networking/tree/main/Project%202",
    tools: ["Python", "SQL", "Networking"],
  }, // {
  //   title: "Formula Trinity Driverless Car",
  //   desc: "College Club Project, to develop an AI driven RC car to race in unfamiliar tracks.",
  //   projectLink: "https://www.google.com",
  //   tools: ["Python", "PyTorch"],
  // },
  {
    title: "ML Data Lake",
    desc: "Web Scraper collecting data from multiple online sources based on requested keywords to drive sentiment analysis training.",
    projectLink: "",
    tools: ["Python", "Selenium", "SQL"],
  },
  {
    title: "Excel Automation Application",
    desc: "Freelance project to consolidate financial data and enabling simpler and faster insight extraction via a Desktop GUI.",
    projectLink:
      "https://github.com/apnatvar/deliveredProjects/blob/main/ConsolidateExcel.py",
    tools: ["Python", "Pandas", "Tkinter"],
  },
  // {
  //   title: "Campagne",
  //   desc: "Platform for managing Social Media for brands and/or marketing agencies.",
  //   projectLink: "https://www.google.com",
  //   tools: ["TypeScript", "PayloadCMS"],
  // },
  // {
  //   title: "Prompterest",
  //   desc: "Pinterest inspired platform focussing on collecting and sharing prompts to provide guidelines for complex tasks.",
  //   projectLink: "https://www.google.com",
  //   tools: ["TypeScript", "PayloadCMS"],
  // },
];
export default function ProjectCarouselCard({
  slides = MOCK_SLIDES,
}: {
  slides?: Slide[];
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const addToCardRefs = (el: HTMLDivElement | null) => {
    if (!el) return;
    cardRefs.current.push(el);
  };
  useEffect(() => {
    if (!headingRef.current || cardRefs.current.length === 0) return;

    const ctx = gsap.context(() => {
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
          start: "top 70%",
          scrub: true,
        },
      });

      cardRefs.current.forEach((el, i) => {
        const fromLeft = i % 2 === 0;

        gsap.fromTo(
          el,
          {
            xPercent: fromLeft ? -60 : 60,
            rotateX: fromLeft ? 15 : -15,
            rotateZ: fromLeft ? -5 : 5,
            y: 20,
            opacity: 0,
            transformPerspective: 900,
            transformOrigin: fromLeft ? "left center" : "right center",
            willChange: "transform, opacity",
          },
          {
            xPercent: 0,
            rotateX: 0,
            rotateZ: 0,
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 65%",
              end: "top 40%",
              scrub: true,
            },
          },
        );
      });
    });

    return () => {
      ctx.revert();
    };
  }, [headingRef, cardRefs]);

  return (
    <section
      className="relative mx-auto min-h-[60dvh] h-fit w-full items-center justify-center px-4 md:px-34 py-6 sm:py-10"
      aria-label="Projects"
    >
      <h1
        ref={headingRef}
        className="text-6xl text-left md:text-7xl text-green-600 md:text-center font-libre py-12 md:pb-8"
      >
        Curated Projects.
      </h1>
      <p className="hidden md:block text-xs text-center text-amber-400 font-orbitron mb-2">
        Hover To Know More
      </p>
      <p className="md:hidden block text-xs text-center text-amber-400 font-orbitron mb-2">
        Solo & Group Projects
      </p>

      {/* Mobile: single grid, fully visible cards */}
      <div className="md:hidden w-full max-w-5xl mx-auto grid grid-cols-1 gap-3">
        {slides.map((s: Slide, i: number) => (
          <Card
            key={`${s.title}-${i}`}
            className="border-2 border-green-600 bg-transparent"
            ref={addToCardRefs}
          >
            <CardContent className="p-4">
              <Link
                href={s.projectLink}
                className="text-lg font-semibold leading-tight"
              >
                <span className="underline underline-offset-2 decoration-teal-500 hover:text-teal-500 font-libre">
                  {s.title}
                </span>{" "}
                <FaLink className="inline-block text-amber-500 font-orbitron" />
              </Link>

              <div className="flex flex-row flex-wrap gap-1 pt-2 pb-3 scale-95">
                {s.tools.map((t, ti) => (
                  <Badge
                    variant="outline"
                    key={ti}
                    className="hover:text-violet-500 font-playfair"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mt-1 font-space-grotestk w-full">
                {s.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: long vertical list, alternating left/right with offsets + hover expand */}
      <div className="hidden md:block w-full max-w-5xl mx-auto">
        <div className="flex flex-col gap-6">
          {slides.map((s: Slide, i: number) => {
            const isLeft = i % 2 === 0;
            const isOpen = expanded === i;

            // asymmetry offsets (slight, alternating)
            const offsetX = isLeft ? "md:-translate-x-8" : "md:translate-x-8";
            const offsetY =
              i % 3 === 0
                ? "md:translate-y-2"
                : i % 3 === 1
                  ? "md:-translate-y-1"
                  : "md:translate-y-0";

            return (
              <div
                key={`${s.title}-${i}`}
                className={`w-full flex ${isLeft ? "justify-start" : "justify-end"}`}
                ref={addToCardRefs}
              >
                <Card
                  className={[
                    "group border-2 border-green-600 bg-transparent w-full max-w-3xl",
                    "transition-all duration-300 ease-out",
                    offsetX,
                    offsetY,
                    isOpen ? "shadow-lg" : "shadow-none",
                  ].join(" ")}
                  onMouseEnter={() => setExpanded(i)}
                  onMouseLeave={() => setExpanded((v) => (v === i ? null : v))}
                  onFocus={() => setExpanded(i)}
                  onBlur={() => setExpanded((v) => (v === i ? null : v))}
                >
                  <CardContent className="p-5">
                    {/* Always visible: Title + link */}
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={s.projectLink}
                        className="text-xl font-semibold leading-tight"
                      >
                        <span className="underline underline-offset-2 decoration-teal-500 hover:text-teal-500 font-libre">
                          {s.title}
                        </span>{" "}
                        <FaLink className="inline-block text-amber-500 font-orbitron" />
                      </Link>

                      <span className="text-xs text-muted-foreground font-space-grotestk">
                        {i + 1} of {slides.length}
                      </span>
                    </div>

                    {/* Hover-reveal: tools + desc */}
                    <div
                      className={[
                        "overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out",
                        isOpen
                          ? "max-h-[220px] opacity-100 translate-y-0"
                          : "max-h-0 opacity-0 -translate-y-1",
                      ].join(" ")}
                      aria-hidden={!isOpen}
                    >
                      <div className="pt-3">
                        <div className="flex flex-row flex-wrap gap-1 pb-3 scale-95">
                          {s.tools.map((t, ti) => (
                            <Badge
                              variant="outline"
                              key={ti}
                              className="hover:text-violet-500 font-playfair"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground font-space-grotestk w-full">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
