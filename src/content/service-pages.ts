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

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
