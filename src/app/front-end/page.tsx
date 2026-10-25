import type { Metadata } from "next";

import { PracticePage } from "@/components/practice-page";
import { frontEndPractice } from "@/content/practice";

import "../practice.css";

export const metadata: Metadata = {
  title: { absolute: "Next.js Front-end Developer & Designer | AP" },
  description: "Design-led Next.js and React front-end development for content-rich websites and tools. Responsive interfaces, accessible interaction, and performance.",
  alternates: { canonical: "/front-end" },
  openGraph: { type: "website", title: "Next.js Front-end Developer & Designer | AP", description: "Next.js and React front-end development for content-rich websites, catalogues, and tools.", url: "/front-end", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Next.js Front-end Developer & Designer | AP", description: "Next.js and React front-end development for content-rich websites, catalogues, and tools.", images: ["/opengraph-image"] },
};

export default function FrontEndPage() {
  return <PracticePage practice={frontEndPractice} />;
}
