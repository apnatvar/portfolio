"use client"
import { useState, useEffect } from "react";

export function getParallaxSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generatedSettings = {
      flicker: getRandomInt(8, 20),
      acrossSpeed: getRandomInt(70, 120),
      parallaxSpeed: getRandomInt(-10, -100),
    };

    setSettings(generatedSettings);
  }, []);

  return settings;
}
