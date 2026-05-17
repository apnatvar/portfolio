"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type LinkItem = {
  href: string;
  title: string;
  reason: string;
  description: string;
};

const linkItems: LinkItem[] = [
  {
    href: "https://medium.com/@nattupi",
    title: "Medium",
    reason: "Blogs",
    description: "Daily blogs on technology, philosophy, and more.",
  },
  {
    href: "https://github.com/apnatvar",
    title: "Github",
    reason: "Code",
    description: "Automations, UI design, CMS, and dynamic websites.",
  },
  {
    href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
    title: "Linkedin",
    reason: "Work",
    description: "Certifications, Experience, and Skills.",
  },
];

function SplitLetters({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-block whitespace-nowrap"
        >
          {word.split("").map((letter, letterIndex) => (
            <span
              key={`${letter}-${letterIndex}`}
              className="link-letter inline-block will-change-transform"
            >
              {letter}
            </span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </>
  );
}

export default function ShaderLinksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".link-card");

      gsap.set(cards, {
        autoAlpha: 0,
        yPercent: 100,
        zIndex: (index) => index + 1,
      });

      gsap.set(cards[0], {
        autoAlpha: 1,
        yPercent: 0,
      });

      cards.forEach((card, index) => {
        const titleLetters = card.querySelectorAll<HTMLElement>(
          ".title-text .link-letter",
        );
        const reasonLetters = card.querySelectorAll<HTMLElement>(
          ".reason-text .link-letter",
        );
        const description =
          card.querySelector<HTMLElement>(".description-text");

        gsap.set(titleLetters, { x: 80, autoAlpha: 0 });
        gsap.set(reasonLetters, { x: -80, autoAlpha: 0 });
        gsap.set(description, { y: 80, autoAlpha: 0 });

        if (index === 0) {
          gsap.set(titleLetters, { x: 0, autoAlpha: 1 });
          gsap.set(reasonLetters, { x: 0, autoAlpha: 1 });
          gsap.set(description, { y: 0, autoAlpha: 1 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=240%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const st = tl.scrollTrigger;

      if (st?.pin instanceof HTMLElement) {
        const spacer = st.pin.parentElement;

        if (spacer) {
          spacer.style.backgroundColor = "var(--foreground)";
        }
      }

      cards.forEach((card, index) => {
        if (index === 0) return;

        const titleLetters = card.querySelectorAll<HTMLElement>(
          ".title-text .link-letter",
        );
        const reasonLetters = card.querySelectorAll<HTMLElement>(
          ".reason-text .link-letter",
        );
        const description =
          card.querySelector<HTMLElement>(".description-text");

        tl.to(card, {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1,
          ease: "none",
        });

        tl.to(
          titleLetters,
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.015,
            duration: 0.8,
            ease: "none",
          },
          "<",
        );

        tl.to(
          reasonLetters,
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.015,
            duration: 0.8,
            ease: "none",
          },
          "<",
        );

        tl.to(
          description,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "none",
          },
          "<0.15",
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 bg-foreground">
      <div className="relative py-8">
        {linkItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            className="link-card w-full overflow-hidden rounded-[2rem]  text-black"
          >
            <div className="flex w-full justify-between leading-none font-italianno text-6xl md:text-9xl px-12 md:px-16 pt-8 text-background">
              <h3 className="title-text transition-all hover:tracking-widest duration-500">
                <SplitLetters text={item.title} />
              </h3>

              <p className="reason-text transition-all hover:tracking-widest duration-500 text-right">
                <SplitLetters text={item.reason} />
              </p>
            </div>

            <p className="description-text w-full text-base uppercase tracking-wide md:text-xl text-center text-muted">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
