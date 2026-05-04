"use client";
import MagicBento from "@/components/visual/MagicBento";
import LetterGlitch from "@/components/visual/contact-me";
import { FloatingOrbitalMenu } from "@/components/visual/fixed-menu";
import HeroPage from "@/components/visual/hero";
import InfiniteDualMarquee from "@/components/visual/marquee";
import FlowingGallery from "@/components/visual/photo-gallery-2";
import ProjectCarouselCard from "@/components/visual/projects";
import PromoPreviewSection from "@/components/visual/promo";
import FuturePlans from "@/components/visual/road-map-v2";
import ProcessRolodexSection from "@/components/visual/services";
import SkillPage from "@/components/visual/skills";

export default function Page() {
  return (
    <>
      <div className="mx-auto">
        <FloatingOrbitalMenu />
        <HeroPage />
        <InfiniteDualMarquee />
        <div className="flex flex-col justify-center items-center px-5 mt-40 md:mt-10 z-0">
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
      </div>
    </>
  );
}
