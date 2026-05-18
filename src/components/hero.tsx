"use client";

import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Keyboard, PenLine } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function SplitLetters({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap items-center justify-center">
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="reveal-letter inline-block text-muted-foreground"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function SplitWords({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-1 gap-y-1">
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="reveal-word inline-block">
          {word}
        </span>
      ))}
    </span>
  );
}

export default function HeroGridReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const largeItems = gsap.utils.toArray<HTMLElement>("[data-large-reveal]");
      const supportItems =
        gsap.utils.toArray<HTMLElement>("[data-word-reveal]");
      const buttons = gsap.utils.toArray<HTMLElement>("[data-button-reveal]");

      largeItems.forEach((item) => {
        const letters = item.querySelectorAll<HTMLElement>(".reveal-letter");

        gsap.fromTo(
          letters,
          {
            color: "var(--muted-foreground)",
            opacity: 0.25,
            yPercent: 18,
            rotateX: -35,
            filter: "blur(6px)",
          },
          {
            color: "var(--foreground)",
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            filter: "blur(0px)",
            ease: "none",
            stagger: {
              each: 0.035,
              from: "start",
            },
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "bottom 45%",
              scrub: 0.8,
            },
          },
        );
      });

      supportItems.forEach((item) => {
        const words = item.querySelectorAll<HTMLElement>(".reveal-word");

        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 18,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          },
        );
      });

      gsap.fromTo(
        buttons,
        {
          opacity: 0,
          y: 20,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttons[0],
            start: "top 92%",
            end: "top 70%",
            scrub: 0.5,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8 md:py-32"
    >
      <div className="flex flex-col gap-y-8 items-center justify-center md:grid text-center md:grid-cols-5 md:auto-rows-[minmax(110px,_auto)] md:gap-y-8">
        <span className="font-italianno col-start-1 col-span-3 row-start-1 max-md:row-span-2 leading-none md:col-start-1 md:col-span-5 md:row-start-1 text-[160px] transition-all hover:tracking-widest duration-500">
          Hello
        </span>

        <span
          data-large-reveal
          className="font-italianno col-start-1 col-span-3 row-start-3 text-8xl max-md:row-span-2 leading-none md:col-start-2 md:col-span-2 md:row-start-2 md:text-9xl transition-all hover:tracking-widest duration-500"
        >
          <SplitLetters text="I am A P" />
        </span>

        <span
          data-word-reveal
          className="col-start-1 col-span-3 row-start-4 text-center text-base uppercase tracking-[0.22em] text-muted-foreground md:col-start-4 md:col-span-1 md:row-start-2 md:text-left md:text-base"
        >
          <SplitWords text="Apnatva Singh Rawat" />
        </span>

        <span
          data-large-reveal
          className="font-italianno col-start-1 col-span-3 row-start-5 max-md:row-span-2 flex items-center justify-center gap-3 text-8xl leading-none md:col-start-3 md:col-span-3 md:row-start-3 md:text-9xl transition-all hover:tracking-widest duration-500"
        >
          <Keyboard className="size-10 shrink-0 md:size-20" />
          <SplitLetters text="Designer" />
        </span>

        <span
          data-word-reveal
          className="col-start-1 col-span-3 row-start-7 text-base text-muted-foreground md:col-start-4 md:col-span-2 md:row-start-3 md:row-span-2 md:text-lg"
        >
          <SplitWords text="Websites that turn visitors into customers." />
        </span>

        <span
          data-large-reveal
          className="font-italianno col-start-1 col-span-3 max-md:row-span-2 row-start-8 flex items-center justify-center gap-3 text-8xl leading-none md:col-start-1 md:col-span-3 md:row-start-4 md:text-9xl transition-all hover:tracking-widest duration-500"
        >
          <SplitLetters text="Developer" />
          <Code2 className="size-10 shrink-0 md:size-20" />
        </span>

        <span
          data-word-reveal
          className="col-start-1 col-span-3 row-start-10 text-base text-muted-foreground md:col-start-3 md:col-span-2 md:row-start-4 md:row-span-2 md:text-lg"
        >
          <SplitWords text="Logic that creates beauty." />
        </span>

        <span
          data-large-reveal
          className="font-italianno col-start-1 col-span-3 max-md:row-span-2 row-start-11 flex items-center justify-center gap-3 text-8xl leading-none md:col-start-2 md:col-span-3 md:row-start-5 md:text-9xl transition-all hover:tracking-widest duration-500"
        >
          <PenLine className="size-10 shrink-0 md:size-20" />
          <SplitLetters text="Writer" />
        </span>

        <span
          data-word-reveal
          className="col-start-1 col-span-3 row-start-13 text-base text-muted-foreground md:col-start-2 md:col-span-2 md:row-start-5 md:row-span-2 md:text-lg"
        >
          <SplitWords text="Words that drive conversions." />
        </span>

        <div
          data-word-reveal
          className="grid grid-cols-2 justify-center gap-8 text-sm text-muted-foreground md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-4 md:flex md:flex-col md:gap-8 md:text-left md:text-base"
        >
          <SplitWords text="SEO" />
          <SplitWords text="Content Management Systems" />
          <SplitWords text="Dashboards" />
          <SplitWords text="Hosting" />
          <SplitWords text="Automations" />
          <SplitWords text="Maintenance" />
        </div>

        <div className="col-start-1 col-span-3 row-start-16 flex justify-center gap-3 md:col-start-3 md:col-span-1 md:row-start-6 md:justify-between">
          <Button data-button-reveal variant="default">
            <Link href={"/hire-ap"} className="hover:opacity-80">
              Hire AP
            </Link>
          </Button>
          <Button data-button-reveal variant="secondary">
            <Link href={"/#work"} className="hover:opacity-80">
              Work
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
