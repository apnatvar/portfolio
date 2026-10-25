import type { Metadata } from "next";

import { PracticePage } from "@/components/practice-page";
import { seoPractice } from "@/content/practice";

import "../practice.css";

export const metadata: Metadata = {
  title: { absolute: "Next.js Technical SEO | AP" },
  description: "Technical SEO for Next.js websites: crawlability, rendering, metadata, canonicals, structured data, programmatic page quality, and measurement.",
  alternates: { canonical: "/seo" },
  openGraph: { type: "website", title: "Next.js Technical SEO | AP", description: "Technical SEO for Next.js websites, grounded in implementation and evidence.", url: "/seo", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Next.js Technical SEO | AP", description: "Technical SEO for Next.js websites, grounded in implementation and evidence.", images: ["/opengraph-image"] },
};

export default function SeoPage() {
  return <PracticePage practice={seoPractice} />;
}
