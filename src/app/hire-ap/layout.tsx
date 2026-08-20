import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hire AP: Next.js & Full-Stack Development",
  description:
    "Work with AP, a self-directed full-stack developer who brings top-down systems thinking to software, automation, and business-facing technical work.",
  keywords: [
    "hire AP",
    "hire Apnatva",
    "hire Next.js developer",
    "freelance web developer",
    "contract frontend developer",
    "e-commerce developer",
    "dashboard developer",
    "CMS website developer",
    "autonomous full stack developer",
    "developer for founders",
  ],
  alternates: {
    canonical: "/hire-ap",
  },
  openGraph: {
    title: "Hire AP | Next.js Web Developer",
    description:
      "Work with a self-directed developer who can own delivery, organize complex systems, and collaborate closely with founders and executive teams.",
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
      "Top-down systems thinking, autonomous delivery, and full-stack execution for founders, teams, and growing businesses.",
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
