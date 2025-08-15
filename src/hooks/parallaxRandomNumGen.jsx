"use client"
import { useState, useEffect } from "react";

export function getParallaxSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const pickFromArray = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)];
    };

    const generatedSettings = {
      flicker: getRandomInt(10, 20),
      acrossSpeed: getRandomInt(50, 100),
      parallaxSpeed: pickFromArray([-10, -20, -30, -40, -50])
    };

    setSettings(generatedSettings);
  }, []);

  return settings;
}
