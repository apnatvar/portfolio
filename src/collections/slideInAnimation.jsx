"use client"
import * as motion from "motion/react-client";
import { useInView } from "motion/react";
import { React, useRef } from "react";

export default function SlideInText({ text, initialX = -50 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 }); 

    return (
        <motion.div
            ref={ref}
            initial={{ x: initialX, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}
        >
            {text}
        </motion.div>
    );
}
