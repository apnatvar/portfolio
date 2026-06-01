import { ScrollRibbonBackground } from "@/components/bg";
import ShaderLinksSection from "@/components/external-links";
import HeroGridReveal from "@/components/hero";
import ContactSection from "@/components/landing-contact";
import LessIsMoreTransition from "@/components/logic-beautifully";
import { MorphingNav } from "@/components/navbar";
import WorkHorizontalScrollSection from "@/components/work";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AP | Design-First Next.js Developer",
  description:
    "Portfolio homepage for AP, a design-first Next.js developer building expressive websites, e-commerce stores, dashboards, and technical web experiences.",
  keywords: [
    "AP portfolio",
    "Apnatva",
    "design-first developer",
    "Next.js developer",
    "frontend developer",
    "web portfolio",
    "freelance web developer",
    "technical web experiences",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AP | Design-First Next.js Developer",
    description:
      "Explore AP's design-first web development work, services, contact paths, and selected technical web projects.",
    url: "/",
    images: [
      {
        url: "/4.webp",
        width: 1200,
        height: 630,
        alt: "AP design-first developer portfolio homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AP | Design-First Next.js Developer",
    description:
      "Design-first Next.js developer creating portfolio sites, commerce experiences, dashboards, and visual web interfaces.",
    images: ["/4.webp"],
  },
  other: {
    image: "https://apnatva.dev/4.webp",
    thumbnail: "https://apnatva.dev/4.webp",
    "image:alt": "AP design-first developer portfolio homepage",
    "document:type": "portfolio-homepage",
    "document:language": "en-IN",
    "document:primary-topic":
      "AP's design-first Next.js development portfolio and selected work.",
    "page:type": "portfolio-homepage",
    "page:audience":
      "clients, collaborators, recruiters, crawlers, and language models evaluating AP's web development work",
    "page:summary":
      "Homepage for AP's portfolio, featuring project work, contact information, external links, and design-first web development positioning.",
    "llm:summary":
      "AP is a design-first Next.js developer. This page introduces the portfolio, selected work, contact section, and external links.",
  },
};

export default function Hero() {
  return (
    <>
      <ScrollRibbonBackground />
      <MorphingNav />
      <div className="min-h-[60svh] md:min-h-[50svh]" />
      <HeroGridReveal />
      <WorkHorizontalScrollSection />
      <ContactSection />
      <LessIsMoreTransition />
      <ShaderLinksSection />
      <div
        id="page-end-sentinel"
        className="min-h-dvh bg-foreground flex items-center justify-center"
      >
        <h2 className="text-3xl md:text-5xl text-center font-manufacturing-consent text-background my-4">
          <span className="text-7xl">Once</span> you get to the{" "}
          <span className="md:translate-y-20 inline-block">bottom,</span> the
          only way is{" "}
          <span className="md:-translate-y-20 inline-block">up.</span>
        </h2>
      </div>
    </>
  );
}
