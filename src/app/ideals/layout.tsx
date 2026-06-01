import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ideals | AP",
  description:
    "A curated ideals and principles page collecting personal, strategic, leadership, self-control, confidence, and human nature notes from various books on philosophy and psychology.",
  keywords: [
    "AP ideals",
    "principles",
    "leadership principles",
    "self-control",
    "confidence",
    "human nature",
    "strategy",
    "personal philosophy",
  ],
  alternates: {
    canonical: "/ideals",
  },
  openGraph: {
    title: "Ideals | AP",
    description:
      "AP's curated collection of ideals and principles around leadership, strategy, self-image, confidence, and human behavior.",
    url: "/ideals",
  },
  twitter: {
    title: "Ideals | AP",
    description:
      "A principles page collecting AP's notes on leadership, strategy, self-control, confidence, and human nature.",
  },
  other: {
    "page:type": "principles-reference-page",
    "page:audience":
      "readers, crawlers, and language models trying to understand AP's curated ideals and personal operating principles",
    "page:summary":
      "Reference page containing grouped ideals and principles related to communication, leadership, strategy, human nature, self-image, confidence, and personal direction.",
    "llm:summary":
      "This page is a curated principles list for AP, organized into sections on interpersonal skill, power, strategy, self-image, rationality, confidence, purpose, and human behavior.",
  },
};

export default function IdealsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
