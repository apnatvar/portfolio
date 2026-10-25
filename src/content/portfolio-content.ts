export type PortfolioLink = {
  label: string;
  href: string;
};

export type ProjectContent = {
  title: string;
  category?: "SEO Engineering" | "Web Performance" | "Automation" | "Product Engineering" | "Research prototype" | "Open source";
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
};

/**
 * Content for the creative portfolio.
 */
export const portfolioContent: PortfolioContent = {
  hero: {
    greeting: "Hello, I’m",
    shortName: "I’m AP",
    name: "Apnatva Singh Rawat",
    roles: [
      {
        title: "Front-end developer & designer",
        description:
          "I build websites in Next.js and TypeScript, and care about the shape of the interface as much as the code behind it.",
      },
      {
        title: "Technical SEO",
        description: "I work on the structure, content, and performance that help a site make sense to people and search engines.",
      },
      {
        title: "Writer",
        description:
          "I write about the ideas I keep turning over: technology, philosophy, and psychology.",
      },
    ],
  },
  profile: {
    paragraphs: [
      "I’m Apnatva Singh Rawat. Most people call me AP. I design and build websites, with front-end development and technical SEO often meeting in the same project.",
      "I like moving between the shape of an interface and the details underneath it: how a page reads, how it loads, and whether its structure makes sense to a person or a crawler.",
      "I’m based in India. Away from a screen, I’m usually reading, writing, or following a question a little further than I meant to.",
    ],
    education: [
      "BEng Computer Engineering, First Class Honours, TCD",
      "BA Arts, TCD",
    ],
  },
  projects: [
    {
      title: "Brownsmith Dynamics",
      category: "SEO Engineering",
      links: [{ label: "Website", href: "https://brownsmithdynamics.com" }],
      points: [
        "Built the website frontend, with pages for services, products, guides, and articles.",
        "Organized navigation and internal links so visitors can find related content and search engines can crawl it.",
      ],
    },
    {
      title: "ELZA International",
      category: "Web Performance",
      links: [
        { label: "Website", href: "https://elza.co.in/" },
        {
          label: "Case Study",
          href: "https://github.com/apnatvar/apnatvar/blob/main/Elza%20Case%20Study.pdf",
        },
      ],
      points: [
        "Built a responsive, content-first site around a limited brand palette.",
        "Optimized assets and page structure with performance and SEO in mind.",
        "Used colour changes between sections to give long pages some rhythm without relying on animation.",
      ],
    },
    {
      title: "Forme",
      category: "Product Engineering",
      links: [
        { label: "Code", href: "https://github.com/apnatvar/open-workout" },
      ],
      points: [
        "Forme is an open-source Next.js and React workout planner built with TypeScript and browser-local IndexedDB storage.",
        "Build sessions from an exercise library, log workouts, and share or print a plan. No account required.",
        "Zod-validated JSON import and export make it easy to move or back up your data.",
        "A companion plugin and local MCP server let compatible AI clients generate workouts from the exercise dataset.",
      ],
    },
    {
      title: "Web & SEO Skills",
      category: "Open source",
      links: [{ label: "Repository", href: "https://github.com/apnatvar/web-development-and-online-marketing-skills" }],
      points: [
        "Reusable skills, documentation, and scripts for web-development and online-marketing workflows.",
        "Includes Next.js marketing-site builds, rendering and performance reviews, technical SEO guardrails, and website analysis.",
        "A public workflow library: a place to inspect the instructions and checks behind the implementation work.",
      ],
    },
    {
      title: "Autonomous Urban Mobility",
      category: "Research prototype",
      links: [
        {
          label: "Code",
          href: "https://github.com/apnatvar/adaptive-traffic-control/",
        },
        {
          label: "Thesis",
          href: "https://github.com/apnatvar/adaptive-traffic-control/blob/main/Thesis.pdf",
        },
      ],
      points: [
        "Final-year thesis exploring adaptive traffic control using satellite traffic data.",
        "Built a proof of concept aimed at reducing the need for roadside hardware.",
        "Focused on deployment cost and the work needed to maintain a traffic control system.",
      ],
    },
    {
      title: "Excel Automation",
      category: "Automation",
      links: [
        {
          label: "Code",
          href: "https://github.com/apnatvar/deliveredProjects/blob/main/ConsolidateExcel.py",
        },
      ],
      points: [
        "Built a standalone Windows app in Python to consolidate financial data and generate reports for auditors.",
      ],
    },
    {
      title: "Chattybot",
      category: "Automation",
      links: [{ label: "Profile notes", href: "https://github.com/apnatvar" }],
      points: [
        "Built a self-hostable, multi-tenant chatbot with a widget websites can embed.",
        "It uses each site's pages and product catalogue to answer questions and point people to relevant links.",
        "Added encrypted site credentials, fallback replies, and a Docker deployment setup.",
      ],
    },
  ],
  capabilities: {
    services: [
      "front-end development with Next.js, React, and TypeScript",
      "interface design and implementation",
      "Next.js technical SEO",
      "programmatic SEO",
      "AI-assisted workflow automation",
      "web performance",
      "structured content and metadata",
      "technical audits and implementation",
      "TypeScript product engineering",
      "API integration",
      "deployment and maintenance",
    ],
    technologies: [
      "next.js",
      "react",
      "typescript",
      "node.js",
      "rest apis",
      "python",
      "postgresql",
      "docker",
      "kubernetes",
      "azure",
      "tailwind",
      "gsap",
    ],
  },
  experience: [
    {
      year: "Sep 2024 - Present",
      text: "Web Developer at Brownsmith Dynamics, building and maintaining production websites, catalogues, internal tools, API integrations, automations, and deployment workflows.",
    },
    {
      year: "Jun 2025 - May 2026",
      text: "Content & Branding at Motilal Oswal Financial Services, analysing engagement and user journeys and producing stakeholder reporting and UX-led content strategy.",
    },
    {
      year: "May 2023 - Jul 2024",
      text: "Junior Cloud Engineer at Avaya, maintaining a multi-region Kubernetes application composed of 16 Dockerised Go and Java microservices on Azure.",
    },
    {
      year: "May 2022 - Aug 2022",
      text: "Software Developer at Mount Technics Consultancy, creating a Python and Selenium data pipeline to automate data collection.",
    },
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
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
    },
    { label: "GitHub", href: "https://github.com/apnatvar" },
    { label: "Instagram", href: "https://instagram.com/nattupi/" },
  ],
  contact: {
    email: "rawat@apnatva.dev",
    phone: "+918791414856",
    booking: "https://cal.eu/apnatva/15min",
    links: [
      { label: "GitHub", href: "https://github.com/apnatvar" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
      },
    ],
  },
};
