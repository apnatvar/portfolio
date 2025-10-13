import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollImage() {
  const pinRef = useRef<HTMLHeadingElement>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const addtoImageRefs = (el: HTMLImageElement) => {
    if (el) {
      imageRefs.current.push(el);
    }
  };
  useEffect(() => {
    if (!imageRefs.current || !pinRef.current) return;
    function randomIntegerInRange(
      min: number,
      max: number,
      step: number
    ): number {
      const numSteps = (max - min) / step + 1;
      const randomStep = Math.floor(Math.random() * numSteps);
      const result = min + randomStep * step;
      return result;
    }
    imageRefs.current.forEach((imageRef: HTMLImageElement) => {
      const speed: number = Number(imageRef.getAttribute("data-speed"));
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top 90%",
          end: "top 50%",
          pin: imageRef,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        imageRef,
        {
          rotateY: randomIntegerInRange(20, 50, 5),
          scale: 0.5,
          skewY: randomIntegerInRange(20, 40, 5),
          yPercent: 50,
        },
        {
          yPercent: -60 * speed,
          scale: 1,
          rotateY: 0,
          skewY: 0,
          y: -randomIntegerInRange(80, 120, 10),
        }
      );
    });
  }, [imageRefs, pinRef]);

  return (
    <>
      <div className="h-[50dvh]"></div>
      <div className="h-dvh">
        <h1
          ref={pinRef}
          className="w-full absolute text-center z-999 text-5xl mx-auto"
        >
          Photographs I edit
        </h1>
        <div className="relative flex flex-wrap justify-around">
          <div className="relative text-center w-100 h-100 z-100 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={1}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-100">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={4}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-100 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={2}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-100 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={3}
            />
          </div>
          <div className="relative text-center w-100 h-100 z-100 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={1}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-100  grid-spa">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={4}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-100 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={5}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-100 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={6}
            />
          </div>
          <div className="relative text-center w-100 h-100 z-100 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={9}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-100  grid-spa">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={8}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-100 ">
            <Image
              src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg"
              fill
              alt="Snapseed"
              ref={addtoImageRefs}
              className=""
              data-speed={7}
            />
          </div>
          <div className="relative text-center w-20 h-40 z-100 ">
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
