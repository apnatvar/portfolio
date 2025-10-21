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
    title: "Bringing Motion to Meaning",
    desc: "Animation is where design breathes. I continue to push creative boundaries with GSAP and Motion.dev making transitions feel deliberate and alive, inviting user interaction.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["GSAP", "2D/3D Animations", "Motion.dev"],
  },
  {
    title: "A Third Dimension",
    desc: "3D modelling will enable me to craft custom objects, SVGs and props, build immersive scenes, and bring them to life using Three.js and GSAP. This will help me create custom experiences that feel unique and personalized.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Three.js", "3D Modelling", "SVG"],
  },
  {
    title: "Mastering the Principles",
    desc: "I plan to pursue a Master's in Design to deepen my understanding of visual psychology, user perception, and design best practices. The goal is to create with intention and craft simple and memorable experiences.",
    src: "/ap-icon.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Master's", "Design", "Interaction"],
  },
  {
    title: "Learning from the System",
    desc: "Nothing is better than learning straight from professionals. Working in a collaborative, high-standard design studio will be a great ladder to climb for my ultimate leap of faith.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Developer", "UI/UX", "Designer"],
  },
  {
    title: "Building My Simulation",
    desc: "I want to establish my own design studio creating memorable stories and experiences. My biggest motivations for this dream are Pininfarina and Jony Ive's IO and earlier work. I am inspired to merge function with emotion and be an excellent digital storyteller.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Design", "Storytelling", "Entrepreneur"],
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
          x: gsap.utils.random(-100, 100, 10) * 10,
          y: gsap.utils.random(-100, 100, 10) * 10,
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
            fastScrollEnd: true,
          },
        });
      });
    });
    mm.add("(max-width: 799px)", () => {
      headingRefs.current.forEach((headingRef, idx) => {
        const splitHead = new SplitText(headingRefs.current[idx], {
          type: "words",
        });
        const splitBody = new SplitText(paragraphRefs.current[idx], {
          type: "words, lines",
        });
        gsap.from(splitHead.words, {
          x: -20,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef,
            start: "top 50%",
            scrub: false,
            fastScrollEnd: true,
          },
        });
        gsap.from(splitBody.lines, {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: headingRef,
            start: "top 50%",
            scrub: false,
            fastScrollEnd: true,
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
              scrub: 5,
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
            type: "words",
          });
          const splitBody = new SplitText(paragraphRefs.current[idx - 1], {
            type: "lines",
          });
          gsap.from(splitHead.words, {
            x: -30,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pinMe,
              start: "top 50%",
              scrub: false,
              fastScrollEnd: true,
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
              fastScrollEnd: true,
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
        className="relative min-h-dvh h-fit p-4 md:p-6 flex items-center z-0"
      >
        <Image
          src={"/2.jpg"}
          fill
          alt="test"
          className="absolute inset-0 h-full object-cover opacity-30"
        />
        <h1
          ref={titleRef}
          className="text-5xl md:text-8xl text-green-600 text-center w-full font-unbounded"
        >
          Plans of <br />
          Tomorrow
        </h1>
      </section>
      {MOCK_SLIDES.map((slide, idx) => (
        <section
          key={idx}
          className="min-h-dvh p-2 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-2 z-1 bg-background"
        >
          <div className="flex flex-col gap-2 min-h-full p-2 justify-end">
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
              className="rounded-full object-cover p-5"
            />
          </div>
        </section>
      ))}
    </>
  );
}
