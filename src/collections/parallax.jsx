"use client";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

export default function ParallaxSpark({ speed = -10 }) {
  return (
    <ParallaxProvider>
        <Parallax speed={speed}>
        {/* <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {text}
        </span> */}
        <div className="spark"></div>
        </Parallax>
    </ParallaxProvider>
  );
}
