"use client";

import * as React from "react";

type SectionBlockProps = {
  title: string;
  subtitle1?: string;
  subtitle2?: string;
  children?: React.ReactNode;
  lead?: boolean; // uses slightly larger/leading text for About section
};

export default function SectionBlock({
  title,
  subtitle1,
  subtitle2,
  children,
  lead,
}: SectionBlockProps) {
  return (
    <section className="mx-auto w-full">
      <header className="mb-3 text-center">
        <h2 className="text-1xl md:text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <p
          className={[
            "mx-auto mt-2 text-center",
            lead
              ? "text-base md:text-lg leading-7 md:leading-8"
              : "text-sm md:text-base",
            "text-muted-foreground",
            "max-w-2xl",
          ].join(" ")}
        >
          {subtitle1}
        </p>
        <p
          className={[
            "mx-auto mt-2 text-center",
            lead
              ? "text-base md:text-lg leading-7 md:leading-8"
              : "text-sm md:text-base",
            "text-muted-foreground",
            "max-w-2xl",
          ].join(" ")}
        >
          {subtitle2}
        </p>
      </header>
      <div>{children}</div>
    </section>
  );
}
