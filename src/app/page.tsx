import { ScrollRibbonBackground } from "@/components/bg";
import ShaderLinksSection from "@/components/external-links";
import { SiteFooter } from "@/components/footer";
import HeroGridReveal from "@/components/hero";
import ContactSection from "@/components/landing-contact";
import LessIsMoreTransition from "@/components/logic-beautifully";
import { MorphingNav } from "@/components/navbar";
import WorkHorizontalScrollSection from "@/components/work";

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
      <SiteFooter />
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
