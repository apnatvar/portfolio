"use client";

import dynamic from "next/dynamic";

import { useDisplayMode } from "@/components/display-mode/display-mode-provider";
import { portfolioContent } from "@/content/portfolio-content";
import { ResumeAbout } from "./resume-about";
import { SwissAbout } from "./swiss-about";

const CreativeAbout = dynamic(() => import("./creative-about"), { ssr: false });

export function AboutRenderer() {
  const { mode } = useDisplayMode();

  if (mode === "resume") return <ResumeAbout content={portfolioContent} />;
  if (mode === "swiss") return <SwissAbout content={portfolioContent} />;
  return <CreativeAbout />;
}
