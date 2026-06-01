import { formatBlogDate, getBlogPosts, SITE_URL } from "@/lib/blogs";

export const revalidate = 3600;

export async function GET() {
  const posts = await getBlogPosts();
  const blogLines = posts.length
    ? posts
        .map(
          (post) =>
            `- ${SITE_URL}/blogs/${post.slug} - ${post.title} (${formatBlogDate(
              post.publishedAt,
            )})`,
        )
        .join("\n")
    : "- Blog entries are generated from the Medium RSS feed when available.";

  const body = `# AP (Apnatva) - Design-First Full Stack Web Developer

## Overview

AP (Apnatva) is a freelance and contract design-first full stack web developer focused on building high-performance modern web experiences for businesses, startups, founders, agencies, and personal brands.

This website serves as a professional portfolio, technical CV, writing archive, capability index, and hiring destination for prospective clients seeking freelance, contract, consulting, or project-based development work.

## Primary URLs

- ${SITE_URL}/
- ${SITE_URL}/about-ap
- ${SITE_URL}/hire-ap
- ${SITE_URL}/blogs
- ${SITE_URL}/ideals

## Blog URLs

${blogLines}

## Core Stack

Next.js, React, TypeScript, Tailwind CSS, Shadcn UI, GSAP, Node.js, PayloadCMS, Python.

## Commercial Intent

Hire / freelance / consulting / contract.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
