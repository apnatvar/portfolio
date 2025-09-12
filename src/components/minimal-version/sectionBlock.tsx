"use client";

import * as React from "react";

type SectionBlockProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  lead?: boolean; // uses slightly larger/leading text for About section
};

export default function SectionBlock({
  title,
  subtitle,
  children,
  lead,
}: SectionBlockProps) {
  return (
    <section className="mx-auto w-full">
      <header className="mb-3 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <p
          className={[
            "mx-auto mt-2",
            lead
              ? "text-base md:text-lg leading-7 md:leading-8"
              : "text-sm md:text-base",
            "text-muted-foreground text-justify",
            "max-w-2xl",
          ].join(" ")}
        >
          {subtitle}
        </p>
      </header>
      <div>{children}</div>
    </section>
  );
}
