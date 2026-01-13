"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  animate,
  useMotionValue,
  useSpring,
  frame,
  cancelFrame,
} from "motion/react";
import Link from "next/link";

export default function InfiniteDualMarquee() {
  const track1Ref = useRef<HTMLDivElement | null>(null);
  const track2Ref = useRef<HTMLDivElement | null>(null);
  const content1Ref = useRef<HTMLDivElement | null>(null);
  const content2Ref = useRef<HTMLDivElement | null>(null);
  const SPEED_PX_S = 40;
  const posRawSkew = useMotionValue(0);
  const negRawSkew = useMotionValue(0);
  const posSkew = useSpring(posRawSkew, { stiffness: 60, damping: 0.95 });
  const negSkew = useSpring(negRawSkew, { stiffness: 60, damping: 0.95 });

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
      const vy = (dy / dt) * 40; // px/s (normalized to ~fps)

      const targetSkew = Math.max(-4, Math.min(4, vy * 0.2));
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
      <div className="relative w-full min-h-[50dvh] overflow-hidden bg-transparent select-none pointer-events-none mb-30 py-10 font-unbounded flex flex-col gap-6 justify-around">
        <Link href="https://www.flickr.com/photos/203680033@N06/54889832945/in/dateposted-public/">
          <Image
            quality={100}
            src="https://live.staticflickr.com/65535/54889832945_75ef4d42f4_w.jpg"
            fill
            alt="test"
            className="absolute top-0 left-0 h-full aspect-4/3 object-cover opacity-10 object-[100%_50%] md:object-[100%_40%]"
          />
        </Link>
        <motion.div
          style={{
            skewY: negSkew,
            willChange: "transform",
          }}
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
          <p className="text-xs text-amber-400 font-orbitron text-center mt-[5dvh] skew-y-3">
            Different forms, same intent.
          </p>
        </div>

        <motion.div
          style={{
            skewY: posSkew,
            willChange: "transform",
          }}
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
      <p style={baseStyle}>SEO</p>
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
      <p style={baseStyle}>ARCHITECT</p>
      <p style={baseStyle} className="text-green-600">
        •
      </p>
    </>
  );
}
