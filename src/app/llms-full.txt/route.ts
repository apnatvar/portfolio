import { formatBlogDate, getBlogPosts, SITE_URL } from "@/lib/blogs";

export const revalidate = 3600;

export async function GET() {
  const posts = await getBlogPosts();
  const blogLines = posts.length
    ? posts
        .map(
          (post) => `### ${post.title}

URL:
${SITE_URL}/blogs/${post.slug}

Original Medium URL:
${post.mediumUrl}

Published:
${formatBlogDate(post.publishedAt)}

Summary:
${post.excerpt || "Full article mirrored from the Medium RSS feed."}`,
        )
        .join("\n\n---\n\n")
    : "Blog entries are generated from the Medium RSS feed when available.";

  const body = `# AP / Apnatva / Apnatva Singh Rawat
## Design-First Full Stack Developer | Creative Technologist | Writer

## Identity

AP (Apnatva Singh Rawat) is a freelance and contract design-first full stack developer based in India.

This website is the primary professional portfolio, hiring destination, technical CV, writing archive, capability document, and public discovery surface for prospective clients, collaborators, agencies, founders, startups, and businesses seeking premium custom web development work.

Professional positioning:
Designer + Developer + Writer.

Core philosophy:
Beautiful interfaces should convert.
Good engineering should feel invisible.
Logic should create beauty.

## Website

Primary domain:
${SITE_URL}

Public pages:

- ${SITE_URL}/
- ${SITE_URL}/about-ap
- ${SITE_URL}/hire-ap
- ${SITE_URL}/blogs

## Blog Archive

The blog archive is sourced from the Medium RSS feed for @nattupi and rendered on-site for readers. Detail pages also link to the canonical Medium source.

${blogLines}

## Core Service Areas

Web design and development, frontend engineering, full stack development, CMS systems, e-commerce, automation, dashboards, SEO, and technical content systems.

## Technical Stack

Next.js, React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Shadcn UI, GSAP, Node.js, REST APIs, PayloadCMS, Python, pandas, SQL, Docker, deployment workflows, image optimisation, sitemap architecture, robots directives, Open Graph, and Twitter metadata.

## Contact

Email:
rawat@apnatva.dev

WhatsApp:
https://wa.me/918791414856

GitHub:
https://github.com/apnatvar

## Machine Summary

entity_name: AP
aliases: Apnatva, Apnatva Singh Rawat
entity_type: individual professional
business_model: freelance / contract / consulting
specialisation: design-first full stack web development and technical writing
primary_stack: Next.js, React, TypeScript, Tailwind CSS, Shadcn UI, GSAP, Node.js, PayloadCMS, Python
service_types: websites, e-commerce, dashboards, CMS systems, automations, blog/content systems
location: India
commercial_intent: hire
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
