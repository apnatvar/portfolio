import { JsonLd } from "@/components/json-ld";
import { PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";
import { PortfolioRenderer } from "@/portfolio/portfolio-renderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "AP | Freelance Full-Stack Developer in Dehradun",
  },
  description:
    "AP is a systems-minded full-stack developer in Dehradun with enterprise, freelance, open-source, content, and performance analysis experience.",
  keywords: [
    "freelance web developer Dehradun",
    "freelance web developer Uttarakhand",
    "full stack developer Dehradun",
    "full stack developer Uttarakhand",
    "remote web developer",
    "remote full stack developer",
    "Next.js developer Dehradun",
    "React developer Dehradun",
    "Node.js developer Uttarakhand",
    "freelance website developer Dehradun",
    "e-commerce developer Dehradun",
    "dashboard developer Uttarakhand",
    "technical writer developer",
    "developer who writes",
    "systems-minded developer",
    "technical generalist",
    "Apnatva",
    "AP developer",
  ],
  authors: [{ name: "AP", url: "https://apnatva.dev" }],
  creator: "AP",
  category: "freelance web development",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    title:
      "AP | Freelance Web & Full-Stack Developer in Dehradun, Uttarakhand",
    description:
      "Systems-minded full-stack developer bringing top-down thinking to software, automation, content, and business-facing technical work.",
    url: "/",
    siteName: "AP",
    images: [
      {
        url: "/4.webp",
        width: 1200,
        height: 630,
        alt: "AP freelance web and full-stack developer in Dehradun, Uttarakhand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AP | Freelance Web Developer in Dehradun, Uttarakhand",
    description:
      "Full-stack developer with enterprise, freelance, open-source, content, and analytical experience, comfortable owning remote work.",
    images: ["/4.webp"],
  },
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "AP | Freelance Full-Stack Developer in Dehradun",
  description: metadata.description,
  inLanguage: "en-IN",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
};

export default function Hero() {
  return (
    <>
      <JsonLd data={homePageJsonLd} />
      <PortfolioRenderer />
    </>
  );
}
