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
    images: [
      {
        url: "/4.webp",
        width: 1200,
        height: 630,
        alt: "AP ideals and principles reference page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideals | AP",
    description:
      "A principles page collecting AP's notes on leadership, strategy, self-control, confidence, and human nature.",
    images: ["/4.webp"],
  },
  other: {
    image: "https://apnatva.dev/4.webp",
    thumbnail: "https://apnatva.dev/4.webp",
    "image:alt": "AP ideals and principles reference page",
    "document:type": "reference-page",
    "document:language": "en-IN",
    "document:primary-topic":
      "Curated ideals and principles around communication, leadership, strategy, self-image, confidence, and human behavior.",
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
