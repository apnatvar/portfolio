"use client";
import "@/app/visual.css";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function FuturePlans() {
  const pinMeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const addtoPinRefs = (el: HTMLImageElement) => {
    if (el) {
      pinMeRefs.current.push(el);
    }
  };
  useEffect(() => {
    if (!pinMeRefs.current) return;
    const ctx = gsap.context(() => {
      pinMeRefs.current.forEach((pinMe, idx) => {
        gsap.to(pinMe, {
          z: 0,
          skewX: () => {
            return idx === 0 ? -90 : 0;
          },
          scale: 0.8,
          opacity: 0,
          scrollTrigger: {
            trigger: pinMe,
            start: "top top",
            end: `=+100%`,
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });
      });
    });
    return () => {
      ctx.revert();
    };
  });
  return (
    <>
      <div className="h-dvh bg-white" />

      <section
        ref={addtoPinRefs}
        className="min-h-dvh h-fit p-4 md:p-6 flex items-center z-0"
      >
        <h1 className="text-8xl text-green-600 text-center w-full">
          Future Plans
        </h1>
      </section>
      <section
        ref={addtoPinRefs}
        className="min-h-dvh h-fit p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-2 z-1 bg-background"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl text-green-600">Design Degree</h3>
          <p className="text-md text-muted-foreground leading-6 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            pariatur, nemo cumque ullam porro, ipsa, maiores provident
            accusantium magni beatae odio veritatis excepturi placeat?
            Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque
            vero nesciunt consequuntur quis repudiandae dolor voluptates nulla,
            odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            quaerat cum laborum impedit laudantium similique, dolores ipsam
            veniam quis temporibus saepe magni corrupti officia est, maxime odio
            voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Velit maiores fugiat perferendis placeat sequi
            odio porro non cupiditate natus voluptatum temporibus omnis optio ea
            atque reprehenderit, hic quia illum neque.
          </p>
        </div>
        <div className="relative max-h-dvh aspect-square md:aspect-auto">
          <Image
            quality={100}
            src="ap-icon.svg"
            alt="test"
            fill
            className="rounded-3xl object-cover p-5"
          />
        </div>
      </section>
      <section
        ref={addtoPinRefs}
        className="min-h-dvh h-fit p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-2 z-2 bg-background"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl text-green-600">3D Modelling and Three.js</h3>
          <p className="text-md text-muted-foreground leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            pariatur, nemo cumque ullam porro, ipsa, maiores provident
            accusantium magni beatae odio veritatis excepturi placeat?
            Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque
            vero nesciunt consequuntur quis repudiandae dolor voluptates nulla,
            odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            quaerat cum laborum impedit laudantium similique, dolores ipsam
            veniam quis temporibus saepe magni corrupti officia est, maxime odio
            voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Velit maiores fugiat perferendis placeat sequi
            odio porro non cupiditate natus voluptatum temporibus omnis optio ea
            atque reprehenderit, hic quia illum neque.
          </p>
        </div>
        <div className="relative max-h-dvh aspect-square md:aspect-auto">
          <Image
            quality={100}
            src="ap-icon.svg"
            alt="test"
            fill
            className="rounded-3xl object-cover p-5"
          />
        </div>
      </section>
      <section
        ref={addtoPinRefs}
        className="min-h-dvh h-fit p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-2 z-3 bg-background"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl text-green-600">Exciting Animations</h3>
          <p className="text-md text-muted-foreground leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            pariatur, nemo cumque ullam porro, ipsa, maiores provident
            accusantium magni beatae odio veritatis excepturi placeat?
            Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque
            vero nesciunt consequuntur quis repudiandae dolor voluptates nulla,
            odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            quaerat cum laborum impedit laudantium similique, dolores ipsam
            veniam quis temporibus saepe magni corrupti officia est, maxime odio
            voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Velit maiores fugiat perferendis placeat sequi
            odio porro non cupiditate natus voluptatum temporibus omnis optio ea
            atque reprehenderit, hic quia illum neque.
          </p>
        </div>
        <div className="relative max-h-dvh aspect-square md:aspect-auto">
          <Image
            quality={100}
            src="ap-icon.svg"
            alt="test"
            fill
            className="rounded-3xl object-cover p-5"
          />
        </div>
      </section>
      <section
        ref={addtoPinRefs}
        className="min-h-dvh h-fit p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-2 z-4 bg-background"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl text-green-600">Pasticks</h3>
          <p className="text-md text-muted-foreground leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            pariatur, nemo cumque ullam porro, ipsa, maiores provident
            accusantium magni beatae odio veritatis excepturi placeat?
            Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque
            vero nesciunt consequuntur quis repudiandae dolor voluptates nulla,
            odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            quaerat cum laborum impedit laudantium similique, dolores ipsam
            veniam quis temporibus saepe magni corrupti officia est, maxime odio
            voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Velit maiores fugiat perferendis placeat sequi
            odio porro non cupiditate natus voluptatum temporibus omnis optio ea
            atque reprehenderit, hic quia illum neque.
          </p>
        </div>
        <div className="relative max-h-dvh aspect-square md:aspect-auto">
          <Image
            quality={100}
            src="ap-icon.svg"
            alt="test"
            fill
            className="rounded-3xl object-cover p-5"
          />
        </div>
      </section>
      <section
        ref={addtoPinRefs}
        className="min-h-dvh h-fit p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 z-5 bg-background"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl text-green-600">Design Studio</h3>
          <p className="text-md text-muted-foreground leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            pariatur, nemo cumque ullam porro, ipsa, maiores provident
            accusantium magni beatae odio veritatis excepturi placeat?
            Laudantium accusamus aut ad hic recusandae! Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Esse culpa impedit nobis itaque
            vero nesciunt consequuntur quis repudiandae dolor voluptates nulla,
            odit est natus perferendis, ut facilis. Dicta, voluptatibus nobis.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            quaerat cum laborum impedit laudantium similique, dolores ipsam
            veniam quis temporibus saepe magni corrupti officia est, maxime odio
            voluptates error reiciendis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Velit maiores fugiat perferendis placeat sequi
            odio porro non cupiditate natus voluptatum temporibus omnis optio ea
            atque reprehenderit, hic quia illum neque.
          </p>
        </div>
        <div className="relative max-h-dvh px-3 aspect-square md:aspect-auto">
          <Image
            quality={100}
            src="ap-icon.svg"
            alt="test"
            fill
            className="rounded-3xl object-cover aspect-square px-5"
          />
        </div>
      </section>
      <div className="h-dvh bg-background" />
      <div className="h-dvh bg-white" />
    </>
  );
}
