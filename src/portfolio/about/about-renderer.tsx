"use client";

import dynamic from "next/dynamic";

const CreativeAbout = dynamic(() => import("./creative-about"));

export function AboutRenderer() {
  return <CreativeAbout />;
}
