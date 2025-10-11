"use client";
import SkillPage from "@/components/visual/skills";
import HeroPage from "@/components/visual/hero";
import LetterGlitch from "@/components/visual/LetterGlitch";
import React from "react";
export default function Page() {
  return (
    <>
      <HeroPage />
      <SkillPage />
      <LetterGlitch
        glitchSpeed={50}
        glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
        smooth={true}
      />
    </>
  );
}
