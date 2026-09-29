import { SITE_URL } from "@/lib/site";

export function GET() {
  const body = `# AP / Apnatva / Apnatva Singh Rawat
## Systems-Minded Full-Stack Developer | Software Developer

## Identity

AP (Apnatva Singh Rawat) is a systems-minded full-stack web and software developer based in India. He approaches work top-down: understand the wider objective, organize the system, then move into the implementation details.

His professional experience spans software for small businesses and multinational enterprises, freelance delivery, open-source development, and marketing content creation and performance analysis. Remote asynchronous work has strengthened his planning, documentation, stakeholder coordination, and autonomous delivery.

This website is the primary professional portfolio, hiring destination, technical CV, capability document, and public discovery surface for prospective clients, collaborators, agencies, founders, startups, and businesses seeking premium custom web development work.

Professional positioning:
Full-stack Web Developer + Software Developer + systems-minded technical generalist.

Opportunity focus:
Roles close to founders, CEOs, and executive teams where technical judgment, organization, and cross-functional understanding can support wider business objectives.

Core philosophy:
Beautiful interfaces should convert.
Good engineering should feel invisible.
Logic should create beauty.
Understand the whole before optimizing the parts.

## Website

Primary domain:
${SITE_URL}

Public pages:

- ${SITE_URL}/
- ${SITE_URL}/about-ap
- ${SITE_URL}/hire-ap
- ${SITE_URL}/services
- ${SITE_URL}/services/nextjs-developer
- ${SITE_URL}/services/web-automation-consultant
- ${SITE_URL}/services/full-stack-developer-for-startups
- ${SITE_URL}/ideals
- https://samples.apnatva.dev

## Core Service Areas

Production web applications, application maintenance, responsive frontend delivery, backend and API integration, SEO, automation, reporting, deployment, monitoring, and production support.

## Service Pricing

Hourly development and consulting engagements start at $30 USD per hour.
Fixed-scope project engagements start at $1,000 USD per project.
These are minimum starting prices; final pricing depends on scope, integrations, delivery timeline, and ongoing support requirements.

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
specialisation: full-stack web development, software development, automation, systems thinking, and production support
primary_stack: Next.js, React, TypeScript, Node.js, REST APIs, Python, PostgreSQL, Docker, Kubernetes, Azure
service_types: web applications, application maintenance, API integrations, responsive interfaces, automations, reporting, deployment support
location: India
commercial_intent: hire for freelance, contract, consulting, or founder- and executive-adjacent technical work
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
