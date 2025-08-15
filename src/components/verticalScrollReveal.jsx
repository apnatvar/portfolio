"use client";

import { motion, useScroll, useTransform, stagger, useSpring } from "motion/react";
import { useRef, Children } from "react";

export default function ScrollReveal({
  children,
  duration = 1,
  staggerDelay = 1
}) {
  const containerRef = useRef(null);

  const totalChildren = Children.count(children);

  const animatedChildren = Children.map(children, (child, index) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
    });

    const rawOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.4]);
    const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });

    const rawScale = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const scale = useSpring(rawScale, { stiffness: 100, damping: 20 });

    return (
      <motion.section
        ref={ref}
        style={{ opacity, scale }}
        transition={{
          duration,
          delay: stagger(staggerDelay, { startDelay: 0 })(index, totalChildren)
        }}
      >
        {child}
      </motion.section>
    );
  });

  return <div ref={containerRef} className="big-margin">{animatedChildren}</div>;
}
