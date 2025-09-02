"use client";

import { motion, useScroll, useTransform, stagger, useSpring } from "motion/react";
import { useRef, Children } from "react";

export default function ScrollReveal({
  children,
  duration = 0.8,
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

    const rawOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.7, 1], [0, 0, 1, 1, 0]);
    const opacity = useSpring(rawOpacity, { stiffness: 10, damping: 20 });

    const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.2, 1, 1, 0.2]);
    const scale = useSpring(rawScale, { stiffness: 60, damping: 20 });

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
