// components/InstagramEmbed.tsx
"use client";

import { useEffect, useRef } from "react";

type InstagramEmbedProps = {
  permalink: string; // e.g. "https://www.instagram.com/p/CwxwGzDIYee/"
  /**
   * Optional: defaults to "14". Only override if Instagram updates their embed version.
   */
  version?: string;
  /**
   * Optional inline styles for the outer <blockquote>.
   */
  style?: React.CSSProperties;
  className?: string;
};

export default function InstagramEmbed({
  permalink,
  version = "14",
  style,
  className,
}: InstagramEmbedProps) {
  const ref = useRef<HTMLQuoteElement | null>(null);

  useEffect(() => {
    // Ensure script exists (only once)
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    const process = () => {
      // @ts-expect-error - window.instgrm is injected by Instagram's script
      if (typeof window !== "undefined" && window.instgrm?.Embeds?.process) {
        // Re-process in case this component was added after script load
        // @ts-expect-error - types not present
        window.instgrm.Embeds.process();
      }
    };

    if (existing) {
      process();
      return;
    }

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = process;
    s.onerror = () => {
      // No throw—just fail silently; you can log if needed
      // console.warn("Failed to load Instagram embed.js");
    };
    document.body.appendChild(s);

    // No cleanup needed; script should live for page lifetime
  }, [permalink, version]);

  // Minimal skeleton—Instagram replaces this with the live embed
  return (
    <blockquote
      ref={ref}
      className={["instagram-media", className].filter(Boolean).join(" ")}
      data-instgrm-permalink={`${permalink}?utm_source=ig_embed&utm_campaign=loading`}
      data-instgrm-version={version}
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: 1,
        maxWidth: 358,
        minWidth: 326,
        padding: 0,
        width: "calc(100% - 2px)",
        ...style,
      }}
    >
      <a
        href={`${permalink}?utm_source=ig_embed&utm_campaign=loading`}
        target="_blank"
        rel="noreferrer"
        style={{
          background: "#FFFFFF",
          display: "block",
          padding: 16,
          textDecoration: "none",
        }}
      >
        View this post on Instagram
      </a>
    </blockquote>
  );
}
