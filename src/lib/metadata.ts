import type { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, SITE_URL } from "@/lib/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { type: "website", title: `${title} | AP`, description, url: path, images: [{ url: DEFAULT_SOCIAL_IMAGE, width: 1200, height: 630, alt: "AP — Technical SEO, engineered for Next.js" }] },
    twitter: { card: "summary_large_image", title: `${title} | AP`, description, images: [DEFAULT_SOCIAL_IMAGE] },
  };
}

export function breadcrumbs(items: Array<{ name: string; path: string }>) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${SITE_URL}${item.path}` })) };
}
