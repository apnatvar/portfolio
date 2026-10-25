export type PracticeLink = {
  label: string;
  href: string;
  note?: string;
};

export type PracticeChapter = {
  number: string;
  margin: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type PracticePageContent = {
  path: "/front-end" | "/seo";
  number: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  introduction: string;
  chapters: PracticeChapter[];
  sequence: Array<{ label: string; note: string }>;
  deliverables: string[];
  projectNotes: Array<{ title: string; description: string; href: string; linkLabel: string }>;
  resources: PracticeLink[];
  crossLink: { title: string; description: string; href: string; label: string };
  closing: string;
};

export const frontEndPractice: PracticePageContent = {
  path: "/front-end",
  number: "01",
  eyebrow: "Interface design · Front-end development",
  title: "Next.js development, with a designer’s eye.",
  subtitle: "React and Next.js front-end development for content-rich websites, catalogues, and useful tools.",
  introduction:
    "I work from the shape of the idea to the details of the interface: what a page says, how its parts relate, and what happens when someone uses it on a small screen, with a keyboard, or on a slower connection.",
  chapters: [
    {
      number: "01",
      margin: "The question before the component",
      title: "Begin with the person and the task.",
      paragraphs: [
        "Before choosing a component or animation, I want to understand who the page is for, what they need to do, and what the product already knows about them. That gives the interface a useful order instead of a collection of attractive parts.",
        "For a new page or a redesign, this can mean mapping the important routes, content, states, and decisions first. For an existing product, it may mean tracing one confusing or fragile journey before proposing a wider rewrite.",
      ],
      points: ["Audience and primary task", "Page structure and content hierarchy", "Responsive states and interaction details"],
    },
    {
      number: "02",
      margin: "A system with room to breathe",
      title: "Design and code belong in the same conversation.",
      paragraphs: [
        "I build interfaces with React, Next.js, TypeScript, and Tailwind CSS. Components are useful when they express a real pattern: a repeated page structure, a form field with consistent behavior, or a navigation element people need to recognize.",
        "A design system should make the next decision easier. I shape typography, spacing, color, and component boundaries around the product rather than imposing a large library where a smaller set of clear rules will do.",
      ],
      points: ["React and Next.js application interfaces", "Typed component and content boundaries", "Tailwind CSS foundations and reusable patterns"],
    },
    {
      number: "03",
      margin: "The page in use",
      title: "Responsive is a behavior, not a breakpoint.",
      paragraphs: [
        "I check how content, navigation, and controls behave across viewport sizes. That includes long labels, missing or delayed data, validation messages, touch targets, keyboard focus, and the way a layout recovers when text is enlarged.",
        "Accessibility is part of implementation: semantic structure, keyboard operation, visible focus, useful names, and reduced-motion behavior. I can review and improve these details, while keeping any formal conformance assessment within an agreed audit scope.",
      ],
      points: ["Mobile and desktop layout behavior", "Keyboard and assistive-technology semantics", "Motion that respects the user’s preference"],
    },
    {
      number: "04",
      margin: "Performance without theater",
      title: "Make the useful thing arrive cleanly.",
      paragraphs: [
        "Rendering choices, image and font delivery, client-side JavaScript, and third-party scripts all affect what a visitor experiences. I look at the route and journey in question, then make focused changes that preserve the interface and its content.",
        "When performance is part of the brief, I separate controlled lab diagnostics from field measurements. A lab run can help locate a bottleneck; it cannot stand in for every device, connection, or real-user outcome.",
      ],
      points: ["Server and client rendering boundaries", "Image, font, CSS, and JavaScript delivery", "Comparable checks for the routes that matter"],
    },
  ],
  sequence: [
    { label: "Listen", note: "Agree on the audience, task, constraints, and evidence." },
    { label: "Shape", note: "Map the interface, content, states, and component boundaries." },
    { label: "Build", note: "Implement a responsive, typed interface in reviewable slices." },
    { label: "Check", note: "Review key journeys, accessibility details, and delivery behavior." },
    { label: "Hand over", note: "Document decisions, open questions, and the next useful step." },
  ],
  deliverables: [
    "A scoped route or feature plan tied to a user task",
    "Interface structure, responsive behavior, and interaction states",
    "React / Next.js implementation with agreed component boundaries",
    "API or CMS integration where it belongs in the project scope",
    "Review notes for keyboard use, reduced motion, and important viewport sizes",
    "A maintainable handover with decisions and follow-up items",
  ],
  projectNotes: [
    {
      title: "Brownsmith Dynamics",
      description: "A production website bringing service, product, guide, and article pages into one navigable catalogue.",
      href: "https://brownsmithdynamics.com",
      linkLabel: "Visit the website",
    },
    {
      title: "ELZA International",
      description: "A responsive, content-first site with a restrained palette, considered page rhythm, and attention to asset weight.",
      href: "https://elza.co.in/",
      linkLabel: "Visit the website",
    },
    {
      title: "Forme",
      description: "An open-source workout planner that keeps data in the browser and supports building, logging, sharing, and printing sessions.",
      href: "https://github.com/apnatvar/open-workout",
      linkLabel: "Explore the code",
    },
  ],
  resources: [
    { label: "Next.js developer practice", href: "/services/nextjs-developer", note: "Existing project scope and delivery details" },
    { label: "Performance workflow", href: "/writing/nextjs-performance-workflow", note: "A measurement-first implementation guide" },
    { label: "Selected work", href: "/#work", note: "More projects and working examples" },
  ],
  crossLink: {
    title: "The interface is only one part of being found.",
    description: "Explore the search layer too: rendering, metadata, crawl paths, and the checks that keep a growing site legible.",
    href: "/seo",
    label: "Read the SEO practice",
  },
  closing: "A focused page, a product interface, or an existing Next.js codebase can all be a sensible place to begin. The scope follows the problem.",
};

export const seoPractice: PracticePageContent = {
  path: "/seo",
  number: "02",
  eyebrow: "Technical SEO · Next.js · Programmatic systems",
  title: "Technical SEO for Next.js.",
  subtitle: "The search side of the practice: rendering, crawlability, and page systems for content-rich Next.js websites.",
  introduction:
    "I work across crawlability, rendering, metadata, URL structure, and performance, with a particular focus on Next.js and TypeScript sites. The aim is to make implementation behavior inspectable and maintainable—not to promise a search result no developer controls.",
  chapters: [
    {
      number: "01",
      margin: "What a crawler can reach",
      title: "Start with routes and responses.",
      paragraphs: [
        "A route inventory gives each important URL a job: its intended audience and purpose, canonical destination, indexation policy, and relationship to nearby pages. That makes redirect chains, duplicates, accidental noindex rules, and missing sitemap entries easier to reason about.",
        "I review actual HTTP responses and rendered output for representative routes, including dynamic and missing-data cases. In Next.js, that can mean tracing a URL through layouts, route data, server and client boundaries, caching, and deployment behavior.",
      ],
      points: ["Route and template inventory", "Status, redirect, robots, and canonical behavior", "Crawlable internal paths and sitemap membership"],
    },
    {
      number: "02",
      margin: "Describe the page accurately",
      title: "Metadata and structured data should follow the content.",
      paragraphs: [
        "Titles, descriptions, canonical URLs, social metadata, and robots directives should describe the visible page and its intended state. For App Router sites, I inspect Metadata API and generateMetadata output across route types rather than assuming the source definition is the final response.",
        "JSON-LD is useful when it accurately describes current, visible content. I check that it parses, matches its page, and follows the intended schema properties. Valid JSON or schema markup can improve machine understanding; neither guarantees a rich result or ranking.",
      ],
      points: ["Next.js Metadata API and dynamic metadata", "Canonical and robots rules", "Visible-content-aligned JSON-LD"],
    },
    {
      number: "03",
      margin: "Pages made from data",
      title: "Programmatic pages need a reason to exist.",
      paragraphs: [
        "A dataset row does not automatically deserve an indexable URL. I map page types to distinct user needs, inspect data coverage and provenance, and identify records or combinations that should be withheld, combined, or handled another way.",
        "Then the route and template can have typed inputs, explicit missing-data behavior, duplicate checks, metadata and canonical rules, internal links, and sitemap controls. Editorial review stays in the loop: automated gates help catch predictable errors but do not decide whether a page is useful.",
      ],
      points: ["Intent-to-page mapping", "Typed data and source provenance", "Quality gates for duplicates, missing values, and releases"],
    },
    {
      number: "04",
      margin: "Performance and observation",
      title: "Measure the symptom, then keep watching.",
      paragraphs: [
        "Slow or unstable pages can involve server work, rendering boundaries, hydration, image and font discovery, JavaScript, CSS, or third-party scripts. I use a representative route and user journey to connect the visible symptom to a plausible implementation cause.",
        "Lab traces help diagnose; field Core Web Vitals describe real-user experience when enough data exists. Search Console and analytics can inform post-release observation, with the limitations of delayed, sampled, or grouped reports made explicit.",
      ],
      points: ["LCP, INP, and CLS diagnosis", "Lab measurements kept separate from field data", "Release notes and follow-up checks"],
    },
  ],
  sequence: [
    { label: "Inventory", note: "Choose routes, symptoms, and the evidence already available." },
    { label: "Trace", note: "Follow the route through output, data, metadata, and deployment." },
    { label: "Prioritise", note: "Separate confirmed defects, hypotheses, and dependencies." },
    { label: "Implement", note: "Make the agreed code or configuration changes." },
    { label: "Verify", note: "Recheck representative output and define post-release monitoring." },
  ],
  deliverables: [
    "A route-level diagnosis with examples and supporting evidence",
    "A prioritised implementation plan, or agreed code changes",
    "Next.js metadata, rendering, canonical, sitemap, and schema checks as scoped",
    "Programmatic page data contracts and release gates where needed",
    "A validation record for representative routes and edge cases",
    "A handover that separates implementation status from search outcomes",
  ],
  projectNotes: [
    {
      title: "Brownsmith Dynamics",
      description: "Service, product, guide, and article pages built as a navigable catalogue with related content paths.",
      href: "https://brownsmithdynamics.com",
      linkLabel: "Visit the website",
    },
    {
      title: "ELZA International",
      description: "A responsive site shaped around the company’s content, with asset and page-structure considerations.",
      href: "https://elza.co.in/",
      linkLabel: "Visit the website",
    },
    {
      title: "Forme",
      description: "A small product with a clear data model, browser-local storage, and useful ways to share and move information.",
      href: "https://github.com/apnatvar/open-workout",
      linkLabel: "Explore the code",
    },
  ],
  resources: [
    { label: "Next.js technical SEO checklist", href: "/writing/nextjs-technical-seo-checklist", note: "Routes, metadata, crawl paths, and release review" },
    { label: "Programmatic SEO quality gates", href: "/writing/programmatic-seo-quality-gates", note: "Page value, data coverage, and controlled publishing" },
    { label: "Next.js performance workflow", href: "/writing/nextjs-performance-workflow", note: "Controlled diagnostics and field-data limits" },
    { label: "HTML Metadata Checker", href: "/tools/metadata-checker", note: "Inspect pasted markup locally in the browser" },
  ],
  crossLink: {
    title: "Search systems still lead to a human interface.",
    description: "Explore how I design and build the pages, components, and interactions that visitors actually use.",
    href: "/front-end",
    label: "Read the front-end practice",
  },
  closing: "An audit can identify and prioritise technical issues. Implementation changes the site. Search engines decide what they crawl, index, and rank; those outcomes are not guaranteed by an audit or a code change.",
};
