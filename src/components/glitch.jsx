'use client';

import React, { useEffect, useState } from 'react';
import { useGlitch } from 'react-powerglitch';

const WORDS = [
  'coding adventures',
  'technical skills',
  'experience',
  'previous projects',
  'mild chaos',
  'code obsession',
  'professional side',
  'fun side',
  'experiments',
];

export default function GlitchTitle({ interval = 3000 }) {
  const [index, setIndex] = useState(0);

  const glitch = useGlitch({
    playMode: 'manual',
    glitchTimeSpan: {
      start: 0,
      end: 1,
    },
  });

  useEffect(() => {
    const cycle = setInterval(() => {
      // Trigger glitch
      glitch.startGlitch();

      // Wait briefly before switching the word
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
      }, 300); // Adjust to match glitch duration
    }, interval);

    return () => clearInterval(cycle);
  }, [glitch, interval]);

  return (
    <span ref={glitch.ref} >{WORDS[index]}.</span>
  );
}
