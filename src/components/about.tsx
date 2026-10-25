"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { portfolioContent } from "@/content/portfolio-content";
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

export default function ProfileSplitSection() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 4200,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
      playOnInit: false,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      duration: 28,
    },
    [autoplay.current],
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

  React.useEffect(() => {
    if (!emblaApi) return;

    const autoplayPlugin = autoplay.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncAutoplay = () => {
      if (!motionPreference.matches) {
        autoplayPlugin.play();
      } else {
        autoplayPlugin.stop();
      }
    };

    syncAutoplay();
    motionPreference.addEventListener("change", syncAutoplay);

    return () => {
      motionPreference.removeEventListener("change", syncAutoplay);
      autoplayPlugin.stop();
    };
  }, [emblaApi]);

  return (
    <section id="profile" data-first-section className="h-auto md:min-h-[100svh]">
      <div className="grid h-auto grid-cols-1 grid-rows-[minmax(70svh,auto)_auto] md:min-h-[100svh] md:grid-cols-2 md:grid-rows-1">
        <article className="relative min-h-[70svh] overflow-hidden md:min-h-0">
          <div className="h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {CAROUSEL_IMAGES.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative h-full min-w-0 flex-[0_0_100%]"
                >
                  <Image
                    src={src}
                    alt={`Apnatva Singh Rawat, Next.js Technical SEO Engineer, image ${index + 1}`}
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
              <p lang="hi" className="font-amita text-xl font-medium tracking-[1] text-background">
                अपनत्व सिंह रावत
              </p>

              <h1 className="font-italianno text-background mt-2 text-5xl md:text-7xl">
                Apnatva Singh Rawat
              </h1>

              <div className="mt-4 flex flex-col gap-1 text-sm text-muted sm:text-base">
                {portfolioContent.profile.education.map((item) => (
                  <p key={item}>{item}</p>
                ))}
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

        <article className="flex flex-col bg-background px-4 py-5 sm:px-6 sm:py-6 md:min-h-0 md:px-8 md:py-8">
          <div className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {portfolioContent.profile.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div id="history" className="min-h-0 space-y-3">
              {portfolioContent.experience.map((item) => (
                <section
                  key={item.year}
                  className="border-l border-border pl-4 sm:pl-5"
                >
                <p className="break-words text-xs font-semibold tracking-[0.22em] text-primary">
                    {item.year}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-foreground/85 sm:text-base">
                    {item.text}
                  </p>
                </section>
              ))}
            </div>

            <div className="flex flex-col items-start gap-2">
              {portfolioContent.profileLinks.map((link) => (
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
