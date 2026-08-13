import { AboutRenderer } from "@/portfolio/about/about-renderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AP: Background, Experience & Skills",
  description:
    "About AP: a design-first developer profile covering background, education, skills, services, and technical strengths across modern web projects.",
  keywords: [
    "about AP",
    "about Apnatva",
    "AP developer profile",
    "Next.js developer profile",
    "frontend developer skills",
    "web developer education",
    "design-first web developer",
  ],
  alternates: {
    canonical: "/about-ap",
  },
  openGraph: {
    title: "About AP | Developer Profile",
    description:
      "Learn about AP's background, education, skills, services, and design-first approach to web development.",
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
    title: "About AP | Developer Profile",
    description:
      "Developer profile for AP, covering background, education, skills, and web development services.",
    images: ["/4.webp"],
  },
};

export default function Page() {
  return <AboutRenderer />;
}
