"use client";
import SkillPage from "@/components/visual/skills";
import HeroPage from "@/components/visual/hero";
import LetterGlitch from "@/components/visual/contact-me";
import React from "react";
import InfiniteDualMarquee from "@/components/visual/marquee";
import "@/app/visual.css";
import ScrollImage from "@/components/visual/photo-parallax-scroll";
import ProjectCarouselCard from "@/components/visual/projects";
import PromoPreviewSection from "@/components/visual/promo";
export default function Page() {
  return (
    <>
      <HeroPage />
      <InfiniteDualMarquee />
      <SkillPage />
      <ProjectCarouselCard />
      <PromoPreviewSection />
      <ScrollImage />
      <LetterGlitch
        glitchSpeed={70}
        glitchColors={["#04bd73", "#156a48", "#222"]}
        smooth={false}
      />
    </>
  );
}
