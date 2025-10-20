"use client";
import SkillPage from "@/components/visual/skills";
import HeroPage from "@/components/visual/hero";
import LetterGlitch from "@/components/visual/contact-me";
import React from "react";
import InfiniteDualMarquee from "@/components/visual/marquee";
import "@/app/visual.css";
import ProjectCarouselCard from "@/components/visual/projects";
import PromoPreviewSection from "@/components/visual/promo";
import FuturePlans from "@/components/visual/road-map-v2";
import FlowingGallery from "@/components/visual/photo-gallery-2";
export default function Page() {
  return (
    <>
      <HeroPage />
      <div className="mt-30"></div>
      <InfiniteDualMarquee />
      <SkillPage />
      <ProjectCarouselCard />
      <FuturePlans />
      <div className="mt-30"></div>
      <PromoPreviewSection />
      <FlowingGallery />
      <LetterGlitch
        glitchSpeed={70}
        glitchColors={["#04bd73", "#156a48", "#222"]}
        smooth={false}
      />
    </>
  );
}
