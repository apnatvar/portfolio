import { ScrollRibbonBackground } from "@/components/bg";
import ShaderLinksSection from "@/components/external-links";
import HeroGridReveal from "@/components/hero";
import ContactSection from "@/components/landing-contact";
import LessIsMoreTransition from "@/components/logic-beautifully";
import { MorphingNav } from "@/components/navbar";
import WorkHorizontalScrollSection from "@/components/work";
import { portfolioContent } from "@/content/portfolio-content";
import Link from "next/link";

export default function CreativePortfolio() {
  return (
    <>
      <ScrollRibbonBackground />
      <noscript><style>{`
        .work-reader-toggle { display: none; }
        .work-section { overflow: visible; }
        .work-section > div { flex-direction: column; height: auto; }
        .work-section .work-panel { width: 100%; height: auto; min-height: 0; display: block; }
        .work-section article > div { width: 100%; height: auto; min-height: 0; }
        .work-card-grid { display: flex; flex-direction: column; height: auto; }
        .work-card-grid > div { position: relative; margin: 1rem; }
        .work-card-grid > div:first-child { display: none; }
      `}</style></noscript>
      <MorphingNav />
      <HeroGridReveal />
      <section id="experience" className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        <h2 className="mb-8 text-3xl">Professional experience</h2>
        <div className="space-y-6">
          {portfolioContent.experience.map((item) => (
            <article key={item.year} className="grid gap-2 border-t pt-4 md:grid-cols-[12rem_1fr]">
              <p className="text-sm text-muted-foreground">{item.year}</p>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <Link href="/about-ap" className="mt-6 inline-block underline underline-offset-4">Profile, education and capabilities</Link>
      </section>
      <WorkHorizontalScrollSection />
      <ContactSection />
      <LessIsMoreTransition />
      <ShaderLinksSection />
      <div id="page-end-sentinel" className="min-h-dvh bg-foreground flex items-center justify-center">
        <h2 className="text-3xl md:text-5xl text-center font-manufacturing-consent text-background my-4">
          <span className="text-7xl">Once</span> you get to the{" "}
          <span className="md:translate-y-20 inline-block">bottom,</span> the only way is{" "}
          <span className="md:-translate-y-20 inline-block">up.</span>
        </h2>
      </div>
    </>
  );
}
