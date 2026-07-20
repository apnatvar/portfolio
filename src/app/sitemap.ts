import { getBlogPosts, SITE_URL } from "@/lib/blogs";
import type { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const now = new Date();
  const getLastModified = (value: string) => {
    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? now : date;
  };
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about-ap`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/hire-ap`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ideals`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/links`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/developer-focus-planner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tools/decision-confidence-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://samples.apnatva.dev",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blogs/${post.slug}`,
      lastModified: post.publishedAt ? getLastModified(post.publishedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
