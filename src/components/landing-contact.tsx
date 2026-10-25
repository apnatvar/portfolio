"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { useNearViewport } from "@/lib/use-near-viewport";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const isNearViewport = useNearViewport(sectionRef);

  useLayoutEffect(() => {
    if (!isNearViewport) return;

    let revertMedia: () => void = () => {};
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      const motionMm = gsap.matchMedia();
      revertMedia = () => motionMm.revert();
      motionMm.add("(prefers-reduced-motion: no-preference)", () => {
        const responsiveMm = gsap.matchMedia();
        responsiveMm.add(
          { isDesktop: "(min-width: 800px)" },
          (context) => {
            const isDesktop = Boolean(context.conditions?.isDesktop);
            gsap.set(image, { scale: 1.3, rotate: -12 });
            gsap.set(".reveal-once", { autoAlpha: 0, y: 24 });

            gsap.to(image, {
              scale: 1,
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: isDesktop ? "top 30%" : "top 60%",
                scrub: true,
              },
            });

            ScrollTrigger.create({
              trigger: section,
              start: "top bottom",
              end: "top 50%",
              scrub: true,
              onUpdate: (self) => {
                if (self.progress < 0.8) return;

                gsap.to(".reveal-once", {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.45,
                  stagger: 0.06,
                  overwrite: "auto",
                });

              },
            });
          },
        );
        return () => responsiveMm.revert();
      });
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      revertMedia();
      ctx.revert();
    };
  }, [isNearViewport]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-40"
    >
      <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
        <div className="max-w-3xl">
          <span className="atelier-label">03 / Leave a note</span>
          <h2 className="reveal-once mt-8 font-italianno text-7xl leading-none md:text-9xl">Have a thought?</h2>
          <p className="reveal-once mt-5 max-w-xl text-base font-normal leading-relaxed md:text-xl">
            I’m always glad to hear what you’re working on.
          </p>
          <div className="reveal-once mt-8 flex flex-col items-start gap-3 text-base md:text-lg">
            <Link className="underline decoration-muted-foreground underline-offset-4 hover:decoration-foreground" href="mailto:rawat@apnatva.dev">rawat@apnatva.dev</Link>
            <Link className="text-muted-foreground hover:text-foreground" href="https://www.linkedin.com/in/apnatva-singh-rawat/" target="_blank" rel="noreferrer">Find me on LinkedIn</Link>
          </div>
        </div>
        <div className="flex justify-start md:justify-end">
          <div ref={imageRef} className="overflow-hidden rounded-full">
            <Image
              src="/4.webp"
              alt="Apnatva Singh Rawat"
              width={280}
              height={280}
              className="aspect-square object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
