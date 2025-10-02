"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// icons
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { SiApplemusic, SiChessdotcom } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

type SocialItem = {
  label: string;
  href: string;
  funText: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SOCIAL_DATA: SocialItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
    funText: "I will edit this, but for now it is a slightly long funny text",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/apnatvar/",
    funText: "I will edit this, but for now it is a slightly long funny text",
    icon: FaGithub,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/nattupi/",
    funText: "I will edit this, but for now it is a slightly long funny text",
    icon: FaInstagram,
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/profile/nattupi",
    funText: "I will edit this, but for now it is a slightly long funny text",
    icon: SiApplemusic,
  },
  {
    label: "Chess.com",
    href: "https://www.chess.com/member/nattupi",
    funText: "I will edit this, but for now it is a slightly long funny text",
    icon: SiChessdotcom,
  },
];

export default function SocialShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridPinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal on view
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>(".social-card");
      const funs = gsap.utils.toArray<HTMLElement>(".social-fun");

      // Base states
      gsap.set(cards, { opacity: 0.6, scale: 1, willChange: "transform" });
      gsap.set(funs, { opacity: 0, y: 12, pointerEvents: "none" });

      // Timeline that pins the grid and cycles highlights one-by-one
      const steps = SOCIAL_DATA.length;
      const stepHeight = 420; // px of scroll per item (tweak as you like)
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: gridPinRef.current,
          start: "top top",
          end: `+=${steps * stepHeight}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // first item comes in
      if (cards[0] && funs[0]) {
        tl.to(cards[0], { opacity: 1, scale: 1.04, duration: 0.35 }).to(
          funs[0],
          { opacity: 1, y: 0, duration: 0.35 },
          "<"
        );
      }

      // iterate through the rest, fading out previous funText and highlighting next card
      for (let i = 1; i < steps; i++) {
        const prevCard = cards[i - 1];
        const prevFun = funs[i - 1];
        const nextCard = cards[i];
        const nextFun = funs[i];

        tl.to(prevFun, { opacity: 0, y: -10, duration: 0.3 })
          .to(prevCard, { opacity: 0.2, scale: 0.8, duration: 0.3 }, "<")
          .to(nextCard, { opacity: 1, scale: 0.9, duration: 0.35 })
          .to(nextFun, { opacity: 1, y: 0, duration: 0.35 }, "<");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
      aria-labelledby="hello-heading"
    >
      {/* subtle background flair */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30"
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <h2
          id="hello-heading"
          ref={headingRef}
          className="text-center text-3xl md:text-5xl font-bold tracking-tight"
        >
          Hello! It&apos;s ME
        </h2>

        <div ref={gridPinRef} className="mt-8 md:mt-12">
          <div
            className="
              grid gap-6
              grid-cols-1
              md:grid-cols-3
            "
          >
            {SOCIAL_DATA.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card
                  key={i}
                  className="social-card relative bg-muted/30 backdrop-blur supports-[backdrop-filter]:bg-muted/40"
                >
                  <CardHeader className="pt-3 pb-0 flex items-center justify-center">
                    <Icon className="h-6 w-6 md:h-8 md:w-8 text-foreground" />
                    <div className="mt-3 text-sm md:text-lg font-semibold text-center">
                      {item.label}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 pb-3">
                    {/* fun text area (reserved height to avoid layout jump) */}
                    <p className="social-fun text-sm md:text-base text-primary/90 text-center min-h-[2rem] leading-relaxed">
                      {item.funText}
                    </p>

                    {/* external link as shadcn Button (ghost) */}
                    <div className="mt-3 flex justify-center">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                      >
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Visit
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
