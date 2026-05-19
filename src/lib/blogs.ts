import { cache } from "react";

export type BlogPost = {
  title: string;
  slug: string;
  publishedAt: string;
  mediumUrl: string;
  contentHtml: string;
  excerpt: string;
};

const FEED_URL = "https://medium.com/feed/@nattupi";
const SITE_URL = "https://apnatva.dev";
const RSS_REVALIDATE_SECONDS = 60 * 60;
const RSS_FETCH_TIMEOUT_MS = 10_000;

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function getTagValue(source: string, tagName: string) {
  const pattern = new RegExp(
    `<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`,
    "i",
  );
  const match = source.match(pattern);

  return match ? decodeXml(match[1]) : "";
}

function getMediumSlug(link: string, title: string) {
  try {
    const url = new URL(link);
    const lastSegment = url.pathname.split("/").filter(Boolean).at(-1);

    if (lastSegment) {
      return lastSegment
        .replace(/^[^a-z0-9]+/i, "")
        .replace(/[^a-z0-9-]/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
    }
  } catch {
    // Fall back to the title below when Medium sends an unexpected link.
  }

  return title
    .toLowerCase()
    .replace(/&[a-z0-9#]+;/gi, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isSafeUrl(value: string) {
  if (value.startsWith("#") || value.startsWith("/")) return true;

  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function sanitizeAttributes(tagName: string, rawAttributes: string) {
  const allowedAttributes: Record<string, string[]> = {
    a: ["href", "title"],
    img: ["src", "alt", "title", "width", "height"],
  };
  const allowed = allowedAttributes[tagName] ?? [];
  const attrs: string[] = [];
  const attrPattern = /([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

  for (const match of rawAttributes.matchAll(attrPattern)) {
    const name = match[1].toLowerCase();
    const value = match[3] ?? match[4] ?? match[5] ?? "";

    if (!allowed.includes(name)) continue;
    if ((name === "href" || name === "src") && !isSafeUrl(value)) continue;

    attrs.push(`${name}="${escapeHtml(value)}"`);
  }

  if (tagName === "a") {
    attrs.push('target="_blank"', 'rel="noopener noreferrer"');
  }

  if (tagName === "img") {
    attrs.push('loading="lazy"', 'decoding="async"');
  }

  return attrs.length ? ` ${attrs.join(" ")}` : "";
}

export function sanitizeBlogHtml(html: string) {
  const allowedTags = new Set([
    "a",
    "b",
    "blockquote",
    "br",
    "code",
    "em",
    "figcaption",
    "figure",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "strong",
    "ul",
  ]);

  return html
    .replace(/<\s*(script|style|iframe|object|embed|form|input|svg|math|video|audio)[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|form|input|svg|math|video|audio)[^>]*\/?\s*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (tag, tagName, rawAttributes) => {
      const normalizedTag = tagName.toLowerCase();

      if (!allowedTags.has(normalizedTag)) return "";
      if (tag.startsWith("</")) return `</${normalizedTag}>`;
      if (normalizedTag === "br" || normalizedTag === "hr") return `<${normalizedTag}>`;

      return `<${normalizedTag}${sanitizeAttributes(normalizedTag, rawAttributes)}>`;
    });
}

function normalizePost(itemXml: string): BlogPost | null {
  const title = getTagValue(itemXml, "title");
  const mediumUrl = getTagValue(itemXml, "link");
  const publishedAt = getTagValue(itemXml, "pubDate");
  const rawContent =
    getTagValue(itemXml, "content:encoded") ||
    getTagValue(itemXml, "description");

  if (!title || !mediumUrl) return null;

  const contentHtml = sanitizeBlogHtml(rawContent);
  const excerpt = stripHtml(contentHtml).slice(0, 180);

  return {
    title,
    mediumUrl,
    publishedAt,
    slug: getMediumSlug(mediumUrl, title),
    contentHtml,
    excerpt,
  };
}

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const response = await Promise.race([
      fetch(FEED_URL, {
        next: { revalidate: RSS_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(RSS_FETCH_TIMEOUT_MS),
      }),
      new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error("Medium RSS fetch timed out.")),
          RSS_FETCH_TIMEOUT_MS,
        );
      }),
    ]);

    if (!response.ok) return [];

    const xml = await response.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

    return items
      .map(normalizePost)
      .filter((post): post is BlogPost => Boolean(post));
  } catch {
    return [];
  }
});

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();

  return posts.find((post) => post.slug === slug) ?? null;
}

export function formatBlogDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getBlogUrl(slug: string) {
  return `${SITE_URL}/blogs/${slug}`;
}

export { FEED_URL, SITE_URL };
