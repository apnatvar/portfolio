"use client";

import * as React from "react";

export default function Header() {
  // Mock data (replace with PayloadCMS JSON later)
  const title = "Apnatva";
  const subtitle = "Freelancer • Student • Software Developer";

  return (
    <header className="mb-6 text-center w-full mx-auto p-4">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm md:text-base text-muted-foreground">
        {subtitle}
      </p>
    </header>
  );
}
