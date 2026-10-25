export type ServicePageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  promise: string;
  idealFor: string[];
  outcomes: Array<{ title: string; description: string }>;
  process: Array<{ title: string; description: string }>;
  capabilities: string[];
  resources?: Array<{ title: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const SERVICE_PRICING = {
  currency: "USD",
  hourlyMinimum: 30,
  projectMinimum: 1000,
} as const;

export const SERVICE_PRICING_SUMMARY =
  "Hourly engagements start at $30 USD per hour. Fixed-scope projects start at $1,000 USD.";

export const servicePages: ServicePageContent[] = [
  {
    slug: "technical-seo",
    eyebrow: "Technical SEO",
    shortTitle: "Technical SEO",
    title: "Technical SEO for sites that need a clearer path to discovery",
    description: "Technical SEO diagnosis and implementation for crawl, indexing, rendering, URL, and metadata problems. For Next.js 15 App Router sites, the review follows route output through the Metadata API, server rendering, dynamic segments, data caching, and deployment behavior.",
    promise: "I connect search symptoms to the route, template, response, or deployment behavior behind them, then prioritize fixes that your team can verify and maintain.",
    idealFor: ["Important pages are missing from search or indexed incorrectly", "A migration, redesign, or framework change has created SEO uncertainty", "A Next.js site needs reliable rendering, metadata, canonical, or sitemap behavior", "Your team needs a prioritized audit with implementation guidance"],
    outcomes: [
      { title: "A route-level technical diagnosis", description: "Review representative URLs, rendered HTML, HTTP status and redirect behavior, crawl/index signals, internal paths, and templates. Findings include the affected route and evidence, with confirmed defects separated from hypotheses." },
      { title: "Next.js-aware implementation", description: "Review App Router Metadata API and generateMetadata output, Server Component rendering, dynamic routes, canonical and robots rules, structured data, sitemap/robots generation, cache and revalidation behavior, and deployment responses. Implement agreed changes or provide code-level guidance." },
      { title: "Release checks and handover", description: "Validate affected route types in the built output, including status codes, metadata, links, and sitemap membership. Document remaining dependencies and post-release checks; implementation checks do not establish indexing or ranking." },
    ],
    process: [
      { title: "Reproduce the symptom", description: "Select affected routes and review the current release, raw and rendered HTML, HTTP responses, crawl signals, and available Search Console evidence." },
      { title: "Trace it through the app", description: "Follow the route to its layout, Metadata API or generateMetadata logic, server/client rendering boundary, data source, cache rules, and deployed response." },
      { title: "Correct and verify", description: "Implement the agreed fix or produce an engineer-ready change plan. Recheck representative route types and document limits, ownership, and monitoring needs." },
    ],
    capabilities: ["Next.js 15 App Router", "Metadata API and generateMetadata", "Server-rendered route output and RSC boundaries", "Dynamic route and template review", "Caching and revalidation behavior", "HTTP status, redirect, and deployment checks", "Canonical and robots directives", "Sitemaps and structured data", "Crawlability and internal linking", "Search Console review when access is available"],
    resources: [
      { title: "HTML Metadata Checker", href: "/tools/metadata-checker" },
      { title: "Next.js technical SEO checklist", href: "/writing/nextjs-technical-seo-checklist" },
    ],
    faqs: [
      { question: "Do you work with Next.js SEO issues?", answer: "Yes. I can review rendering and metadata behavior across route types, including canonicals, robots directives, sitemaps, structured data, and deployment-specific output." },
      { question: "Will an audit guarantee higher rankings?", answer: "No. The work addresses technical barriers and improves clarity for crawlers. Rankings also depend on competition, content, authority, and search systems outside anyone's control." },
      { question: "Can you implement the recommended fixes?", answer: "Yes, when access and scope allow. Otherwise, the deliverable can be a prioritized implementation brief for your development team." },
    ],
  },
  {
    slug: "programmatic-seo",
    eyebrow: "Programmatic SEO",
    shortTitle: "Programmatic SEO",
    title: "Programmatic SEO built around useful pages and sound data",
    description: "Plan and build useful page sets from structured data. Work can include TypeScript schemas, source provenance, duplicate detection, reusable templates, content-quality gates, and a controlled release pipeline.",
    promise: "I test whether a page set answers a distinct need, trace each output to usable source data, then build the template and release controls around that standard.",
    idealFor: ["A repeatable search need maps to a defensible set of page types", "You have useful proprietary or curated data that can support distinct pages", "A growing location, category, comparison, or integration library needs better governance", "Existing templated pages are thin, duplicative, or difficult to maintain"],
    outcomes: [
      { title: "A validated page model", description: "A mapping from distinct user intent to page fields and source records, including data provenance, coverage gaps, duplication rules, and combinations that should not ship." },
      { title: "A typed template system", description: "TypeScript data contracts and reusable route templates with clear URL, canonical, metadata, and internal-link behavior. Missing or stale source values have explicit fallbacks rather than invented filler." },
      { title: "A release and maintenance pipeline", description: "Validation gates for record quality, duplication, page eligibility, sitemap inclusion, updates, and retirement, with a reviewable process before expanding the page set." },
    ],
    process: [
      { title: "Validate intent and source data", description: "Map a proposed page to a real user task, inspect the source and its provenance, and identify records that are incomplete, duplicate, or too similar to justify separate URLs." },
      { title: "Build the typed page system", description: "Define TypeScript schemas, transformations, templates, route and canonical rules, internal links, and release checks before scaling generation." },
      { title: "Release in controlled cohorts", description: "Publish a representative set, verify rendered output and sitemap membership, review quality and available search evidence, then expand only where the checks remain useful." },
    ],
    capabilities: ["Intent-to-page mapping", "TypeScript data schemas", "Source provenance", "Duplicate and near-duplicate detection", "Next.js route and template generation", "CMS/API data pipelines", "Content quality gates", "Canonical and internal-link rules", "Sitemap release controls", "Incremental deployment and retirement"],
    resources: [
      { title: "Programmatic SEO quality gates", href: "/writing/programmatic-seo-quality-gates" },
    ],
    faqs: [
      { question: "Can every data combination become a page?", answer: "Usually not. Pages should be published only when data coverage and user value are strong enough to create a distinct, useful answer." },
      { question: "How do you prevent thin or duplicate pages?", answer: "Define required data and uniqueness checks before release, then keep incomplete, redundant, or low-value records out of published routes and the sitemap. Automated checks support editorial review; they do not replace it." },
      { question: "Can this be built in Next.js?", answer: "Yes. I can design route generation, metadata, canonical behavior, sitemaps, and build or runtime data fetching around the chosen publishing model." },
    ],
  },
  {
    slug: "seo-automation",
    eyebrow: "SEO automation",
    shortTitle: "AI-assisted SEO automation",
    title: "AI-assisted SEO workflows with evidence and human review",
    description: "Design and implementation for repeatable SEO workflows that combine deterministic checks with carefully scoped AI assistance: metadata drafting, content QA, evidence-linked issue classification, and internal-link suggestions for review.",
    promise: "I build bounded workflows that use AI to reduce repetitive SEO handling while keeping source evidence, validation rules, and a human decision point visible.",
    idealFor: ["Teams draft or review metadata across many pages and need consistent validation", "Content QA involves repeatable checks for missing facts, structure, or page requirements", "Technical issues need triage with source URLs, snippets, and rule-based evidence attached", "Internal-link ideas should be generated from an approved page set and reviewed before publishing", "A team wants reusable agent instructions or QA checks that fit its existing workflow"],
    outcomes: [
      { title: "A scoped assisted workflow", description: "A defined task such as metadata draft generation, content QA, issue classification, or internal-link suggestions, with permitted inputs, expected outputs, and explicit exclusions." },
      { title: "Evidence and quality controls", description: "Outputs retain source URLs and supporting evidence where available, pass deterministic format and policy checks, and mark uncertainty instead of filling gaps with invented facts." },
      { title: "Reusable review and handover", description: "Human approval points, escalation rules, repeatable QA, and documented agent instructions or skills so a person remains responsible for publication and prioritization." },
    ],
    process: [
      { title: "Choose a bounded task", description: "Map the human workflow, data sources, privacy constraints, common errors, and decision that should remain with a reviewer." },
      { title: "Prototype with controls", description: "Combine deterministic rules with an AI step only where it helps. Attach source evidence, validate output shape, test edge cases, and define a safe fallback." },
      { title: "Review and operationalize", description: "Compare results with human-reviewed examples, document approval and correction paths, then package repeatable checks or agent instructions for the team's workflow." },
    ],
    capabilities: ["AI-assisted metadata drafting and validation", "Content QA with source checks", "Evidence-linked technical issue classification", "Human-reviewed internal-link suggestions", "Reusable agent instructions and skills", "Deterministic SEO checks", "Search/CMS data workflows", "Python and Node.js automation", "Logging, exceptions, and handover"],
    resources: [
      { title: "HTML Metadata Checker", href: "/tools/metadata-checker" },
      { title: "Next.js technical SEO checklist", href: "/writing/nextjs-technical-seo-checklist" },
    ],
    faqs: [
      { question: "What does AI do in an SEO workflow?", answer: "It can draft metadata from approved page facts, classify issues against a supplied taxonomy, check content against defined requirements, or suggest links from an approved URL set. Deterministic checks and human review remain part of the workflow." },
      { question: "Will AI publish changes or guarantee rankings?", answer: "No. The default deliverable is a reviewed suggestion or QA result, not autonomous publication. Automation cannot guarantee crawling, rankings, traffic, or business outcomes." },
      { question: "Can you create reusable agent skills?", answer: "I can document and package repeatable instructions and checks for an agreed agent workflow, with scope, allowed sources, validation rules, and a human approval step." },
    ],
  },
  {
    slug: "core-web-vitals",
    eyebrow: "Core Web Vitals",
    shortTitle: "Core Web Vitals",
    title: "Core Web Vitals improvements grounded in real page behavior",
    description: "Diagnose loading, interaction, and visual stability across important routes using field and lab evidence where available. Trace bottlenecks through fonts, images, CSS, JavaScript bundles, third-party scripts, hydration, and server work.",
    promise: "I connect each performance symptom to the browser and application work behind it, distinguish user-facing metrics from diagnostic timings, and prioritize changes that fit the product.",
    idealFor: ["Key templates have poor or inconsistent field performance", "A redesign or feature release has slowed pages or introduced layout shifts", "Teams need help separating real-user signals from one-off lab results", "Performance work needs to fit alongside SEO, accessibility, and product constraints"],
    outcomes: [
      { title: "A route-level performance baseline", description: "Review available field Core Web Vitals separately from reproducible lab traces, grouped by representative template and device. Use TTFB and FCP as diagnostic timings where useful; they are not Core Web Vitals." },
      { title: "Root-cause engineering work", description: "Trace LCP, INP, or CLS symptoms to likely causes such as server work, hydration and main-thread JavaScript, bundle and CSS cost, font/image loading, third-party scripts, or unstable layout. Implement agreed fixes or provide a prioritized engineering plan." },
      { title: "Comparable remeasurement", description: "Repeat the same lab journeys and, when enough field data exists, monitor the relevant user groups after release. Record test conditions and remaining bottlenecks; do not treat one Lighthouse score as field performance." },
    ],
    process: [
      { title: "Select the important journeys", description: "Agree on representative URLs, devices, user actions, and the field data that best reflects the experience." },
      { title: "Trace the bottlenecks", description: "Use browser traces and code inspection to separate server response, rendering/hydration, resource priority, CSS/layout, fonts/images, bundles, and third-party work." },
      { title: "Improve and recheck", description: "Make focused changes and compare under the same device, route, and lab conditions. Review field data only when it exists and has adequate coverage; document trade-offs and follow-on work." },
    ],
    capabilities: ["LCP, INP, and CLS diagnosis", "TTFB and FCP as diagnostic timings", "Next.js rendering, hydration, and caching", "Font and image loading", "JavaScript bundle and CSS cost", "Third-party script review", "Field and lab data separation", "Template-level optimization", "Comparable regression checks", "Performance handover"],
    resources: [
      { title: "Next.js performance workflow", href: "/writing/nextjs-performance-workflow" },
    ],
    faqs: [
      { question: "Can you guarantee a particular score?", answer: "No. Scores vary by device, network, traffic, and test conditions. I focus on repeatable improvements to representative user journeys and field signals." },
      { question: "Do you work on real-user data?", answer: "Yes, when available. Field data helps establish how users experience the site; lab tests help isolate causes and compare changes." },
      { question: "Is this only for Next.js?", answer: "No. Next.js is a common context, but the same diagnosis and optimization approach applies to other web stacks." },
    ],
  },
  {
    slug: "nextjs-developer",
    eyebrow: "Next.js development",
    shortTitle: "Next.js Developer",
    title: "Next.js developer for fast, maintainable web products",
    description:
      "Freelance Next.js development for teams that need a production-ready marketing site, web application, dashboard, storefront, or CMS integration.",
    promise:
      "I help turn a clear business objective into a responsive Next.js product that is straightforward to operate, extend, and hand over.",
    idealFor: [
      "A new Next.js site or application that needs end-to-end ownership",
      "An existing React or Next.js codebase that has become difficult to change",
      "A redesign where performance, accessibility, and conversion matter together",
      "A CMS, API, authentication, payment, or analytics integration",
    ],
    outcomes: [
      {
        title: "Production delivery",
        description:
          "Responsive interfaces, application logic, integrations, deployment configuration, and a documented handover—not just a visual prototype.",
      },
      {
        title: "A maintainable foundation",
        description:
          "Clear component boundaries, predictable data flow, typed interfaces, and decisions that leave room for the product to grow.",
      },
      {
        title: "Performance with purpose",
        description:
          "Thoughtful rendering, image delivery, loading behavior, metadata, and Core Web Vitals work tied to the real user journey.",
      },
    ],
    process: [
      {
        title: "Frame the outcome",
        description:
          "Define the user, the commercial goal, the important journeys, and the constraints before choosing the implementation details.",
      },
      {
        title: "Design the system",
        description:
          "Map routes, components, data sources, integrations, and deployment so the work can be delivered in coherent slices.",
      },
      {
        title: "Build and verify",
        description:
          "Implement the product, test the important paths, review responsive behavior, and prepare the codebase for ongoing ownership.",
      },
    ],
    capabilities: [
      "Next.js App Router",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "CMS integrations",
      "Authentication",
      "Analytics",
      "SEO foundations",
      "Deployment support",
    ],
    faqs: [
      {
        question: "Can you work on an existing Next.js application?",
        answer:
          "Yes. I can begin with a focused code and product audit, identify the highest-risk areas, and then improve or extend the application without requiring a ground-up rewrite.",
      },
      {
        question: "Do you handle design as well as development?",
        answer:
          "Yes. I can translate an established design into production code or shape the interface and implementation together when a separate design system does not exist.",
      },
      {
        question: "Can you deploy and maintain the finished product?",
        answer:
          "I can support deployment, monitoring, regression fixes, and ongoing improvements. The exact ownership model is agreed before work begins.",
      },
    ],
  },
  {
    slug: "web-automation-consultant",
    eyebrow: "Web automation consulting",
    shortTitle: "Web Automation Consultant",
    title: "Web automation consultant for repetitive business workflows",
    description:
      "Web automation consulting and implementation for teams that want to reduce manual browser work, spreadsheet handling, reporting, and disconnected data entry.",
    promise:
      "I map the real workflow first, then build the smallest reliable automation that saves time without hiding operational risk.",
    idealFor: [
      "Recurring browser tasks that consume hours every week",
      "Spreadsheet or reporting workflows with repeated copying and cleanup",
      "Systems that need to exchange data through APIs or controlled browser automation",
      "A fragile internal script that needs validation, logging, or maintainable ownership",
    ],
    outcomes: [
      {
        title: "A workflow map",
        description:
          "A clear view of triggers, inputs, decisions, exceptions, outputs, and the points where a person should remain in control.",
      },
      {
        title: "Reliable automation",
        description:
          "A focused implementation using APIs where possible and browser automation where necessary, with validation and useful failure messages.",
      },
      {
        title: "Operational confidence",
        description:
          "Documentation, logs, recovery steps, and handover guidance so the automation remains understandable after launch.",
      },
    ],
    process: [
      {
        title: "Observe the current work",
        description:
          "Document what actually happens, including edge cases and unofficial workarounds, before proposing an automated version.",
      },
      {
        title: "Choose the control points",
        description:
          "Decide what can run unattended, what requires review, and how failures should be surfaced and recovered.",
      },
      {
        title: "Automate in stages",
        description:
          "Deliver a testable first slice, compare it with the manual result, then expand only after the workflow proves dependable.",
      },
    ],
    capabilities: [
      "Python",
      "Node.js",
      "REST APIs",
      "Selenium",
      "Browser workflows",
      "Excel automation",
      "Data cleanup",
      "Scheduled jobs",
      "Validation rules",
      "Logging",
      "Reporting",
      "Documentation",
    ],
    faqs: [
      {
        question: "What should be automated first?",
        answer:
          "Start with a stable, frequent, rules-based task where errors and exceptions are already understood. Highly ambiguous work is usually better improved before it is automated.",
      },
      {
        question: "Do you use APIs or browser automation?",
        answer:
          "I prefer supported APIs because they are usually more stable. Browser automation is appropriate when an API is unavailable and the workflow can be operated within the relevant platform rules.",
      },
      {
        question: "Can you improve an existing automation?",
        answer:
          "Yes. I can review its failure modes, data assumptions, dependencies, logs, and deployment before recommending targeted fixes or a replacement.",
      },
    ],
  },
  {
    slug: "full-stack-developer-for-startups",
    eyebrow: "Full-stack development for startups",
    shortTitle: "Full-Stack Developer for Startups",
    title: "Full-stack developer for startups moving from idea to production",
    description:
      "Full-stack development for founders and small product teams that need practical technical ownership across interface, backend, data, integrations, and deployment.",
    promise:
      "I work close to the business objective, make trade-offs visible, and move the product forward without treating frontend, backend, and operations as separate conversations.",
    idealFor: [
      "A founder who needs a technical partner to shape and build an initial product",
      "A small team with a product backlog but limited engineering capacity",
      "An MVP that needs to become a dependable production application",
      "A live product that needs stabilization, integrations, or a clearer technical direction",
    ],
    outcomes: [
      {
        title: "A focused product scope",
        description:
          "A build plan centered on the smallest useful release, with assumptions, dependencies, and later-stage ideas kept visible but separate.",
      },
      {
        title: "End-to-end execution",
        description:
          "Interface, application logic, APIs, database work, deployment, and production support handled as one connected system.",
      },
      {
        title: "Clear technical decisions",
        description:
          "Plain-language trade-offs, written context, and a codebase another developer can understand and continue.",
      },
    ],
    process: [
      {
        title: "Clarify the bet",
        description:
          "Identify the user problem, evidence, business constraint, and success signal before expanding the feature list.",
      },
      {
        title: "Ship the smallest system",
        description:
          "Build a coherent vertical slice that proves the important journey across interface, backend, and data.",
      },
      {
        title: "Learn and strengthen",
        description:
          "Use real feedback to prioritize the next release while improving reliability, observability, and maintainability where usage demands it.",
      },
    ],
    capabilities: [
      "Product scoping",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "REST APIs",
      "PostgreSQL",
      "Authentication",
      "Third-party integrations",
      "Deployment",
      "Production support",
    ],
    faqs: [
      {
        question: "Can you help define the MVP, not only code it?",
        answer:
          "Yes. I can help turn the objective into a testable scope, surface technical dependencies, and separate what must ship now from what can wait.",
      },
      {
        question: "Can you collaborate with an existing designer or developer?",
        answer:
          "Yes. I can own a defined part of the system or work across disciplines, using written decisions and small delivery slices to keep collaboration clear.",
      },
      {
        question: "Do you provide ongoing support after launch?",
        answer:
          "Yes. Ongoing support can include monitoring, fixes, incremental features, performance work, and technical planning based on the product's needs.",
      },
    ],
  },
];

const primaryServiceSlugs = new Set([
  "technical-seo",
  "programmatic-seo",
  "seo-automation",
  "core-web-vitals",
]);

export const primaryServicePages = servicePages.filter((service) =>
  primaryServiceSlugs.has(service.slug),
);

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
