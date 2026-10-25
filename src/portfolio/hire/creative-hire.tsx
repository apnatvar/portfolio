import { HireAP } from "@/components/hire";
import { WordCarousel } from "@/components/landing-contact";
import { MorphingNav } from "@/components/navbar";
import type { DisplayMode } from "@/components/display-mode/display-mode-provider";

const HIRE_WORDS = [
  "Technical SEO",
  "Programmatic SEO",
  "Next.js",
  "TypeScript",
  "Web Performance",
  "AI-assisted Automation",
];

export function CreativeHire({ mode = "creative" }: { mode?: DisplayMode }) {
  return (
    <>
      <MorphingNav />
      {mode === "creative" ? <div className="h-24" /> : null}
      {mode === "creative" ? <div className="md:hidden"><div className="word-carousels flex w-full"><WordCarousel words={HIRE_WORDS} direction="forward" /></div></div> : null}
      <p className="mx-auto max-w-3xl px-6 py-6 text-muted-foreground">
        For a technical SEO enquiry, include the site URL, the issue or goal,
        relevant search or performance evidence, and any platform or delivery constraints.
      </p>
      <HireAP landing={false} presentation={mode} />
      {mode === "creative" ? <div className="md:hidden"><div className="word-carousels flex w-full"><WordCarousel words={HIRE_WORDS} direction="backward" /></div></div> : null}
    </>
  );
}
