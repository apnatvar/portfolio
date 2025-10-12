"use client";

import { useEffect, useRef } from "react";
import { motion, animate, useMotionValue, useSpring } from "motion/react";

export default function InfiniteDualMarquee() {
  // Refs
  const track1Ref = useRef<HTMLDivElement | null>(null);
  const track2Ref = useRef<HTMLDivElement | null>(null);
  const content1Ref = useRef<HTMLDivElement | null>(null);
  const content2Ref = useRef<HTMLDivElement | null>(null);
  // Control marquee speed (pixels per second)
  const SPEED_PX_S = 40;

  // Skew (reacts to scroll velocity)
  const posRawSkew = useMotionValue(0);
  const negRawSkew = useMotionValue(0);
  const posSkew = useSpring(posRawSkew, { stiffness: 10, damping: 12 });
  const negSkew = useSpring(negRawSkew, { stiffness: 10, damping: 12 });

  // Measure + start infinite animations
  useEffect(() => {
    const t1 = track1Ref.current;
    const t2 = track2Ref.current;
    const c1 = content1Ref.current;
    const c2 = content2Ref.current;
    if (!t1 || !t2 || !c1 || !c2) return;

    // Each track has duplicated content side-by-side to enable seamless loop.
    const halfWidth = c1.offsetWidth;

    // Duration = distance / speed
    const dur = halfWidth / SPEED_PX_S;

    // Animate: Track 1 goes L → R (positive x), Track 2 goes R → L (negative x)
    // We animate one "half width" per cycle to seamlessly wrap.
    const a1 = animate(
      t1,
      {
        transform: [`translateX(-${halfWidth}px)`, `translateX(0px)`],
      },
      { duration: dur, ease: "linear", repeat: Infinity }
    );

    const a2 = animate(
      t2,
      { transform: [`translateX(0px)`, `translateX(-${halfWidth}px)`] },
      { duration: dur, ease: "linear", repeat: Infinity }
    );

    // Cleanup
    return () => {
      a1?.cancel();
      a2?.cancel();
    };
  }, []);

  // Scroll velocity → skewX (subtle, clamped)
  useEffect(() => {
    let rafId = 0;
    let prevY = window.scrollY;
    let prevT = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.max(16, now - prevT); // ms
      const dy = window.scrollY - prevY; // px
      const vy = (dy / dt) * 1000; // px/s

      // Map velocity to skew degrees, clamp to [-8, 8]
      const targetSkew = Math.max(-25, Math.min(25, vy * 0.2));
      posRawSkew.set(targetSkew);
      negRawSkew.set(-targetSkew);

      prevY = window.scrollY;
      prevT = now;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [posRawSkew, negRawSkew]);

  return (
    <div className="w-full overflow-x-hidden overflow-y-visible bg-transparent select-none pointer-events-none mb-30">
      {/* Track A: Left → Right */}
      <motion.div
        style={{
          skewY: negSkew,
          willChange: "transform",
        }}
      >
        <div
          ref={track1Ref}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
          }}
        >
          {/* Duplicate content A */}
          <div className="flex flex-nowrap">
            <MarqueeChunk />
          </div>
          <div ref={content1Ref} className="flex flex-nowrap">
            <MarqueeChunk />
          </div>
        </div>
      </motion.div>

      {/* Gap between lines */}
      <div style={{ height: 34 }} />

      {/* Track B: Right → Left */}
      <motion.div
        style={{
          skewY: posSkew,
          willChange: "transform",
        }}
      >
        <div
          ref={track2Ref}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
          }}
        >
          {/* Duplicate content B */}
          <div ref={content2Ref} className="flex flex-nowrap">
            <MarqueeChunk />
          </div>
          <div className="flex flex-nowrap">
            <MarqueeChunk />
          </div>
        </div>
      </motion.div>
      <p className="text-xs text-muted-foreground text-center">
        Scroll to Merge
      </p>
    </div>
  );
}

function MarqueeChunk() {
  const baseStyle = {
    padding: "0.5rem 1.25rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    fontSize: "clamp(0.9rem, 2.2vw, 1.25rem)",
  };
  return (
    <>
      <p style={baseStyle}>FRONTEND</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>FULLSTACK</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>UI/UX</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>MARKETING</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>AUTOMATIONS</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>WEB-APPS</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>BACKEND</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>DESIGNER</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>AI</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>DEVELOPER</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
      <p style={baseStyle}>ENGINEER</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
    </>
  );
}
