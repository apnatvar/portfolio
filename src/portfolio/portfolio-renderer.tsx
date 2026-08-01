"use client";

import dynamic from "next/dynamic";

import { useDisplayMode } from "@/components/display-mode/display-mode-provider";
import { portfolioContent } from "@/content/portfolio-content";
import { ResumePortfolio } from "./resume/resume-portfolio";
import { SwissPortfolio } from "./swiss/swiss-portfolio";

const CreativePortfolio = dynamic(() => import("./creative/creative-portfolio"), {
  ssr: false,
});

export function PortfolioRenderer() {
  const { mode } = useDisplayMode();

  if (mode === "resume") return <ResumePortfolio content={portfolioContent} />;
  if (mode === "swiss") return <SwissPortfolio content={portfolioContent} />;

  return <CreativePortfolio />;
}
