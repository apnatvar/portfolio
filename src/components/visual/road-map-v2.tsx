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
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet pariatur, nemo cumque ullam porro, ipsa, maiores provident accusantium magni beatae odio veritatis excepturi placeat? Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque vero nesciunt consequuntur quis repudiandae dolor voluptates nulla, odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quaerat cum laborum impedit laudantium similique, dolores ipsam veniam quis temporibus saepe magni corrupti officia est, maxime odio voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/ap-icon.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie2",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet pariatur, nemo cumque ullam porro, ipsa, maiores provident accusantium magni beatae odio veritatis excepturi placeat? Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque vero nesciunt consequuntur quis repudiandae dolor voluptates nulla, odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quaerat cum laborum impedit laudantium similique, dolores ipsam veniam quis temporibus saepe magni corrupti officia est, maxime odio voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie3",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet pariatur, nemo cumque ullam porro, ipsa, maiores provident accusantium magni beatae odio veritatis excepturi placeat? Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque vero nesciunt consequuntur quis repudiandae dolor voluptates nulla, odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quaerat cum laborum impedit laudantium similique, dolores ipsam veniam quis temporibus saepe magni corrupti officia est, maxime odio voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie4",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet pariatur, nemo cumque ullam porro, ipsa, maiores provident accusantium magni beatae odio veritatis excepturi placeat? Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque vero nesciunt consequuntur quis repudiandae dolor voluptates nulla, odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quaerat cum laborum impedit laudantium similique, dolores ipsam veniam quis temporibus saepe magni corrupti officia est, maxime odio voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet pariatur, nemo cumque ullam porro, ipsa, maiores provident accusantium magni beatae odio veritatis excepturi placeat? Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque vero nesciunt consequuntur quis repudiandae dolor voluptates nulla, odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quaerat cum laborum impedit laudantium similique, dolores ipsam veniam quis temporibus saepe magni corrupti officia est, maxime odio voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/mountain.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
  {
    title: "Arie3",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet pariatur, nemo cumque ullam porro, ipsa, maiores provident accusantium magni beatae odio veritatis excepturi placeat? Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque vero nesciunt consequuntur quis repudiandae dolor voluptates nulla, odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quaerat cum laborum impedit laudantium similique, dolores ipsam veniam quis temporibus saepe magni corrupti officia est, maxime odio voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit maiores fugiat perferendis placeat sequi odio porro non cupiditate natus voluptatum temporibus omnis optio ea atque reprehenderit, hic quia illum neque.",
    src: "/ap-icon.svg",
    imageLink: "https://www.google.com",
    alt: "A stylized mountain illustration",
    tags: ["Python", "SQL"],
  },
];

export default function FuturePlans() {
  const endRef = useRef<HTMLDivElement | null>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const pinMeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const addtoHeadingRefs = (el: HTMLImageElement) => {
    if (el) {
      headingRefs.current.push(el);
    }
  };
  const addtoParagraphRefs = (el: HTMLImageElement) => {
    if (el) {
      paragraphRefs.current.push(el);
    }
  };
  const addtoPinRefs = (el: HTMLImageElement) => {
    if (el) {
      pinMeRefs.current.push(el);
    }
  };
  useEffect(() => {
    if (
      !pinMeRefs.current ||
      !endRef.current ||
      !headingRefs.current ||
      !paragraphRefs.current
    )
      return;

    const ctx = gsap.context(() => {
      pinMeRefs.current.forEach((pinMe, idx) => {
        if (idx === 0) {
          gsap.to(pinMe, {
            z: 0,
            skewX: -90,
            opacity: 0,
            scrollTrigger: {
              trigger: pinMe,
              endTrigger: pinMe,
              start: "top top",
              end: "bottom top",
              scrub: true,
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
              //   end: () =>
              //     idx === MOCK_SLIDES.length
              //       ? "bottom 78%"
              //       : `+=${MOCK_SLIDES.length - idx}00%`,
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
      ctx.revert();
    };
  }); //0 1 2 3 4 5
  return (
    //1 1 2 3 4 5 # 5
    <>
      <section
        ref={addtoPinRefs}
        className="min-h-dvh h-fit p-4 md:p-6 flex items-center z-0"
      >
        <h1 className="text-8xl text-green-600 text-center w-full">
          Future Plans
        </h1>
      </section>
      {MOCK_SLIDES.map((slide, idx) => (
        <section
          key={idx}
          className="min-h-full p-2 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-2 z-1 bg-background"
        >
          <div className="flex flex-col gap-2 min-h-full">
            <h3 ref={addtoHeadingRefs} className="text-4xl text-green-600">
              {slide.title}
            </h3>
            <div className="flex gap-1">
              {slide.tags.map((t, ti) => (
                <Badge
                  variant="outline"
                  key={ti}
                  className="hover:text-violet-500"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <p
              ref={addtoParagraphRefs}
              className="text-md text-muted-foreground leading-6"
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
      <div ref={endRef} className="h-0 bg-background" />
    </>
  );
}
