"use client";

import { React, useEffect, useRef, useState } from "react";
import { animate, scroll } from "motion/react";

export default function HorizontalScrollOnVertical({ children }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [slides, setSlides] = useState(0);
  
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const items = track.children;
    const totalItems = items.length;
    setSlides(totalItems);

    const horizontalAnimation = animate(track, {
      transform: [`none`, `translateX(-${(totalItems - 1) * 100}vw)`],
    });

    scroll(horizontalAnimation, { target: container });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: `${slides * 100}%`,
        position: "relative",
      }}
      className="horizontal-scroll-container"
    >
      <div
        ref={trackRef}
        className="img-group"
        style={{
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        {children}
      </div>
    </div>
  );
}
