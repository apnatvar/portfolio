"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  title: string;
  desc: string;
  src: string;
  imageLink: string;
  projectLink: string;
  alt: string;
};

type Props = {
  slides?: Slide[];
  /** Animation duration (ms) for programmatic next/prev scroll */
  durationMs?: number;
  className?: string;
};

const MOCK_SLIDES: Slide[] = [
  {
    title: "Ariyana Creations — Ethnic Store",
    desc: "Boutique site with Shadcn UI, GSAP, and PayloadCMS.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    projectLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
  },
  {
    title: "Portfolio — Motion Experiments",
    desc: "Scroll-based animations, parallax, and infinite marquee.",
    src: "https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg",
    imageLink: "https://www.google.com",
    projectLink: "https://www.google.com",
    alt: "Mountain range photography",
  },
  {
    title: "Finance Dashboard",
    desc: "Python + Pandas engine with a minimal GUI, exports and charts.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    projectLink: "https://www.google.com",
    alt: "Abstract mountain icon",
  },
  {
    title: "Portfolio — Motion Experiments",
    desc: "Scroll-based animations, parallax, and infinite marquee.",
    src: "https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg",
    imageLink: "https://www.google.com",
    projectLink: "https://www.google.com",
    alt: "Mountain range photography",
  },
  {
    title: "Finance Dashboard",
    desc: "Python + Pandas engine with a minimal GUI, exports and charts.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    projectLink: "https://www.google.com",
    alt: "Abstract mountain icon",
  },
  {
    title: "Portfolio — Motion Experiments",
    desc: "Scroll-based animations, parallax, and infinite marquee.",
    src: "https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg",
    imageLink: "https://www.google.com",
    projectLink: "https://www.google.com",
    alt: "Mountain range photography",
  },
  {
    title: "Finance Dashboard",
    desc: "Python + Pandas engine with a minimal GUI, exports and charts.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    projectLink: "https://www.google.com",
    alt: "Abstract mountain icon",
  },
];

export default function ProjectCarouselCard({
  slides = MOCK_SLIDES,
  durationMs = 100,
}: Props) {
  const total = slides.length;
  const [index, setIndex] = React.useState(0);

  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  // Update index when user drags / swipes (snap-x)
  React.useEffect(() => {
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
        // easeInOutCubic
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
      className="relative mx-auto flex min-h-[60dvh] h-fit max-h-dvh w-full items-center justify-center px-4 md:px-34 py-6 sm:py-10"
      aria-label="Projects Carousel"
    >
      {/* Left / Right controls outside the card */}
      <div className="relative flex flex-wrap md:flex-nowrap w-full max-w-5xl items-center justify-center gap-3">
        <Button
          type="button"
          size="icon"
          variant="secondary"
          onClick={handlePrev}
          aria-label="Previous"
          className="z-10 order-2 md:order-1"
        >
          <ChevronLeft className="h-5 w-5 text-green-600" />
        </Button>

        <Card className="w-full max-w-4xl border-2 border-green-600 bg-transparent backdrop-blur order-1 md:order-2">
          <CardHeader>
            <p className="text-xs text-center text-muted-foreground mx-auto">
              Some Interesting Projects
            </p>
          </CardHeader>
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
                    {/* Two-column grid (stacks to 1 on phones) */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 items-stretch">
                      {/* Column 1 — 4:3 image wrapped with imageLink */}
                      <Link
                        href={s.imageLink}
                        className="block rounded-xl overflow-hidden"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={s.src}
                            alt={s.alt}
                            fill
                            className="object-cover"
                            priority={i === 0}
                          />
                        </div>
                      </Link>

                      {/* Column 2 — title in projectLink, plus desc */}
                      <div className="flex flex-col justify-between rounded-xl p-4">
                        <div className="space-y-2">
                          <Link
                            href={s.projectLink}
                            className="text-md md:text-lg font-semibold leading-tight underline underline-offset-2 hover:decoration-green-600"
                          >
                            {s.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Progress
              value={pct}
              className="w-full [&>div]:bg-yellow-600"
              aria-label="Slide progress"
            />
          </CardFooter>
        </Card>

        <Button
          type="button"
          size="icon"
          variant="secondary"
          onClick={handleNext}
          aria-label="Next"
          className="z-10 order-3"
        >
          <ChevronRight className="h-5 w-5 text-green-600" />
        </Button>
      </div>
    </section>
  );
}
