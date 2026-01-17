"use client";

import Image from "next/image";
import Link from "next/link";
import TrueFocus from "../TrueFocus";

export default function ScrollStarWords() {
  const words =
    "FRONTEND BACKEND FULLSTACK UI/UX MARKETING SEO AI AUTOMATION WEBAPPS DESIGNER DEVELOPER ENGINEER ARCHITECT";
  return (
    <div
      className="relative w-full min-h-[50dvh] overflow-hidden flex flex-wrap gap-8 py-10 px-10 justify-center"
      aria-label="Scrolling skills words"
    >
      <Link
        href="https://www.flickr.com/photos/203680033@N06/54889832945/in/dateposted-public/"
        className="absolute top-0 left-0 inset-0 z-0"
      >
        <Image
          quality={100}
          src="https://live.staticflickr.com/65535/54889832945_75ef4d42f4_w.jpg"
          fill
          alt="test"
          className="absolute top-0 left-0 h-full aspect-4/3 object-cover opacity-10 object-[100%_50%] md:object-[100%_40%] bg-gradient-to-b via-transparent to-0%"
        />
      </Link>
      <div className="hidden md:block">
        <TrueFocus
          sentence={words}
          manualMode={true}
          blurAmount={5}
          borderColor="green"
        />
      </div>
      <div className="block md:hidden">
        <TrueFocus
          sentence={words}
          manualMode={false}
          blurAmount={3}
          borderColor="green"
          animationDuration={1}
          pauseBetweenAnimations={0}
        />
      </div>
    </div>
  );
}
