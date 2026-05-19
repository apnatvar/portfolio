"use client";

import { HireAP } from "@/app/hire-ap/page";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const rowOneWords = [
  "websites",
  "SEO/GEO",
  "automations",
  "scripting",
  "deployment",
  "hosting",
  "e-commerce",
  "CMS",
  "portfolio",
];
const rowTwoWords = [
  "next.js",
  "typescript",
  "gsap",
  "javascript",
  "tailwind",
  "shadcn",
  "python",
  "sql",
  "html",
  "css",
  "rest",
];

type WordCarouselProps = {
  words: string[];
  direction: "forward" | "backward";
};

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    label: "Hire Me",
    href: "/hire-ap",
  },
  {
    label: "Work",
    href: "#work",
  },
  {
    label: "About",
    href: "/about-ap",
  },
];

export function WordCarousel({ words, direction }: WordCarouselProps) {
  const autoScroll = useMemo(
    () =>
      AutoScroll({
        direction,
        speed: 0.6,
        startDelay: 0,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      }),
    [direction],
  );

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const timeout = window.setTimeout(() => {
      api.reInit();
      api.plugins().autoScroll?.play();
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [api]);

  return (
    <div className="relative w-full min-w-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          dragFree: true,
          align: "start",
        }}
        plugins={[autoScroll]}
        className="w-full min-w-0"
      >
        <CarouselContent className="-ml-4">
          {[...words, ...words, ...words].map((word, index) => (
            <CarouselItem key={`${word}-${index}`} className="basis-auto pl-4">
              <span className="block whitespace-nowrap text-2xl font-semibold uppercase md:text-4xl px-2">
                {word}
              </span>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 800px)",
        },
        (context) => {
          const isDesktop = context.conditions as gsap.Conditions;
          gsap.set(image, { scale: 3.45 });
          gsap.set(".reveal-once", { autoAlpha: 0, y: 24 });
          gsap.set(".word-carousels", { autoAlpha: 0, y: 32 });

          gsap.to(image, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: isDesktop ? "top 30%" : "top 60%",
              scrub: true,
            },
          });

          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "top 50%",
            scrub: true,
            onUpdate: (self) => {
              if (self.progress < 0.8) return;

              gsap.to(".reveal-once", {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.06,
                overwrite: "auto",
              });

              gsap.to(".word-carousels", {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                overwrite: "auto",
              });
            },
          });
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-24"
    >
      <div className="word-carousels flex w-full">
        <WordCarousel words={rowOneWords} direction="forward" />
      </div>
      <div className="flex max-md:flex-col-reverse">
        <div className="flex items-center justify-center gap-8 md:basis-1/3 md:flex-col md:items-end">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="link"
              asChild
              className="reveal-once text-base"
            >
              <Link href={item.href} target="_blank">
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center md:basis-1/3">
          <Button variant="link" asChild className="reveal-once text-lg">
            <Link href="https://cal.eu/apnatva/15min" target="_blank">
              Book a Call
            </Link>
          </Button>

          <div ref={imageRef}>
            <Image
              src="/4.webp"
              alt="Apnatva Singh Rawat Designer/Developer/Writer"
              width={200}
              height={200}
              className="rounded-full object-cover aspect-square"
              priority
            />
          </div>

          <Button variant="link" asChild className="reveal-once text-base">
            <Link href="https://wa.me/918791414856">+918791414856</Link>
          </Button>

          <Button variant="link" asChild className="reveal-once text-base">
            <Link href="mailto:rawat@apnatva.dev">rawat@apnatva.dev</Link>
          </Button>
        </div>
      </div>
      <HireAP />
      <div className="word-carousels flex w-full">
        <WordCarousel words={rowTwoWords} direction="backward" />
      </div>
    </section>
  );
}
