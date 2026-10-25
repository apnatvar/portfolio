import { portfolioContent } from "@/content/portfolio-content";
import { primaryServicePages } from "@/content/service-pages";
import { guides } from "@/content/writing";
import { SITE_URL } from "@/lib/site";
export function machineOverview() {
 return `# AP / Apnatva Singh Rawat — Front-end Developer, Designer & Technical SEO

> India-based front-end developer and designer working with React, Next.js, and TypeScript. Technical SEO, accessibility, and web performance are part of the implementation. Available for remote projects worldwide.

## Working practice
- [Front-end design and development](${SITE_URL}/front-end): responsive interfaces, component architecture, accessible interaction, rendering, and performance.
- [Technical SEO](${SITE_URL}/seo): crawlability, metadata, canonicals, structured data, internal linking, and programmatic page quality.

## Services
${primaryServicePages.map(s => `- [${s.shortTitle}](${SITE_URL}/services/${s.slug}): ${s.description}`).join("\n")}

## Identity, work and contact
- [About AP](${SITE_URL}/about-ap)
- [Engineering work](${SITE_URL}/work): ${portfolioContent.projects.map(p => p.title).join(", ")}. Project history does not establish measured SEO outcomes.
- [Discuss a project](${SITE_URL}/hire-ap): share the site URL, stack, symptoms, evidence and requirements. Pricing depends on scope.
- Email: rawat@apnatva.dev
- [Official profiles](${SITE_URL}/links)

## Public tools
- [HTML Metadata Checker](${SITE_URL}/tools/metadata-checker): local inspection of pasted HTML; no remote crawl, indexing determination or schema eligibility validation.
- [Developer Focus Planner](${SITE_URL}/tools/developer-focus-planner): local scheduling utility.
- [Decision Confidence Calculator](${SITE_URL}/tools/decision-confidence-calculator): local decision-planning utility.
- [All tools](${SITE_URL}/tools)

## Technical guides
${guides.map(g => `- [${g.title}](${SITE_URL}/writing/${g.slug}): ${g.description}`).join("\n")}

## Other resources
- [Reading notes](${SITE_URL}/ideals): personal reading notes, separate from technical guides.
- [Portable Context](${SITE_URL}/portable-context): a working prototype of user-controlled context sharing.

Public workflow library: https://github.com/apnatvar/web-development-and-online-marketing-skills — reusable web-development, Next.js optimization, and technical SEO skills and documentation. llms.txt is an optional discovery convention and does not guarantee rankings or AI citations.
`;
}
