"use client";

import * as React from "react";
import { Badge } from "../ui/badge";

export default function TagRow() {
  // Mock data
  const tags: string[] = [
    "Next.js",
    "TypeScript",
    "Tailwind",
    "shadcn/ui",
    "PayloadCMS (incoming)",
    "Python",
    "SQL",
    "UI/UX",
  ];

  return (
    <section
      aria-label="Tags"
      className="flex flex-wrap justify-center gap-2 w-full mx-auto p-4"
    >
      {tags.map((t) => (
        <Badge key={t} variant="outline" className="rounded-full">
          {t}
        </Badge>
      ))}
    </section>
  );
}
