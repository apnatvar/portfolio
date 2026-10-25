import { SITE_URL } from "@/lib/site";
import { indexablePaths } from "@/lib/routes";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.map(path => ({ url: `${SITE_URL}${path === "/" ? "" : path}` }));
}
