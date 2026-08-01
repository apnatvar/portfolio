export type PortfolioLink = {
  label: string;
  href: string;
};

export type ProjectContent = {
  title: string;
  links: PortfolioLink[];
  points: string[];
};

export type PortfolioContent = {
  hero: {
    greeting: string;
    shortName: string;
    name: string;
    roles: Array<{ title: string; description: string }>;
  };
  profile: {
    paragraphs: string[];
    education: string[];
  };
  projects: ProjectContent[];
  capabilities: {
    services: string[];
    technologies: string[];
  };
  experience: Array<{ year: string; text: string }>;
  educationDetails: Array<{
    institution: string;
    points: string[];
  }>;
  profileLinks: PortfolioLink[];
  contact: {
    email: string;
    phone: string;
    booking: string;
    links: PortfolioLink[];
  };
  imagery: {
    resume: { src: string; alt: string };
    swiss: { src: string; alt: string };
  };
};

/**
 * SYNCHRONIZATION NOTE:
 * This is an intentionally duplicated, normalized copy of content currently
 * embedded in the creative homepage/about components. The creative renderer
 * remains the source of truth so its markup and behavior do not change.
 */
export const portfolioContent: PortfolioContent = {
  hero: {
    greeting: "Hello",
    shortName: "I am A P",
    name: "Apnatva Singh Rawat",
    roles: [
      { title: "Full-stack Developer", description: "Production web applications from interface to infrastructure." },
      { title: "Software Developer", description: "API-driven systems, automation, and reliable delivery." },
      { title: "Designer", description: "Responsive experiences shaped around clear user journeys." },
    ],
  },
  profile: {
    paragraphs: [
      "I am Apnatva, though most people call me AP. I am a full-stack web and software developer with over three years of experience building and maintaining production applications, internal tools, automation workflows, and API-driven systems.",
      "My work spans responsive front-end delivery, backend and API integration, SEO, deployment support, data pipelines, reporting automation, and production maintenance.",
      "I work with business teams and stakeholders to turn requirements into maintainable features, resolve bugs, and validate releases through regression testing.",
      "Outside work, I run, train, read philosophy and psychology, travel, take photographs, and write.",
    ],
    education: ["BEng Computer Engineering, First Class Honours, TCD", "BA Arts, TCD"],
  },
  projects: [
    {
      title: "Open Workout",
      links: [{ label: "Code", href: "https://github.com/apnatvar/open-workout" }],
      points: [
        "Open-source workout builder for gym trainers, personal trainers, and other fitness professionals.",
        "Makes it simple to design structured workouts with AI and share to clients.",
        "Includes an MCP server that makes its workout-building capabilities available to compatible AI clients.",
        "Built as a lightweight, self-hostable foundation that can be adapted to different coaching workflows.",
      ],
    },
    {
      title: "ELZA International",
      links: [
        { label: "Website", href: "https://elza.co.in/" },
        { label: "Case Study", href: "https://github.com/apnatvar/apnatvar/blob/main/Elza%20Case%20Study.pdf" },
      ],
      points: [
        "Performance, SEO, Asset Optimisation, and Responsive Design were treated as core requirements.",
        "Design for a minimal content-first aesthetic with limitations around animations and design.",
        "Varied section-level colour compositions were made from a limited brand palette to avoid a templated feel.",
      ],
    },
    {
      title: "Autonomous Urban Mobility",
      links: [
        { label: "Code", href: "https://github.com/apnatvar/adaptive-traffic-control/" },
        { label: "Thesis", href: "https://github.com/apnatvar/adaptive-traffic-control/blob/main/Thesis.pdf" },
      ],
      points: [
        "Final year thesis on adaptive traffic optimization using satellite intelligence over hardware-heavy conventional methods.",
        "Proof-of-concept for a licensable B2B optimization engine for smart mobility and navigation ecosystems.",
        "Highly scalable, designed to reduce deployment cost, maintenance overhead, and operational complexity for autonomous systems.",
      ],
    },
    {
      title: "Excel Automation",
      links: [{ label: "Code", href: "https://github.com/apnatvar/deliveredProjects/blob/main/ConsolidateExcel.py" }],
      points: [
        "Developed a Python-based Windows standalone application to automate consolidation of financial data with over $10M in yearly transactions.",
        "Reduced processing time to consolidate Excel tabular data from 5 days to ~17 minutes, generating 11 reports to save auditors hours in analysing and providing valuable insights as quickly as possible.",
      ],
    },
    {
      title: "Chattybot",
      links: [{ label: "Code", href: "https://github.com/apnatvar/chattybot" }],
      points: [
        "Self-hostable, multi-tenant website chatbot with an embeddable customer-facing widget.",
        "Uses tenant-specific pages and product catalogues to answer questions and surface useful product or contact links.",
        "Includes encrypted per-site credentials, resilient fallback responses, and a production-focused Docker deployment workflow.",
      ],
    },
  ],
  capabilities: {
    services: ["web applications", "application maintenance", "API integration", "SEO", "automations", "data reporting", "deployment", "production support", "responsive UI"],
    technologies: ["next.js", "react", "typescript", "node.js", "rest apis", "python", "postgresql", "docker", "kubernetes", "azure", "tailwind", "gsap"],
  },
  experience: [
    { year: "Sep 2024 - Present", text: "Full-stack Web Developer at Brownsmith Dynamics, building and maintaining production websites, catalogues, internal tools, API integrations, automations, and deployment workflows." },
    { year: "Jun 2025 - May 2026", text: "Content & Branding at Motilal Oswal Financial Services, analysing engagement and user journeys and producing stakeholder reporting and UX-led content strategy." },
    { year: "May 2023 - Jul 2024", text: "Junior Cloud Engineer at Avaya, maintaining a multi-region Kubernetes application composed of 16 Dockerised Go and Java microservices on Azure." },
    { year: "May 2022 - Aug 2022", text: "Software Developer at Mount Technics Consultancy, creating an automated Python and Selenium data pipeline that reduced manual intervention by 95%." },
  ],
  educationDetails: [
    {
      institution: "Trinity College Dublin",
      points: [
        "Bachelor of Engineering in Computer Engineering, First Class Honours (1:1), October 2023.",
        "Wrote a thesis on the use of satellite based traffic information to automate congestion prevention without relying heavily on hardware.",
        "Worked with Formula Trinity in developing an autonomous RC-sized car for racing.",
        "Graduated with an honourary Bachelor of Arts.",
        "Focussed on developing Neural Network based autonomous machines for automated, ethical decision making.",
        "Certifications include FreeCodeCamp Machine Learning, Automate the Boring Stuff, and Google Data Analytics.",
      ],
    },
    {
      institution: "St. George's College",
      points: [
        "Graduated with a 92% overall score in the Indian School Certificate Examinations.",
        "Exceptional grades in Mathematics and Computer Science.",
      ],
    },
  ],
  profileLinks: [
    { label: "Portfolio", href: "/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/apnatva-singh-rawat/" },
    { label: "GitHub", href: "https://github.com/apnatvar" },
    { label: "Resume", href: "https://github.com/apnatvar/apnatvar/blob/main/ApnatvaCV.pdf" },
    { label: "Medium", href: "https://medium.com/@nattupi" },
    { label: "Instagram", href: "https://instagram.com/nattupi/" },
  ],
  contact: {
    email: "rawat@apnatva.dev",
    phone: "+918791414856",
    booking: "https://cal.eu/apnatva/15min",
    links: [
      { label: "GitHub", href: "https://github.com/apnatvar" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/apnatva-singh-rawat/" },
      { label: "Medium", href: "https://medium.com/@nattupi" },
      { label: "Resume", href: "https://github.com/apnatvar/apnatvar/blob/main/ApnatvaCV.pdf" },
    ],
  },
  imagery: {
    resume: {
      src: "/6.webp",
      alt: "AP seated beside a gallery wall",
    },
    swiss: {
      src: "/3.webp",
      alt: "AP in a neon-lit city street at night",
    },
  },
};
