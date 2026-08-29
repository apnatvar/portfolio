import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about-ap",
    "/hire-ap",
    "/ideals",
    "/blogs",
    "/links",
    "/tools",
    "/portable-context",
    "/tools/developer-focus-planner",
    "/tools/decision-confidence-calculator",
  ].map((path) => ({ url: `${SITE_URL}${path}` }));
}
