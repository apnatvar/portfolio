"use client";
import HeroPage from "@/components/visual/hero";
import LiquidEther from "@/components/visual/LiquidEther";
import React from "react";
export default function Page() {
  return (
    <>
      <HeroPage />
      {/* <section className="max-h-[100dvh]">
        <HorizontalTimeline
          title="Roadmap"
          milestones={milestones}
          scrollDistance={15000}
          alternateCards
        />
      </section> */}
      <div className="relative z-10 w-full h-full">
        <LiquidEther />
      </div>
    </>
  );
}
