import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hire AP | Next.js Technical SEO Engineer",
  description:
    "Hire AP, an India-based Next.js Technical SEO Engineer specialising in TypeScript, programmatic SEO, AI-assisted automation, and web performance for remote teams worldwide.",
  keywords: [
    "hire AP",
    "hire Apnatva",
    "hire Next.js developer",
    "Next.js Technical SEO Engineer",
    "programmatic SEO consultant",
    "TypeScript SEO implementation",
    "AI-assisted SEO automation",
    "Next.js web performance",
    "remote technical SEO India",
  ],
  alternates: {
    canonical: "/hire-ap",
  },
  openGraph: {
    title: "Hire AP | Next.js Technical SEO Engineer",
    description:
      "Technical and programmatic SEO for Next.js and TypeScript sites, with AI-assisted automation and web performance work. Based in India, working remotely worldwide.",
    url: "/hire-ap",
    images: [
      {
        url: "/4.webp",
        width: 1200,
        height: 630,
        alt: "Hire AP for Next.js technical SEO engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire AP | Next.js Technical SEO Engineer",
    description:
      "Next.js technical SEO, programmatic SEO, automation, and web performance for remote teams worldwide.",
    images: ["/4.webp"],
  },
};

export default function HireAPLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
