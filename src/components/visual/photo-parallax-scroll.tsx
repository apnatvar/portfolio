import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollImage() {
  const pinRef = useRef<HTMLHeadingElement>(null);
  const toPinRef = useRef<HTMLHeadingElement>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const addtoImageRefs = (el: HTMLImageElement) => {
    if (el) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!imageRefs.current || !pinRef.current || !toPinRef.current) return;
    const toKill: HTMLImageElement[] = [];
    imageRefs.current.forEach((imageRef: HTMLImageElement) => {
      const speed: number = Number(imageRef.getAttribute("data-speed"));
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=200dvh",
          pin: toPinRef.current,
          pinSpacing: "margin",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        imageRef,
        {
          scale: 1 / gsap.utils.random(1, 10, 1),
          yPercent: 200 * speed,
        },
        {
          yPercent: -100 * speed,
          scale: 1,
        },
        0
      );
      toKill.push(imageRef);
    });
    return () => {
      gsap.killTweensOf(toKill);
    };
  }, [imageRefs, pinRef]);

  return (
    <>
      <div ref={pinRef} className="h-[100dvh]" />
      <div className="relative">
        <h1
          ref={toPinRef}
          className="w-full sticky text-center text-8xl mx-auto font-extrabold text-stroke-only mix-blend-color-dodge mb-[20dvh] z-11"
        >
          Pixels <br />
          Simulating <br />
          Life
        </h1>
        <div className="min-h-dvh relative flex flex-wrap justify-around">
          <div className="relative text-center w-20 h-40 z-10">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={4}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={2}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={3}
            />
          </div>
          <div className="relative text-center w-100 h-100 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={1}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={4}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={5}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={6}
            />
          </div>
          <div className="relative text-center w-100 h-100 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={9}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={8}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={7}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-10 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={13}
            />
          </div>
        </div>
      </div>
    </>
  );
}
