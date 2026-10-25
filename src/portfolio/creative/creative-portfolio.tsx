import { ScrollRibbonBackground } from "@/components/bg";
import HeroGridReveal from "@/components/hero";
import ContactSection from "@/components/landing-contact";
import { MorphingNav } from "@/components/navbar";
import WorkHorizontalScrollSection from "@/components/work";
import { StudioNotes } from "@/components/studio-notes";

export default function CreativePortfolio() {
  return <div className="atelier-page"><ScrollRibbonBackground /><MorphingNav /><HeroGridReveal /><StudioNotes /><WorkHorizontalScrollSection /><ContactSection /></div>;
}
