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
        title: "Designer, developer, writer",
        description:
          "I make thoughtful things for the web, from the words and shape of an idea to the details that make it work.",
      },
      {
        title: "Web developer",
        description: "I build useful websites and small tools, and care about how they feel to use.",
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
      "I’m Apnatva Singh Rawat. Most people call me AP. I design and build for the web, and write when an idea stays with me long enough.",
      "I like work that lets me move between the shape of a thing and the details underneath it: a page, a product, a bit of software that makes an ordinary task easier.",
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
        "Built the site across its service, product, guide, and article pages.",
        "Gave the catalogue and editorial content a clear way to sit together.",
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
        "Built a responsive site around a restrained palette and the company’s content.",
        "Kept the pages light and quick to load.",
        "Used shifts in colour to give long pages a little rhythm.",
      ],
    },
    {
      title: "Forme",
      category: "Product Engineering",
      links: [
        { label: "Code", href: "https://github.com/apnatvar/open-workout" },
      ],
      points: [
        "An open-source workout planner that keeps its data in your browser.",
        "Put together a session, log it, then share or print the plan. No account needed.",
        "Import and export your data as JSON.",
        "There’s also a companion plugin and local MCP server for AI clients that can build sessions from the exercise library.",
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
        "My final-year thesis: a prototype for adaptive traffic control using satellite traffic data.",
        "The idea was to reduce reliance on roadside hardware and make deployment easier to maintain.",
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
        "A small Windows app in Python that consolidates financial data into reports for auditors.",
      ],
    },
    {
      title: "Chattybot",
      category: "Automation",
      links: [{ label: "Code", href: "https://github.com/apnatvar/chattybot" }],
      points: [
        "A chatbot that can be hosted on your own infrastructure and added to a website as a widget.",
        "It uses a site’s pages and product catalogue to answer questions and point visitors to useful links.",
        "Includes encrypted site credentials, fallback replies, and a Docker setup.",
      ],
    },
  ],
  capabilities: {
    services: [
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
