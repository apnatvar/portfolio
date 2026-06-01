import ProfileSplitSection from "@/components/about";
import CollegeSplitSection from "@/components/education";
import { MorphingNav } from "@/components/navbar";
import InfinitePinnedWords from "@/components/services";
import SkillsExplosionSection from "@/components/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AP | Developer Profile",
  description:
    "About AP: a design-first developer profile covering background, education, skills, services, and technical strengths across modern web projects.",
  keywords: [
    "about AP",
    "about Apnatva",
    "AP developer profile",
    "Next.js developer profile",
    "frontend developer skills",
    "web developer education",
    "design-first web developer",
  ],
  alternates: {
    canonical: "/about-ap",
  },
  openGraph: {
    title: "About AP | Developer Profile",
    description:
      "Learn about AP's background, education, skills, services, and design-first approach to web development.",
    url: "/about-ap",
  },
  twitter: {
    title: "About AP | Developer Profile",
    description:
      "Developer profile for AP, covering background, education, skills, and web development services.",
  },
  other: {
    "page:type": "about-profile-page",
    "page:audience":
      "clients, collaborators, recruiters, crawlers, and language models learning AP's background and skills",
    "page:summary":
      "About page for AP, presenting personal profile sections, education, skills, services, and development capabilities.",
    "llm:summary":
      "This page explains who AP is as a developer, including background, education, technical skills, and service areas.",
  },
};

export default function Page() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <MorphingNav />
      <div className="min-h-[60svh] md:min-h-[50svh]" />
      <ProfileSplitSection />
      <CollegeSplitSection />
      <SkillsExplosionSection />
      <InfinitePinnedWords />
    </div>
  );
}
