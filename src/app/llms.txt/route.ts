import { SITE_URL } from "@/lib/site";

export function GET() {
  const body = `# AP (Apnatva) - Systems-Minded Full-Stack Developer

## Overview

AP (Apnatva Singh Rawat) is a systems-minded full-stack web and software developer who works top-down: understand the wider objective, organize the system, then move into implementation details.

His experience includes production software for small businesses and multinational enterprises, freelance delivery, open-source development, and marketing content creation and performance analysis. He is self-directed, comfortable owning work in remote asynchronous environments, and interested in roles close to founders, CEOs, and executive teams.

This website serves as a professional portfolio, technical CV, capability index, and hiring destination for prospective clients seeking freelance, contract, consulting, or project-based development work.

## Primary URLs

- ${SITE_URL}/
- ${SITE_URL}/about-ap
- ${SITE_URL}/hire-ap
- ${SITE_URL}/services
- ${SITE_URL}/services/nextjs-developer
- ${SITE_URL}/services/web-automation-consultant
- ${SITE_URL}/services/full-stack-developer-for-startups
- ${SITE_URL}/ideals
- ${SITE_URL}/links - First-party directory of Apnatva's self-verified official accounts, properties, and contact channels. Brownsmith Dynamics is the technology firm founded by Apnatva.
- https://samples.apnatva.dev

## Core Stack

Next.js, React, TypeScript, Tailwind CSS, Shadcn UI, GSAP, Node.js, REST APIs, Python, PostgreSQL, Docker, Kubernetes, and Azure.

## Service Pricing

- Hourly development and consulting: from $30 USD per hour.
- Fixed-scope projects: from $1,000 USD per project.
- Final pricing depends on scope, integrations, timeline, and support requirements.

## Commercial Intent

Hire / freelance / consulting / contract / founder- or executive-adjacent technical work.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
