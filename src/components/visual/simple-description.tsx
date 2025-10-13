"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  panelBoxWidth?: number;
  panelBoxVH?: number;
  showMarkers?: boolean;
};

const PanelScrollDemo: React.FC<Props> = ({
  panelBoxWidth = 450,
  panelBoxVH = 80,
  showMarkers = false,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const sectionBlackRef = useRef<HTMLElement | null>(null);
  //   const ctxRef = useRef<gsap.Context | null>(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);

  useEffect(() => {
    if (!scrollerRef.current || !sectionBlackRef.current) return;

    // Initialize Smooth Scrollbar on the scroller element
    const scrollerEl = scrollerRef.current;

    // Ensure the container can host smooth-scrollbar
    scrollerEl.style.position = "fixed";
    scrollerEl.style.inset = "0";
    scrollerEl.style.overflow = "hidden";

    const sb = Scrollbar.init(scrollerEl, {
      damping: 0.1,
      delegateTo: document,
      alwaysShowTracks: false,
    });
    scrollbarRef.current = sb;

    // Tell ScrollTrigger to use the Smooth Scrollbar container as scroller
    ScrollTrigger.scrollerProxy(scrollerEl, {
      scrollTop(value?: number) {
        if (arguments.length && typeof value === "number") {
          sb.scrollTop = value;
        }
        return sb.scrollTop;
      },
      // Needed so pinning works correctly with custom scroller
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // Optional: if you use horizontal or other metrics, add them here.
    });

    // Sync ScrollTrigger on Smooth Scrollbar updates
    const onScroll = () => ScrollTrigger.update();
    sb.addListener(onScroll);

    // Default the scroller for all triggers inside this component
    ScrollTrigger.defaults({ scroller: scrollerEl as Element });

    // GSAP scoped context for clean-up
    const ctx = gsap.context(() => {
      // Layer the .panel elements (highest zIndex on first)
      gsap.set(".panel", {
        zIndex: (_i, _t, targets) => (targets as Element[]).length - _i,
      });

      // Animate each panel height to 0 on scroll (except the purple one)
      const images = gsap.utils.toArray<HTMLDivElement>(
        ".panel:not(.panel-purple)"
      );
      images.forEach((image, i) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionBlackRef.current!,
              start: () => "top -" + window.innerHeight * (i + 0.5),
              end: () => "+=" + window.innerHeight,
              scrub: true,
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,
              markers: showMarkers,
            },
          })
          .to(image, { height: 0 });
      });

      // Layer the text slides too
      gsap.set(".panel-text", {
        zIndex: (_i, _t, targets) => (targets as Element[]).length - _i,
      });

      const texts = gsap.utils.toArray<HTMLDivElement>(".panel-text");
      texts.forEach((text, i) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionBlackRef.current!,
              start: () => "top -" + window.innerHeight * i,
              end: () => "+=" + window.innerHeight,
              scrub: true,
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,
              markers: showMarkers,
            },
          })
          .to(text, { duration: 0.33, opacity: 1, y: "50%" })
          .to(text, { duration: 0.33, opacity: 0, y: "0%" }, 0.66);
      });

      // Pin the middle (black) section for the stacked sequence
      ScrollTrigger.create({
        trigger: sectionBlackRef.current!,
        scrub: true,
        pin: true,
        start: "top top",
        end: () => "+=" + (images.length + 1) * window.innerHeight,
        invalidateOnRefresh: true,
        markers: showMarkers,
      });
    }, scrollerRef);

    // Refresh after layout is ready
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      sb.removeListener(onScroll);
      sb.destroy();
      ScrollTrigger.clearMatchMedia();
      ScrollTrigger.killAll(); // safe here since this component owns the triggers
    };
  }, [panelBoxVH, panelBoxWidth, showMarkers]);

  // Utility tailwind sizes via inline style for custom w/h
  const boxStyle: React.CSSProperties = {
    width: `${panelBoxWidth}px`,
    height: `${panelBoxVH}vh`,
  };

  return (
    <div ref={scrollerRef} className="h-screen w-screen bg-black">
      {/* Section 1: Orange intro */}
      <section className="flex h-screen items-center justify-center bg-[#753500]">
        <div className="text-white text-lg sm:text-xl">
          This is some text inside of a div block.
        </div>
      </section>

      {/* Section 2: Black – pinned, panels + vertical text slides */}
      <section
        ref={sectionBlackRef}
        className="flex h-screen items-center justify-around bg-[#070707]"
      >
        {/* Text stack */}
        <div className="relative overflow-hidden" style={boxStyle}>
          <div className="panel-text absolute inset-0 grid place-items-center bg-[#070707] text-4xl font-black uppercase opacity-0 translate-y-full text-blue-500">
            Blue
          </div>
          <div className="panel-text absolute inset-0 grid place-items-center bg-[#070707] text-4xl font-black uppercase opacity-0 translate-y-full text-red-500">
            Red
          </div>
          <div className="panel-text absolute inset-0 grid place-items-center bg-[#070707] text-4xl font-black uppercase opacity-0 translate-y-full text-orange-400">
            Orange
          </div>
          <div className="panel-text absolute inset-0 grid place-items-center bg-[#070707] text-4xl font-black uppercase opacity-0 translate-y-full text-purple-500">
            Purple
          </div>
        </div>

        {/* Color panels stack (blue, red, orange, purple) */}
        <div className="relative overflow-hidden" style={boxStyle}>
          <div className="panel absolute inset-0 bg-blue-700" />
          <div className="panel absolute inset-0 bg-red-600" />
          <div className="panel absolute inset-0 bg-orange-600" />
          <div className="panel panel-purple absolute inset-0 bg-purple-700" />
        </div>
      </section>

      {/* Section 3: Blue outro */}
      <section className="h-screen bg-[#00026d]" />
    </div>
  );
};

export default PanelScrollDemo;
