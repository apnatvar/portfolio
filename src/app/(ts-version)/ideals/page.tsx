"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PrincipleSection = {
  title: string;
  principles: string[];
};

const PRINCIPLE_SECTIONS: PrincipleSection[] = [
  {
    title: "Fundamental Techniques in Handling People",
    principles: [
      "Don’t criticize, condemn or complain.",
      "Give honest and sincere appreciation.",
      "Arouse in the other person an eager want.",
    ],
  },
  {
    title: "Six Ways to Make People Like You",
    principles: [
      "Become genuinely interested in other people.",
      "Smile.",
      "Remember that a person’s name is to that person the sweetest and most important sound in any language.",
      "Be a good listener. Encourage others to talk about themselves.",
      "Talk in terms of the other person’s interests.",
      "Make the other person feel important — and do it sincerely.",
    ],
  },
  {
    title: "Win People to Your Way of Thinking",
    principles: [
      "The only way to get the best of an argument is to avoid it.",
      "Show respect for the other person’s opinions. Never say, “You’re wrong.”",
      "If you are wrong, admit it quickly and emphatically.",
      "Begin in a friendly way.",
      "Get the other person saying “yes, yes” immediately.",
      "Let the other person do a great deal of the talking.",
      "Let the other person feel that the idea is his or hers.",
      "Try honestly to see things from the other person’s point of view.",
      "Be sympathetic with the other person’s ideas and desires.",
      "Appeal to the nobler motives.",
      "Dramatize your ideas.",
      "Throw down a challenge.",
    ],
  },
  {
    title: "Be a Leader",
    principles: [
      "Begin with praise and honest appreciation.",
      "Call attention to people’s mistakes indirectly.",
      "Talk about your own mistakes before criticizing the other person.",
      "Ask questions instead of giving direct orders.",
      "Let the other person save face.",
      "Praise the slightest improvement and praise every improvement. Be “hearty in your approbation and lavish in your praise.”",
      "Give the other person a fine reputation to live up to.",
      "Use encouragement. Make the fault seem easy to correct.",
      "Make the other person happy about doing the thing you suggest.",
    ],
  },
];

export default function CarnegiePrinciples() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AnimatedBackground />

      <section className="relative z-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-6 md:py-16">
          <header className="mx-auto w-full max-w-4xl">
            <Card className="border-white/10 bg-white/8 shadow-2xl backdrop-blur-2xl">
              <CardContent className="px-6 py-8 md:px-10 md:py-10">
                <div className="flex flex-col gap-4 text-center">
                  <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                    How to Win Friends and Influence People
                  </h1>

                  <p className="text-sm leading-7 text-muted-foreground md:text-base">
                    Dale Carnegie
                  </p>
                </div>
              </CardContent>
            </Card>
          </header>

          <section className="flex flex-col gap-4 max-w-3xl mx-auto">
            {PRINCIPLE_SECTIONS.map((section) => (
              <article key={section.title} className="h-full w-full mx-auto">
                <Card className="h-full border-white/10 bg-white/8 shadow-2xl backdrop-blur-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                      {section.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <ol className="space-y-3">
                      {section.principles.map((principle, index) => (
                        <li
                          key={`${section.title}-${index + 1}`}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-4 backdrop-blur-xl"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-foreground">
                            {index + 1}
                          </div>

                          <p className="pt-0.5 text-sm leading-7 text-foreground/95 md:text-base">
                            {principle}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}

function AnimatedBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.03),_transparent_30%)]" />

        <div className="blob blob-1 absolute left-[-8rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500 blur-[110px] md:h-[34rem] md:w-[34rem]" />
        <div className="blob blob-2 absolute right-[-8rem] top-[8%] h-[22rem] w-[22rem] rounded-full bg-orange-400 blur-[110px] md:h-[30rem] md:w-[30rem]" />
        <div className="blob blob-3 absolute left-[8%] top-[38%] h-[18rem] w-[18rem] rounded-full bg-violet-500 blur-[110px] md:h-[26rem] md:w-[26rem]" />
        <div className="blob blob-4 absolute right-[10%] top-[45%] h-[20rem] w-[20rem] rounded-full bg-pink-500 blur-[120px] md:h-[28rem] md:w-[28rem]" />
        <div className="blob blob-5 absolute bottom-[-8rem] left-[18%] h-[22rem] w-[22rem] rounded-full bg-cyan-400 blur-[120px] md:h-[30rem] md:w-[30rem]" />
        <div className="blob blob-6 absolute bottom-[-8rem] right-[8%] h-[24rem] w-[24rem] rounded-full bg-amber-300 blur-[120px] md:h-[32rem] md:w-[32rem]" />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 backdrop-blur-[60px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,16,0.72),rgba(8,8,12,0.82))]" />
      </div>
    </>
  );
}
