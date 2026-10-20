"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "./ui/button";
import { portfolioContent } from "@/content/portfolio-content";
import { useDisplayMode } from "@/components/display-mode/display-mode-provider";
import { useNearViewport } from "@/lib/use-near-viewport";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const workItems = portfolioContent.projects.map((project) => ({
  ...project,
  image: "/ap-icon.svg",
}));

export default function WorkHorizontalScrollSection() {
  const { setMode } = useDisplayMode();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const horizontalScrollRef = useRef<ScrollTrigger | null>(null);
  const isNearViewport = useNearViewport(sectionRef);

  useGSAP(
    () => {
      if (!isNearViewport) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
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
          autoAlpha: 0,
          transformOrigin: "50% 50% -80",
        });

        gsap.set(projectLabels, {
          autoAlpha: 0,
          xPercent: -60,
        });

        gsap.set(flyItems, {
          autoAlpha: 0,
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
        horizontalScrollRef.current = tl.scrollTrigger ?? null;

        gsap.to(titleChars, {
          yPercent: 0,
          rotateX: 0,
          autoAlpha: 1,
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
          autoAlpha: 0.1,
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
            autoAlpha: 1,
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
            autoAlpha: 1,
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
        return () => { horizontalScrollRef.current = null; };
      });

      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".work-fly").forEach((item) => gsap.fromTo(
          item,
          {
            autoAlpha: 0,
            y: 64,
            scale: 0.96,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              once: true,
            },
          },
        ));
      });

      ScrollTrigger.refresh();

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [isNearViewport], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      onFocusCapture={(event) => {
        const target = event.target as HTMLElement;
        const trigger = horizontalScrollRef.current;
        const track = trackRef.current;
        if (!trigger || !track || !target.closest("article")) return;
        const x = Number(gsap.getProperty(track, "x"));
        const top = Math.min(trigger.end, Math.max(trigger.start, trigger.start + target.getBoundingClientRect().left - x - window.innerWidth / 2));
        trigger.scroll(top);
        trigger.animation?.progress((top - trigger.start) / (trigger.end - trigger.start));
      }}
      className="work-section relative min-h-dvh overflow-hidden max-md:max-w-dvw motion-reduce:overflow-visible"
    >
      <div
        ref={trackRef}
        className="
          flex min-h-dvh flex-col
          md:h-dvh md:flex-row md:flex-nowrap
          will-change-transform transform-gpu
          motion-reduce:md:h-auto motion-reduce:md:flex-col motion-reduce:md:transform-none motion-reduce:md:will-change-auto
        "
      >
        <div className="work-panel flex h-dvh w-full shrink-0 flex-col items-center justify-center md:w-dvw">
          <Button className="work-reader-toggle" variant="outline" onClick={() => setMode("resume")}>Read all projects in Resume mode</Button>
          <h2 aria-label="Selected work" className="work-title-word flex overflow-hidden leading-none tracking-tight text-[150px] py-8">
            {"Work".split("").map((char, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="work-title-char inline-block font-italianno text-foreground"
              >
                {char}
              </span>
            ))}
          </h2>
        </div>
        {workItems.map((item) => (
          <article
            key={item.title}
            className="
              work-panel grid min-h-dvh w-full shrink-0 items-center
              px-4 py-12
              md:h-dvh md:w-[200dvw] md:grid-cols-2 md:px-0 md:py-0
              motion-reduce:md:h-auto motion-reduce:md:min-h-0 motion-reduce:md:w-full
            "
          >
            <div className="flex min-h-[45dvh] items-center justify-center md:h-dvh md:w-dvw motion-reduce:md:min-h-[24vh] motion-reduce:md:h-auto motion-reduce:md:w-full">
              <h3 className="work-project-label text-[clamp(2.5rem,10vw,4.5rem)] max-md:text-center max-md:break-words md:text-[130px] text-foreground font-italianno">
                {item.title}
              </h3>
            </div>

            <div className="h-dvh w-full md:w-dvw motion-reduce:md:h-auto motion-reduce:md:w-full">
              <div
                className="
                  work-card-grid
                  grid h-full w-full
                  grid-cols-[repeat(6,minmax(0,1fr))]
                  grid-rows-[repeat(14,minmax(0,1fr))]
                  gap-3 p-4
                  md:grid-cols-[repeat(14,minmax(0,1fr))]
                  md:grid-rows-[repeat(11,minmax(0,1fr))]
                  md:gap-4 md:p-8
                  motion-reduce:md:h-auto motion-reduce:md:grid-cols-1 motion-reduce:md:grid-rows-[auto_auto_auto] motion-reduce:md:gap-4
                "
              >
                <div
                  className="
                    relative overflow-hidden rounded-3xl
                    col-start-1 col-span-6 row-start-2 row-span-10
                    md:col-start-3 md:col-span-10
                    md:row-start-2 md:row-span-8
                    motion-reduce:hidden
                  "
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover blur-md scale-110 opacity-70 motion-reduce:hidden"
                  />
                </div>

                <div
                  className="
                    max-md:absolute max-md:hidden work-fly z-10 rounded-3xl bg-background/90 p-5 text-foreground shadow-2xl
                    col-start-1 col-span-5 row-start-1 row-span-3

                    md:col-start-2 md:col-span-4
                    md:row-start-3 md:row-span-3
                    motion-reduce:md:col-start-1 motion-reduce:md:col-span-1 motion-reduce:md:row-auto
                  "
                >
                  <p className="mt-2 text-3xl italic tracking-tight md:text-5xl">
                    {item.title}
                  </p>
                  {item.category ? <p className="mt-2 text-sm text-muted-foreground">{item.category}</p> : null}
                </div>

                <div
                  className="
                    work-fly z-10 rounded-3xl bg-background/90 max-md:m-4 p-4 text-foreground shadow-2xl
                    col-start-1 col-span-3 row-start-2 row-span-4
                    md:col-start-4 md:col-span-2
                    md:row-start-8 md:row-span-4
                    motion-reduce:md:col-start-1 motion-reduce:md:col-span-1 motion-reduce:md:row-auto
                  "
                >
                  <div className="flex flex-col items-start">
                    {item.links.map((link) => (
                      <Button key={link.label} variant="link" asChild>
                        <Link
                          href={link.href}
                          className="text-base text-muted-foreground"
                          target="_blank"
                          rel="noreferrer"
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
                    motion-reduce:md:col-start-1 motion-reduce:md:col-span-1 motion-reduce:md:row-auto
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
