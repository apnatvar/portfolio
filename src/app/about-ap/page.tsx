import { AboutRenderer } from "@/portfolio/about/about-renderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AP: Systems, Software & Strategy",
  description:
    "Meet AP, a systems-minded polymath and full-stack developer with enterprise, freelance, open-source, content, and analytical experience.",
  keywords: [
    "about AP",
    "about Apnatva",
    "AP developer profile",
    "Next.js developer profile",
    "frontend developer skills",
    "web developer education",
    "design-first web developer",
    "systems-minded developer",
    "technical generalist",
  ],
  alternates: {
    canonical: "/about-ap",
  },
  openGraph: {
    title: "About AP | Systems, Software & Strategy",
    description:
      "A top-down thinker combining full-stack development, system organization, open source, content, and performance analysis.",
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
    title: "About AP | Systems, Software & Strategy",
    description:
      "Systems-minded full-stack developer experienced across enterprise software, freelance work, open source, content, and analysis.",
    images: ["/4.webp"],
  },
};

export default function Page() {
  return <AboutRenderer />;
}
