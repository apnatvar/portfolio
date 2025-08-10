"use client";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

export default function ParallaxSpark({ speed = -40, moveDuration = 10 }) {
  return (
    <ParallaxProvider>
        <Parallax speed={speed}>
        <div className="spark" style={{ animationDuration: `${moveDuration/8}s, ${moveDuration}s;`}}></div>
        </Parallax>
    </ParallaxProvider>
  );
}
