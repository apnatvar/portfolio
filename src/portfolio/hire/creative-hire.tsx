import { HireAP } from "@/components/hire";
import { WordCarousel } from "@/components/landing-contact";
import { MorphingNav } from "@/components/navbar";
import { WORDS } from "@/lib/words";
import type { DisplayMode } from "@/components/display-mode/display-mode-provider";

export function CreativeHire({ mode = "creative" }: { mode?: DisplayMode }) {
  return (
    <>
      <MorphingNav />
      {mode === "creative" ? <div className="h-24" /> : null}
      {mode === "creative" ? <div className="md:hidden"><div className="word-carousels flex w-full"><WordCarousel words={WORDS} direction="forward" /></div></div> : null}
      <HireAP landing={false} presentation={mode} />
      {mode === "creative" ? <div className="md:hidden"><div className="word-carousels flex w-full"><WordCarousel words={WORDS} direction="backward" /></div></div> : null}
    </>
  );
}
