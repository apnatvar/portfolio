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
import MagicBento from "@/components/visual/MagicBento";
import { FloatingOrbitalMenu } from "@/components/visual/fixed-menu";
import ProcessRolodexSection from "@/components/visual/services";

export default function Page() {
  return (
    <>
      <FloatingOrbitalMenu />
      <HeroPage />
      <InfiniteDualMarquee />
      <div className="justify-items-center mx-auto px-5 mt-40 md:mt-10">
        <MagicBento />
      </div>
      <ProcessRolodexSection />
      <SkillPage />
      <ProjectCarouselCard />
      <FuturePlans />
      <div className="mt-30"></div>
      <PromoPreviewSection />
      <div className="mt-30"></div>
      <FlowingGallery />
      <LetterGlitch
        glitchSpeed={70}
        glitchColors={["#04bd73", "#156a48", "#222"]}
        smooth={false}
      />
    </>
  );
}
