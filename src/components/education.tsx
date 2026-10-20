"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

import { portfolioContent } from "@/content/portfolio-content";

type CollegeCardProps = {
  title: string;
  imageSrc: string;
  points: string[];
};

function CollegeCard({ title, imageSrc, points }: CollegeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className="relative h-full min-h-0 overflow-hidden">
      <Image
        src={imageSrc}
        alt={title}
        fill
        priority
        className="object-cover object-bottom grayscale"
        sizes="(max-width: 767px) 100vw, 50vw"
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-full flex-col overflow-y-auto overscroll-contain bg-gradient-to-t px-4 pb-5 pt-16 text-white transition-all duration-500 ease-out motion-reduce:transition-none sm:px-6 sm:pb-6 md:px-8 md:pb-8",
          expanded
            ? "top-0 justify-start from-black/90 via-black/65 to-transparent"
            : "top-[60%] justify-end from-black/90 via-black/55 to-transparent",
        )}
      >
        <div className="max-w-xl">
          <h2 className="text-xl font-italianno sm:text-5xl md:text-7xl text-background">
            {title}
          </h2>

          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="group mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-muted backdrop-blur-sm transition-all duration-300 motion-reduce:transition-none hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-expanded={expanded}
            aria-controls={detailsId}
            aria-label={
              expanded ? `See less about ${title}` : `See more about ${title}`
            }
          >
            <span className="overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-20 max-w-20">
              {expanded ? "See less" : "See more"}
            </span>
            {expanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </button>

          <div
            id={detailsId}
            role="region"
            aria-label={`${title} education details`}
            tabIndex={0}
            hidden={!expanded}
            className="mt-5 max-h-[60svh] min-h-0 overflow-y-auto overscroll-contain focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <ul className="space-y-3 pr-2 pt-1">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-6 text-white/90 sm:text-base"
                >
                  <span className="mt-1 shrink-0 text-white">
                    <Sparkles className="size-4" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CollegeSplitSection() {
  const collegeImages: Record<string, string> = {
    "Trinity College Dublin": "/tcd.webp",
    "St. George's College": "/sgc.webp",
  };
  const colleges = portfolioContent.educationDetails.map((college) => ({
    title: college.institution,
    imageSrc: collegeImages[college.institution] ?? "/tcd.webp",
    points: college.points,
  }));

  return (
    <section id="education" className="h-[200svh] md:h-[100svh]">
      <div className="grid h-full grid-cols-1 grid-rows-2 overflow-hidden md:grid-cols-2 md:grid-rows-1">
        {colleges.map((college) => (
          <div key={college.title} className="min-h-0">
            <CollegeCard {...college} />
          </div>
        ))}
      </div>
    </section>
  );
}
