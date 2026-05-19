"use client";
import { HireAP } from "@/components/hire";
import { WordCarousel } from "@/components/landing-contact";
import { MorphingNav } from "@/components/navbar";
import { WORDS } from "@/lib/words";

export default function Page() {
  return (
    <>
      <MorphingNav /> <div className="min-h-[60svh] md:min-h-[50svh]" />
      <div className="md:hidden row-start-1">
        <div className="word-carousels flex w-full">
          <WordCarousel words={WORDS} direction="forward" />
        </div>
      </div>
      <HireAP landing={false} />
      <div className="md:hidden row-start-1">
        <div className="word-carousels flex w-full">
          <WordCarousel words={WORDS} direction="backward" />
        </div>
      </div>
    </>
  );
}
