"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useDisplayMode } from "@/components/display-mode/display-mode-provider";
import { cn } from "@/lib/utils";

const CAROUSEL_IMAGES = [
  "/1.webp",
  "/2.webp",
  "/3.webp",
  "/4.webp",
  "/5.webp",
  "/6.webp",
  "/7.webp",
  "/8.webp",
];

const TIMELINE_ITEMS = [
  {
    year: "Sep 2024 - Present",
    text: "Full-stack Web Developer at Brownsmith Dynamics.",
  },
  {
    year: "Jun 2025 - May 2026",
    text: "Content & Branding at Motilal Oswal Financial Services.",
  },
  {
    year: "May 2023 - Jul 2024",
    text: "Junior Cloud Engineer at Avaya, working with Kubernetes, Docker, and Azure.",
  },
  {
    year: "May 2022 - Aug 2022",
    text: "Software Developer at Mount Technics Consultancy.",
  },
];

const LINK_GROUPS = [
  { label: "Portfolio", href: "/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
  },
  { label: "GitHub", href: "https://github.com/apnatvar" },
  {
    label: "Resume",
    href: "https://github.com/apnatvar/apnatvar/blob/main/ApnatvaCV.pdf",
  },
  { label: "Medium", href: "https://medium.com/@nattupi" },
  { label: "Instagram", href: "https://instagram.com/nattupi/" },
];

export default function ProfileSplitSection() {
  const { mode } = useDisplayMode();
  const autoplay = React.useRef(
    Autoplay({
      delay: 4200,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
      playOnInit: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      duration: 28,
    },
    mode === "creative" ? [autoplay.current] : [],
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="h-[200svh] md:h-[100svh]">
      <div className="grid h-full grid-cols-1 grid-rows-[100svh_100svh] md:grid-cols-2 md:grid-rows-1">
        <article className="relative min-h-0 overflow-hidden">
          <div className="h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {CAROUSEL_IMAGES.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative h-full min-w-0 flex-[0_0_100%]"
                >
                  <Image
                    src={src}
                    alt={`Apnatva Singh Rawat Designer/Developer/Writer ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/55 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-6 px-4 pb-5 pt-10 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
            <div className="max-w-xl">
              <p className="font-amita text-xl font-medium tracking-[1] text-foreground">
                अपनत्व सिंह रावत
              </p>

              <h2 className="font-italianno text-background mt-2 text-5xl md:text-7xl">
                Apnatva Singh Rawat
              </h2>

              <div className="mt-4 flex flex-col gap-1 text-sm text-muted sm:text-base">
                <p>BEng Computer Engineering, First Class Honours, TCD</p>
                <p>BA Arts, TCD</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={scrollPrev}
                  className="pointer-events-auto rounded-full bg-white/15 text-background backdrop-blur-md hover:bg-white/25"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="size-4" />
                </Button>

                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={scrollNext}
                  className="pointer-events-auto rounded-full bg-white/15 text-background backdrop-blur-md hover:bg-white/25"
                  aria-label="Next slide"
                >
                  <ArrowRight className="size-4" />
                </Button>
              </div>

              <div className="pointer-events-none flex items-center gap-2">
                {CAROUSEL_IMAGES.map((_, index) => (
                  <span
                    key={index}
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300",
                      selectedIndex === index
                        ? "w-8 bg-white"
                        : "w-2 bg-white/40",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="flex min-h-0 flex-col bg-background px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            I am Apnatva, though most people call me AP. I am a full-stack web
            and software developer with over three years of experience building
            and maintaining production applications, internal tools, automation
            workflows, and API-driven systems. My work spans responsive
            interfaces, backend integrations, SEO, cloud deployment, reporting
            automation, and production support. <br />
            <br /> Outside work I run, train, read philosophy and psychology,
            travel, take photographs, and write.
            <br />
            <br />
            If you are looking to hire a full-stack developer you can contact me
            via{" "}
            <span>
              <Link
                href="/hire-ap"
                className="underline underline-offset-2 hover:text-foreground"
              >
                this page
              </Link>
            </span>{" "}
            or just contact me on my socials directly.
          </p>

          <div className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="min-h-0 space-y-3">
              {TIMELINE_ITEMS.map((item) => (
                <section
                  key={item.year}
                  className="border-l border-border pl-4 sm:pl-5"
                >
                  <p className="text-xs font-semibold tracking-[0.22em] text-primary">
                    {item.year}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-foreground/85 sm:text-base">
                    {item.text}
                  </p>
                </section>
              ))}
            </div>

            <div className="flex flex-col items-start gap-2">
              {LINK_GROUPS.map((link) => (
                <Button
                  key={link.label}
                  asChild
                  variant="link"
                  className="h-auto px-0 text-left text-base"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
