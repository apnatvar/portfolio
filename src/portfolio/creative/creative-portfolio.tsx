import { ScrollRibbonBackground } from "@/components/bg";
import HeroGridReveal from "@/components/hero";
import ContactSection from "@/components/landing-contact";
import { MorphingNav } from "@/components/navbar";
import WorkHorizontalScrollSection from "@/components/work";
import { StudioNotes } from "@/components/studio-notes";
import { TechnicalPractice, TechnicalNotebook } from "@/components/technical-practice";
import { FolioThread } from "@/components/notebook-motion";

export default function CreativePortfolio() {
  return <div className="atelier-page"><ScrollRibbonBackground /><FolioThread /><MorphingNav /><HeroGridReveal /><StudioNotes /><TechnicalPractice /><WorkHorizontalScrollSection /><TechnicalNotebook /><ContactSection /></div>;
}
