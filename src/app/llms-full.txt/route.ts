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
## Full-Stack Web Developer | Software Developer

## Identity

AP (Apnatva Singh Rawat) is a full-stack web and software developer based in India with over three years of experience building and maintaining production applications, internal tools, automation workflows, API-driven systems, and cloud deployments.

This website is the primary professional portfolio, hiring destination, technical CV, writing archive, capability document, and public discovery surface for prospective clients, collaborators, agencies, founders, startups, and businesses seeking premium custom web development work.

Professional positioning:
Full-stack Web Developer + Software Developer.

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
- ${SITE_URL}/ideals
- https://samples.apnatva.dev

## Blog Archive

The blog archive is sourced from the Medium RSS feed for @nattupi and rendered on-site for readers. Detail pages also link to the canonical Medium source.

${blogLines}

## Core Service Areas

Production web applications, application maintenance, responsive frontend delivery, backend and API integration, SEO, automation, reporting, deployment, monitoring, and production support.

## Technical Stack

Next.js, React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Shadcn UI, GSAP, Node.js, REST APIs, Python, pandas, SQL, PostgreSQL, Docker, Kubernetes, Azure, Nginx, Selenium, deployment workflows, monitoring, and regression testing.

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
specialisation: full-stack web development, software development, automation, and production support
primary_stack: Next.js, React, TypeScript, Node.js, REST APIs, Python, PostgreSQL, Docker, Kubernetes, Azure
service_types: web applications, application maintenance, API integrations, responsive interfaces, automations, reporting, deployment support
location: India
commercial_intent: hire
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
