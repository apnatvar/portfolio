"use client";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { Badge } from "../ui/badge";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Slide = {
  title: string;
  desc: string;
  src: string;
  imageLink: string;
  alt: string;
  tags: string[];
};

const MOCK_SLIDES: Slide[] = [
  {
    title: "Arie",
    desc: "eataepsut t amet consectetur adipisicing elit. Architecto quaeribus saepe mao voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/ap-icon.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie2",
    desc: "eataepsut t amet consectetur adipisicing elit. Architecto quaeribus saepe mao voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie3",
    desc: "eataepsut t amet consectetur adipisicing elit. Architecto quaeribus saepe mao voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie4",
    desc: "eataepsut t amet consectetur adipisicing elit. Architecto quaeribus saepe mao voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie",
    desc: "eataepsut t amet consectetur adipisicing elit. Architecto quaeribus saepe mao voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie3",
    desc: "eataepsut t amet consectetur adipisicing elit. Architecto quaeribus saepe mao voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/ap-icon.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
];

export default function FuturePlans() {
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const pinMeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const addtoHeadingRefs = (el: HTMLHeadingElement) => {
    if (el) {
      headingRefs.current.push(el);
    }
  };
  const addtoParagraphRefs = (el: HTMLParagraphElement) => {
    if (el) {
      paragraphRefs.current.push(el);
    }
  };
  const addtoPinRefs = (el: HTMLDivElement) => {
    if (el) {
      pinMeRefs.current.push(el);
    }
  };
  const addtoButtonRefs = (el: HTMLDivElement) => {
    if (el) {
      buttonRefs.current.push(el);
    }
  };
  const mm = gsap.matchMedia();
  function randomIntegerInRange(
    min: number,
    max: number,
    step: number
  ): number {
    const numSteps = (max - min) / step + 1;
    const randomStep = Math.floor(Math.random() * numSteps);
    const result = min + randomStep * step;
    return Math.random() > 0.5 ? result : -result;
  }
  useEffect(() => {
    if (
      !pinMeRefs.current ||
      !headingRefs.current ||
      !paragraphRefs.current ||
      !titleRef.current ||
      !buttonRefs.current
    )
      return;
    mm.add("(min-width: 100px)", () => {
      const splitTitle = new SplitText(titleRef.current, {
        type: "chars",
      });
      splitTitle.chars.forEach((char) => {
        gsap.from(char, {
          opacity: 0,
          x: randomIntegerInRange(20, 100, 5) * 10,
          y: randomIntegerInRange(20, 100, 5) * 10,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
            toggleActions: "restart pause reverse pause",
          },
        });
      });
      buttonRefs.current.forEach((buttonRef) => {
        gsap.from(buttonRef, {
          opacity: 0,
          scrollTrigger: {
            trigger: buttonRef,
            start: "top 70%",
            end: "top 40%",
            scrub: false,
          },
        });
      });
    });
    mm.add("(max-width: 799px)", () => {
      headingRefs.current.forEach((headingRef, idx) => {
        const splitHead = new SplitText(headingRefs.current[idx], {
          type: "chars",
        });
        const splitBody = new SplitText(paragraphRefs.current[idx], {
          type: "lines",
        });
        gsap.from(splitHead.chars, {
          x: -30,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef,
            start: "top 50%",
            scrub: false,
          },
        });
        gsap.from(splitBody.lines, {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: headingRef,
            start: "top 50%",
            scrub: false,
          },
        });
      });
    });
    mm.add("(min-width: 800px)", () => {
      pinMeRefs.current.forEach((pinMe, idx) => {
        if (idx === 0) {
          gsap.to(pinMe, {
            z: 0,
            opacity: 0,
            scrollTrigger: {
              trigger: pinMe,
              start: "top top",
              end: "bottom top",
              scrub: 10,
              pin: true,
              pinSpacing: false,
            },
          });
        } else {
          gsap.to(pinMe, {
            z: 0,
            scrollTrigger: {
              trigger: pinMe,
              start: "top top",
              end: `+=${MOCK_SLIDES.length - idx}00%`,
              scrub: true,
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            },
          });
          const splitHead = new SplitText(headingRefs.current[idx - 1], {
            type: "chars",
          });
          const splitBody = new SplitText(paragraphRefs.current[idx - 1], {
            type: "lines",
          });
          gsap.from(splitHead.chars, {
            x: -30,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pinMe,
              start: "top 50%",
              scrub: false,
            },
          });
          gsap.from(splitBody.lines, {
            y: -30,
            opacity: 0,
            stagger: 0.2,
            scrollTrigger: {
              trigger: pinMe,
              start: "top 30%",
              scrub: false,
            },
          });
        }
      });
    });
    return () => {
      mm.revert();
    };
  });
  return (
    <>
      <section
        ref={addtoPinRefs}
        className="min-h-dvh h-fit p-4 md:p-6 flex items-center z-0"
      >
        <h1
          ref={titleRef}
          className="text-8xl text-green-600 text-center w-full hover:not-visited:animate-pulse font-amita"
        >
          Future Plans
        </h1>
      </section>
      {MOCK_SLIDES.map((slide, idx) => (
        <section
          key={idx}
          className="min-h-dvh p-2 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-2 z-1 bg-background"
        >
          <div className="flex flex-col gap-2 min-h-full p-2">
            <h3
              ref={addtoHeadingRefs}
              className="text-4xl text-green-600 font-libre"
            >
              {slide.title}
            </h3>
            <div
              ref={addtoButtonRefs}
              className="flex flex-row flex-wrap gap-1"
            >
              {slide.tags.map((t, ti) => (
                <Badge
                  variant="outline"
                  key={ti}
                  className="inline-block hover:text-violet-500 font-playfair"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <p
              ref={addtoParagraphRefs}
              className="text-lg md:text-xl text-muted-foreground leading-10 font-space-grotestk"
            >
              {slide.desc}
            </p>
          </div>
          <div
            ref={addtoPinRefs}
            className="relative max-h-full aspect-square md:aspect-auto"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="rounded-3xl object-cover p-5"
            />
          </div>
        </section>
      ))}
    </>
  );
}
