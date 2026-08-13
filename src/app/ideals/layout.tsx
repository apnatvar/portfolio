import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ideals & Principles",
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
    title: "Ideals",
    description:
      "A principles page collecting AP's notes on leadership, strategy, self-control, confidence, and human nature.",
    images: ["/4.webp"],
  },
};

export default function IdealsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
