"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Badge } from "../ui/badge";
import { FaLink } from "react-icons/fa6";
type Slide = {
  title: string;
  desc: string;
  src: string;
  imageLink: string;
  projectLink: string;
  alt: string;
  tools: string[];
};

type Props = {
  slides?: Slide[];
  durationMs?: number;
  className?: string;
};

const MOCK_SLIDES: Slide[] = [
  {
    title: "AI Traffic System",
    desc: "FYP built to minimise reliance of automated traffic systems on street-level hardware like cameras bringing down setup and running costs while optimising algorithmic inputs.",
    src: "https://live.staticflickr.com/65535/54891821358_873a33106d_b.jpg",
    imageLink:
      "https://www.flickr.com/photos/203680033@N06/54891821358/in/dateposted-public/",

    projectLink: "https://github.com/apnatvar/adaptive-traffic-control",
    alt: "Python code for AI Model",
    tools: ["Python", "PyTorch", "SUMO"],
  },
  {
    title: "Cyclistic Data Analysis",
    desc: "Technical Project analysing company data using technical and visual analysis, following up with insights and recommendations regarding SLG.",
    src: "https://live.staticflickr.com/65535/54888922607_014ee0e6c6_w.jpg",
    imageLink:
      "https://www.flickr.com/photos/203680033@N06/54888922607/in/dateposted-public/",
    projectLink: "https://github.com/apnatvar/analytics/tree/main/Cyclistic",
    alt: "A screenshot of sample visualisation of the data from Tableau",
    tools: ["Python", "SQL", "Pandas", "Tableau"],
  },
  {
    title: "Dhan Automated Trading",
    desc: "Automated trading strategy building and executing trades via the dhanhq Python Library and API.",
    src: "https://live.staticflickr.com/65535/54891599941_b031be3aa6_b.jpg",
    imageLink:
      "https://www.flickr.com/photos/203680033@N06/54891599941/in/dateposted-public/",
    projectLink: "https://www.google.com",
    alt: "A screengrab of placing a simple order",
    tools: ["Python", "Pandas", "Finance"],
  },
  {
    title: "Emissions Tracking Software",
    desc: "MVP to publicly track and record emissions using Blockchain technology incentivising the users to drive conciously and responsibly.",
    src: "https://live.staticflickr.com/65535/54891894495_eb242fe6ec_n.jpg",
    imageLink:
      "https://www.flickr.com/photos/203680033@N06/54891894495/in/dateposted-public/",
    projectLink:
      "https://github.com/apnatvar/Computer-Networking/tree/main/Project%202",
    alt: "Logical Diagram of software capability",
    tools: ["Python", "SQL", "Networking"],
  }, // {
  //   title: "Formula Trinity Driverless Car",
  //   desc: "College Club Project, to develop an AI driven RC car to race in unfamiliar tracks.",
  //   src: "https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg",
  //   imageLink: "https://www.google.com",
  //   projectLink: "https://www.google.com",
  //   alt: "Mountain range photography",
  //   tools: ["Python", "PyTorch"],
  // },
  {
    title: "ML Data Lake",
    desc: "Web Scraper collecting data from multiple online sources based on requested keywords to drive sentiment analysis training.",
    src: "https://live.staticflickr.com/65535/54891599931_d7359edd1a_b.jpg",
    imageLink:
      "https://www.flickr.com/photos/203680033@N06/54891599931/in/dateposted-public/",
    projectLink: "",
    alt: "A screengrab of the syntax SQL table structure",
    tools: ["Python", "Selenium", "SQL"],
  },
  {
    title: "Excel Automation Application",
    desc: "Freelance project to consolidate financial data and enabling simpler and faster insight extraction via a Desktop GUI.",
    src: "https://live.staticflickr.com/65535/54890722047_d6a7112bb4_b.jpg",
    imageLink:
      "https://live.staticflickr.com/65535/54890722047_95de3a5652_b.jpg",
    projectLink:
      "https://github.com/apnatvar/deliveredProjects/blob/main/ConsolidateExcel.py",
    alt: "Screenshot of the Desktop GUI",
    tools: ["Python", "Pandas", "Tkinter"],
  },
  // {
  //   title: "Campagne",
  //   desc: "Platform for managing Social Media for brands and/or marketing agencies.",
  //   src: "/mountain.svg",
  //   imageLink: "https://www.google.com",
  //   projectLink: "https://www.google.com",
  //   alt: "Abstract mountain icon",
  //   tools: ["TypeScript", "PayloadCMS"],
  // },

  // {
  //   title: "Prompterest",
  //   desc: "Pinterest inspired platform focussing on collecting and sharing prompts to provide guidelines for complex tasks.",
  //   src: "/mountain.svg",
  //   imageLink: "https://www.google.com",
  //   projectLink: "https://www.google.com",
  //   alt: "Abstract mountain icon",
  //   tools: ["TypeScript", "PayloadCMS"],
  // },
];

export default function ProjectCarouselCard({
  slides = MOCK_SLIDES,
  durationMs = 600,
}: Props) {
  const total = slides.length;
  const [index, setIndex] = useState(0);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const addtoImageRefs = (el: HTMLImageElement) => {
    if (el) {
      imageRefs.current.push(el);
    }
  };
  useEffect(() => {
    if (!imageRefs.current) return;
    const toKill: HTMLImageElement[] = [];
    imageRefs.current.forEach((imageRef: HTMLImageElement) => {
      gsap.fromTo(
        imageRef,
        {
          scale: 2,
          duration: 1.2,
        },
        { scale: 1 }
      );
      toKill.push(imageRef);
    });
    return () => {
      gsap.killTweensOf(toKill);
    };
  });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth;
        const newIndex = Math.round(el.scrollLeft / Math.max(1, w));
        if (newIndex !== index) setIndex(newIndex);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [index]);

  const scrollTo = React.useCallback(
    (next: number) => {
      const el = scrollerRef.current;
      if (!el) return;

      const clamped = Math.max(0, Math.min(total - 1, next));
      if (clamped === index) return;

      const target = clamped * el.clientWidth;

      // Smooth programmatic scroll timed to durationMs
      const start = el.scrollLeft;
      const diff = target - start;
      const startTime = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / durationMs);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        el.scrollLeft = start + diff * eased;
        if (t < 1) requestAnimationFrame(step);
        else setIndex(clamped);
      };
      requestAnimationFrame(step);
    },
    [index, total, durationMs]
  );

  const handlePrev = React.useCallback(() => {
    scrollTo(index - 1);
  }, [index, scrollTo]);

  const handleNext = React.useCallback(() => {
    scrollTo(index + 1);
  }, [index, scrollTo]);

  const pct = React.useMemo(() => ((index + 1) / total) * 100, [index, total]);

  return (
    <section
      className="relative mx-auto min-h-[60dvh] md:h-[100dvh] h-fit max-h-dvh w-full items-center justify-center px-4 md:px-34 py-6 sm:py-10"
      aria-label="Projects Carousel"
    >
      <p className="text-xs text-center text-amber-400 font-orbitron mb-2">
        Syntax meets purpose. Curated Projects.
      </p>
      <div className="relative flex flex-wrap md:flex-nowrap w-full max-w-5xl items-center justify-center gap-3">
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={handlePrev}
          aria-label="Previous"
          className="z-10 order-2 md:order-1"
        >
          <ChevronLeft className="h-5 w-5 text-teal-500" />
        </Button>

        <Card className="w-full max-w-4xl border-2 border-green-600 bg-transparent order-1 md:order-2 gap-0">
          <CardContent id="work" className="p-4">
            <div
              ref={scrollerRef}
              className="relative w-full overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth order-2"
            >
              <div className="flex flex-row flex-nowrap w-full">
                {slides.map((s, i) => (
                  <article
                    key={`${s.title}-${i}`}
                    className="snap-start shrink-0 w-full min-w-full"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${total}`}
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 items-stretch">
                      <Link
                        href={s.imageLink}
                        className="block rounded-4xl overflow-hidden"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            ref={addtoImageRefs}
                            src={s.src}
                            alt={s.alt}
                            fill
                            priority={i === 0}
                            quality={100}
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      <div className="flex flex-col justify-between rounded-xl p-4">
                        <div className="space-y-2">
                          <Link
                            href={s.projectLink}
                            className="text-lg md:text-xl font-semibold leading-tight"
                          >
                            <span className="underline underline-offset-2 decoration-teal-500 hover:text-teal-500 font-libre">
                              {s.title}
                            </span>{" "}
                            <FaLink className="inline-block text-amber-500 font-orbitron" />
                          </Link>
                          <div className="flex flex-row flex-wrap gap-1 pt-2 pb-3 md:pt-1 md:pb-2 scale-95">
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
                          <p className="text-sm text-muted-foreground mt-2 font-space-grotestk w-full">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-3 font-space-grotestk">{`${
                      i + 1
                    } of ${slides.length}`}</p>
                  </article>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 mt-0">
            <Progress
              value={pct}
              className="w-full [&>div]:bg-teal-500"
              aria-label="Slide progress"
            />
          </CardFooter>
        </Card>

        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={handleNext}
          aria-label="Next"
          className="z-10 order-3"
        >
          <ChevronRight className="h-5 w-5 text-teal-500" />
        </Button>
      </div>
    </section>
  );
}
