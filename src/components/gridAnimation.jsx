"use client";

import { motion } from "motion/react";

export default function TiltCard({ children }) {
  return (
    <motion.div
      className="minimal-card glass-slab"
      whileHover={{
        scale: 1.05,
        transition: {
            duration: 1, // very slow
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}
