"use client";
import { getParallaxSettings } from "@/hooks/parallaxRandomNumGen";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

export default function ParallaxSpark() {
  const animationSettings = getParallaxSettings()
  if (!animationSettings) return <></>;
  return (
    <ParallaxProvider>
        <Parallax speed={animationSettings.parallaxSpeed}>
          <div className="spark" 
          style={{ animationDuration: `${animationSettings.flicker}s, ${animationSettings.acrossSpeed}s`}}
          >
          </div>
        </Parallax>
    </ParallaxProvider>
  );
}
