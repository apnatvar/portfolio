"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type CollegeCardProps = {
  title: string;
  imageSrc: string;
  points: string[];
};

function CollegeCard({ title, imageSrc, points }: CollegeCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="relative h-full min-h-0 overflow-hidden">
      <Image
        src={imageSrc}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 767px) 100vw, 50vw"
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t px-4 pb-5 pt-16 text-white transition-all duration-500 ease-out sm:px-6 sm:pb-6 md:px-8 md:pb-8",
          expanded
            ? "top-0 from-black/90 via-black/65 to-transparent"
            : "top-[60%] from-black/90 via-black/55 to-transparent",
        )}
      >
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
            {title}
          </h2>

          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="group mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-expanded={expanded}
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
            className={cn(
              "grid transition-all duration-500 ease-out",
              expanded
                ? "mt-5 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
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
      </div>
    </article>
  );
}

export default function CollegeSplitSection() {
  const colleges = [
    {
      title: "Trinity College Dublin",
      imageSrc: "/trinity-college-dublin.jpg",
      points: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      ],
    },
    {
      title: "St. George's College",
      imageSrc: "/st-georges-college.jpg",
      points: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      ],
    },
  ];

  return (
    <section className="h-[200svh] md:h-[100svh]">
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
