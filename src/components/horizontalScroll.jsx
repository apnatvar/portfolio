"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollOnVertical({ length=5, children }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;

      const totalScrollWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalScrollWidth - viewportWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.5, // smoothness factor — increase for slower feel
          start: "top top",
          end: () => `+=${totalScrollWidth * 1.1}`, // matches horizontal distance
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ overflow: "hidden" }}>
      <div
        ref={trackRef} 
        style={{
          display: "flex",
          width: `${length*100}vw`,
          flexWrap: "nowrap",
        }}
      >
        {children}
      </div>
    </section>
  );
}
