import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePaths = [
    "/services",
    "/services/nextjs-developer",
    "/services/web-automation-consultant",
    "/services/full-stack-developer-for-startups",
  ];

  return [
    "",
    "/about-ap",
    "/hire-ap",
    ...servicePaths,
    "/ideals",
    "/links",
    "/tools",
    "/portable-context",
    "/tools/developer-focus-planner",
    "/tools/decision-confidence-calculator",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: servicePaths.includes(path) ? "monthly" as const : "yearly" as const,
    priority: path === "" ? 1 : servicePaths.includes(path) ? 0.9 : 0.7,
  }));
}
