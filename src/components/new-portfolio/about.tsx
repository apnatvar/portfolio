"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CAROUSEL_IMAGES = [
  "/apnatva/ap-1.jpg",
  "/apnatva/ap-2.jpg",
  "/apnatva/ap-3.jpg",
  "/apnatva/ap-4.jpg",
];

const TIMELINE_ITEMS = [
  {
    year: "2021",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat sem sed erat luctus, vitae faucibus purus feugiat.",
  },
  {
    year: "2022",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non massa non sapien finibus volutpat.",
  },
  {
    year: "2023",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus.",
  },
];

const LINK_GROUPS = [
  { label: "Portfolio", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Resume", href: "#" },
  { label: "Medium", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function ProfileSplitSection() {
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
                    alt={`Apnatva Singh Rawat portrait ${index + 1}`}
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
            <div className="max-w-xl text-white">
              <p className="font-amita text-lg font-medium tracking-[1] text-white/75">
                अपनत्व सिंह रावत
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Apnatva Singh Rawat
              </h2>

              <div className="mt-4 flex flex-col gap-1 text-sm text-white/85 sm:text-base">
                <p>BAI Computer Engineering, TCD</p>
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
                  className="pointer-events-auto rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="size-4" />
                </Button>

                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={scrollNext}
                  className="pointer-events-auto rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
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
          <div className="max-w-2xl">
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Integer pharetra, augue non dictum vulputate, justo
              risus malesuada sem, id scelerisque ligula lorem at nunc.
              Curabitur accumsan sem sed magna hendrerit, in facilisis lacus
              gravida.
            </p>
          </div>

          <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="min-h-0 space-y-6">
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
