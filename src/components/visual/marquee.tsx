"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useSpring,
  frame,
  cancelFrame,
} from "motion/react";

export default function InfiniteDualMarquee() {
  const track1Ref = useRef<HTMLDivElement | null>(null);
  const track2Ref = useRef<HTMLDivElement | null>(null);
  const content1Ref = useRef<HTMLDivElement | null>(null);
  const content2Ref = useRef<HTMLDivElement | null>(null);
  const SPEED_PX_S = 40;
  const posRawSkew = useMotionValue(0);
  const negRawSkew = useMotionValue(0);
  const posSkew = useSpring(posRawSkew, { stiffness: 3, damping: 0.9 });
  const negSkew = useSpring(negRawSkew, { stiffness: 3, damping: 0.9 });

  useEffect(() => {
    const t1 = track1Ref.current;
    const t2 = track2Ref.current;
    const c1 = content1Ref.current;
    const c2 = content2Ref.current;
    if (!t1 || !t2 || !c1 || !c2) return;

    const halfWidth = c1.offsetWidth;
    const dur = halfWidth / SPEED_PX_S;

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

    return () => {
      a1?.cancel();
      a2?.cancel();
    };
  }, []);

  useEffect(() => {
    let prevY = window.scrollY;
    let prevT = performance.now();

    const update = () => {
      const now = performance.now();
      const dt = Math.max(20, now - prevT); // ms
      const dy = window.scrollY - prevY; // px
      const vy = (dy / dt) * 60; // px/s (normalized to ~fps)

      const targetSkew = Math.max(-9, Math.min(9, vy * 0.3));
      posRawSkew.set(targetSkew);
      negRawSkew.set(-targetSkew);

      prevY = window.scrollY;
      prevT = now;
    };

    frame.update(update, true);
    return () => {
      cancelFrame(update);
    };
  }, [posRawSkew, negRawSkew]);

  return (
    <>
      <div className="w-full overflow-x-hidden overflow-y-visible bg-transparent select-none pointer-events-none mb-30 py-10">
        <motion.div
          style={{
            skewY: negSkew,
            willChange: "transform",
          }}
          className="overflow-y-visible"
        >
          <div ref={track1Ref} className="flex flex-nowrap">
            <div className="flex flex-nowrap">
              <MarqueeChunk />
            </div>
            <div ref={content1Ref} className="flex flex-nowrap">
              <MarqueeChunk />
            </div>
          </div>
        </motion.div>

        <div className="min-h-[10dvh]">
          <p className="text-xs text-amber-400 text-center mt-[5dvh] skew-y-3">
            Designer. Developer. Creator. Different forms, same intent.
          </p>
        </div>

        <motion.div
          style={{
            skewY: posSkew,
            willChange: "transform",
          }}
          className="overflow-y-visible"
        >
          <div ref={track2Ref} className="flex flex-nowrap">
            <div
              ref={content2Ref}
              className="flex flex-nowrap flex-row-reverse"
            >
              <MarqueeChunk />
            </div>
            <div className="flex flex-nowrap flex-row-reverse">
              <MarqueeChunk />
            </div>
          </div>
        </motion.div>
      </div>
    </>
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
      <p style={baseStyle}>WEBAPPS</p>
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
