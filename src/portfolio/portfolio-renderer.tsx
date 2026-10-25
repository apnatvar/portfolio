"use client";
import dynamic from "next/dynamic";
import { useDisplayMode } from "@/components/display-mode/display-mode-provider";
import { portfolioContent } from "@/content/portfolio-content";
import type { ReactNode } from "react";
const ResumePortfolio = dynamic(() => import("./resume/resume-portfolio").then(module => module.ResumePortfolio));
const SwissPortfolio = dynamic(() => import("./swiss/swiss-portfolio").then(module => module.SwissPortfolio));
export function PortfolioRenderer({ children }: { children: ReactNode }) {
  const { mode } = useDisplayMode();
  if (mode === "resume") return <ResumePortfolio content={portfolioContent} />;
  if (mode === "swiss") return <SwissPortfolio content={portfolioContent} />;
  return <>{children}</>;
}
