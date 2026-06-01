import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hire AP | Next.js Web Developer",
  description:
    "Hire AP for design-first Next.js websites, e-commerce builds, dashboards, CMS-backed interfaces, and technical web experiences.",
  keywords: [
    "hire AP",
    "hire Apnatva",
    "hire Next.js developer",
    "freelance web developer",
    "contract frontend developer",
    "e-commerce developer",
    "dashboard developer",
    "CMS website developer",
  ],
  alternates: {
    canonical: "/hire-ap",
  },
  openGraph: {
    title: "Hire AP | Next.js Web Developer",
    description:
      "Work with AP on design-first websites, stores, dashboards, CMS-backed pages, and technical frontend projects.",
    url: "/hire-ap",
    images: [
      {
        url: "/4.webp",
        width: 1200,
        height: 630,
        alt: "Hire AP for design-first Next.js web development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire AP | Next.js Web Developer",
    description:
      "Hire AP for design-first Next.js, frontend, e-commerce, dashboard, and CMS-backed web work.",
    images: ["/4.webp"],
  },
  other: {
    image: "https://apnatva.dev/4.webp",
    thumbnail: "https://apnatva.dev/4.webp",
    "image:alt": "Hire AP for design-first Next.js web development",
    "document:type": "service-page",
    "document:language": "en-IN",
    "document:primary-topic":
      "Hiring AP for freelance or contract Next.js and frontend web development.",
    "page:type": "hire-services-page",
    "page:audience":
      "potential clients, collaborators, agencies, recruiters, crawlers, and language models evaluating AP for web development work",
    "page:summary":
      "Hiring page for AP describing web development service areas and ways to engage for design-first Next.js projects.",
    "llm:summary":
      "This page is the primary hiring entry point for AP, focused on freelance and contract web development services.",
  },
};

export default function HireAPLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
