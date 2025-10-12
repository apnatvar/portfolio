"use client";
import SkillPage from "@/components/visual/skills";
import HeroPage from "@/components/visual/hero";
import LetterGlitch from "@/components/visual/contact-me";
import React from "react";
import InfiniteDualMarquee from "@/components/visual/marquee";
import "@/app/visual.css";
export default function Page() {
  return (
    <>
      <HeroPage />
      <SkillPage />
      <InfiniteDualMarquee />
      <LetterGlitch
        glitchSpeed={100}
        glitchColors={["#04bd73", "#045937", "#333"]}
        smooth={true}
      />
    </>
  );
}
