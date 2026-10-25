import { AboutRenderer } from "@/portfolio/about/about-renderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AP | Next.js Technical SEO Engineer",
  description:
    "Meet AP, an India-based Next.js Technical SEO Engineer specialising in TypeScript, programmatic SEO, AI-assisted automation, and web performance for remote teams worldwide.",
  keywords: [
    "about AP",
    "about Apnatva",
    "AP developer profile",
    "Next.js technical SEO engineer",
    "programmatic SEO developer",
    "TypeScript SEO",
    "AI-assisted automation",
    "web performance engineer",
    "web developer education",
    "remote SEO engineer India",
  ],
  alternates: {
    canonical: "/about-ap",
  },
  openGraph: {
    title: "About AP | Next.js Technical SEO Engineer",
    description:
      "An India-based engineer specialising in technical and programmatic SEO for Next.js and TypeScript websites, working remotely worldwide.",
    url: "/about-ap",
    images: [
      {
        url: "/4.webp",
        width: 1200,
        height: 630,
        alt: "About AP developer profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About AP | Next.js Technical SEO Engineer",
    description:
      "Next.js Technical SEO Engineer specialising in programmatic SEO, AI-assisted automation, and web performance. Based in India, working remotely worldwide.",
    images: ["/4.webp"],
  },
};

export default function Page() {
  return <AboutRenderer />;
}
