"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type WorkItem = {
  title: string;
  image: string;
  links: {
    label: string;
    href: string;
  }[];
  points: string[];
};

const workItems: WorkItem[] = [
  {
    title: "ELZA International",
    image: "/ap-icon.svg",
    links: [
      { label: "Website", href: "https://elza.co.in/" },
      {
        label: "Case Study",
        href: "https://github.com/apnatvar/apnatvar/blob/main/Elza%20Case%20Study.pdf",
      },
    ],
    points: [
      "Performance, SEO, Asset Optimisation, and Responsive Design were treated as core requirements.",
      "Design for a minimal content-first aesthetic with limitations around animations and design.",
      "Varied section-level colour compositions were made from a limited brand palette to avoid a templated feel.",
    ],
  },
  {
    title: "Autonomous Urban Mobility",
    image: "/ap-icon.svg",
    links: [
      {
        label: "Code",
        href: "https://github.com/apnatvar/adaptive-traffic-control/",
      },
      {
        label: "Thesis",
        href: "https://github.com/apnatvar/adaptive-traffic-control/blob/main/Thesis.pdf",
      },
    ],
    points: [
      "Final year thesis on adaptive traffic optimization framework built on satellite intelligence over hardware-heavy conventional methods.",
      "Infrastructure-light, highly scalable approach designed to reduce deployment cost, maintenance overhead, and operational complexity for urban mobility systems.",
      "Proof-of-concept that can evolve into a licensable B2B optimization engine for smart mobility and navigation ecosystems.",
    ],
  },
  {
    title: "Excel Automation",
    image: "/ap-icon.svg",
    links: [
      {
        label: "Code",
        href: "https://github.com/apnatvar/deliveredProjects/blob/main/ConsolidateExcel.py",
      },
    ],
    points: [
      "Developed a Python-based Windows standalone application to automate consolidation of financial data with over $10M in yearly transactions.",
      "Reduced processing time to consolidate Excel tabular data from 5 days to ~17 minutes, generating 11 reports to save auditors hours in analysing and providing valuable insights as quickly as possible.",
    ],
  },
  // {
  //   title: "Haneri Electricals",
  //   image: "/ap-icon.svg",
  //   links: [
  //     { label: "Storefront", href: "#" },
  //     { label: "CMS", href: "#" },
  //   ],
  //   points: [
  //     "A lightweight, product-centric website designed to showcase brand catalog with a content management system.",
  //     "Developed an interactive 3D model viewer for users to closely understand the products.",
  //     "Architected a PayloadCMS content model for models, color variants, media assets, and internal cross-subdomain navigation links.",
  //   ],
  // },
];

export default function WorkHorizontalScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
        const titleChars = gsap.utils.toArray<HTMLElement>(".work-title-char");
        const projectLabels = gsap.utils.toArray<HTMLElement>(
          ".work-project-label",
        );
        const flyItems = gsap.utils.toArray<HTMLElement>(".work-fly");

        gsap.set(titleChars, {
          yPercent: 120,
          rotateX: -90,
          opacity: 0,
          transformOrigin: "50% 50% -80",
        });

        gsap.set(projectLabels, {
          opacity: 0,
          xPercent: -60,
        });

        gsap.set(flyItems, {
          opacity: 0,
          y: 80,
          scale: 0.92,
          rotate: -2,
        });

        const horizontalDistance = track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${horizontalDistance}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(track, {
          x: () => -horizontalDistance,
          ease: "none",
        });

        gsap.to(titleChars, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=45%",
            scrub: 1,
          },
        });

        gsap.to(".work-title-word", {
          scale: 0.22,
          opacity: 0.1,
          letterSpacing: "0.25em",
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=130%",
            scrub: 1,
          },
        });

        projectLabels.forEach((label) => {
          gsap.to(label, {
            opacity: 1,
            xPercent: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: label.closest(".work-panel"),
              containerAnimation: tl,
              start: "left 65%",
              end: "left 15%",
              scrub: 1,
            },
          });
        });

        panels.forEach((panel) => {
          const items = panel.querySelectorAll(".work-fly");

          gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: "left left",
              end: "right right",
              scrub: 1,
            },
          });
        });

        return () => {
          mm.revert();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".work-fly",
          {
            opacity: 0,
            y: 64,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 40%",
              scrub: 1,
            },
          },
        );
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh overflow-hidden max-md:max-w-dvw"
    >
      <div
        ref={trackRef}
        className="
          flex min-h-dvh flex-col
          md:h-dvh md:flex-row md:flex-nowrap
          will-change-transform transform-gpu
        "
      >
        <div className="work-panel flex h-dvh w-full shrink-0 items-center justify-center md:w-dvw">
          <h2 className="work-title-word flex overflow-hidden leading-none tracking-tight text-[150px] py-8">
            {"Work".split("").map((char, index) => (
              <span
                key={index}
                className="work-title-char inline-block font-italianno text-foreground"
              >
                {char}
              </span>
            ))}
          </h2>
        </div>
        <div id="work" />
        {workItems.map((item) => (
          <article
            key={item.title}
            className="
              work-panel grid min-h-dvh w-full shrink-0 items-center
              px-4 py-12
              md:h-dvh md:w-[200dvw] md:grid-cols-2 md:px-0 md:py-0
            "
          >
            <div className="flex min-h-[45dvh] items-center justify-center md:h-dvh md:w-dvw">
              <p className="work-project-label text-7xl max-md:text-center md:text-[130px] text-foreground font-italianno">
                {item.title}
              </p>
            </div>

            <div className="h-dvh w-full md:w-dvw">
              <div
                className="
                  grid h-full w-full
                  grid-cols-[repeat(6,minmax(0,1fr))]
                  grid-rows-[repeat(14,minmax(0,1fr))]
                  gap-3 p-4
                  md:grid-cols-[repeat(14,minmax(0,1fr))]
                  md:grid-rows-[repeat(11,minmax(0,1fr))]
                  md:gap-4 md:p-8
                "
              >
                <div
                  className="
                    relative overflow-hidden rounded-3xl
                    col-start-1 col-span-6 row-start-2 row-span-10
                    md:col-start-3 md:col-span-10
                    md:row-start-2 md:row-span-8
                  "
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className="object-cover blur-md scale-110 opacity-70"
                  />
                </div>

                <div
                  className="
                    max-md:absolute max-md:hidden work-fly z-10 rounded-3xl bg-background/90 p-5 text-foreground shadow-2xl
                    col-start-1 col-span-5 row-start-1 row-span-3

                    md:col-start-2 md:col-span-4
                    md:row-start-3 md:row-span-3
                  "
                >
                  <h2 className="mt-2 text-3xl italic tracking-tight md:text-5xl">
                    {item.title}
                  </h2>
                </div>

                <div
                  className="
                    work-fly z-10 rounded-3xl bg-background/90 max-md:m-4 p-4 text-foreground shadow-2xl
                    col-start-1 col-span-3 row-start-2 row-span-4
                    md:col-start-4 md:col-span-2
                    md:row-start-8 md:row-span-4
                  "
                >
                  <div className="flex flex-col items-start">
                    {item.links.map((link) => (
                      <Button key={link.label} variant={"link"}>
                        <Link
                          href={link.href}
                          className="text-base text-muted-foreground"
                          target="_blank"
                        >
                          {link.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>

                <div
                  className="
                    work-fly z-10 rounded-3xl bg-background/90 max-md:m-4 p-4 text-foreground shadow-2xl
                    col-start-2 col-span-5 row-start-6 row-span-8
                    md:col-start-7 md:col-span-7
                    md:row-start-6 md:row-span-5
                  "
                >
                  <ol className="list-disc list-inside pl-5 text-sm md:text-lg space-y-4">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
