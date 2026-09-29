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
    greeting: "Hey, I am",
    shortName: "I am A P",
    name: "Apnatva Singh Rawat",
    roles: [
      {
        title: "Full-stack Developer",
        description:
          "From the first brief to a working product.",
      },
      {
        title: "Software Developer",
        description: "APIs, automation, and the parts that keep things running.",
      },
      {
        title: "Designer",
        description:
          "Interfaces that make complex tasks easier to use.",
      },
    ],
  },
  profile: {
    paragraphs: [
      "I'm Apnatva, though most people call me AP. I build websites and software, starting with the problem behind the brief and working through to the details people use every day.",
      "I've worked on web apps, internal tools, automation, and cloud systems for small businesses and enterprise teams. SEO, content strategy, and performance analysis are part of that work too; a site needs to be found and understood as well as built.",
      "I'm used to remote, asynchronous work. I plan in writing, keep people updated, and take responsibility for getting things shipped.",
      "Outside work, I read and write about technology, philosophy, and psychology. I enjoy working closely with founders and teams where I can understand the whole product, not just my part of it.",
    ],
    education: [
      "BEng Computer Engineering, First Class Honours, TCD",
      "BA Arts, TCD",
    ],
  },
  projects: [
    {
      title: "Forme",
      links: [
        { label: "Code", href: "https://github.com/apnatvar/open-workout" },
      ],
      points: [
        "Forme is an open-source workout planner and tracker that keeps your data in your browser.",
        "Build sessions from an exercise library, log workouts, and share or print a plan. No account required.",
        "JSON import and export make it easy to move or back up your data.",
        "A companion plugin and local MCP server let compatible AI clients generate workouts from the exercise dataset.",
      ],
    },
    {
      title: "Brownsmith Dynamics",
      links: [{ label: "Website", href: "https://brownsmithdynamics.com" }],
      points: [
        "Built the website frontend, with pages for services, products, guides, and articles.",
        "Organized navigation and internal links so visitors can find related content and search engines can crawl it.",
      ],
    },
    {
      title: "ELZA International",
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
      title: "Autonomous Urban Mobility",
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
      links: [
        {
          label: "Code",
          href: "https://github.com/apnatvar/deliveredProjects/blob/main/ConsolidateExcel.py",
        },
      ],
      points: [
        "Built a standalone Windows app in Python to consolidate financial data covering more than $10M in annual transactions.",
        "Cut a five-day reporting job to about 17 minutes and generated 11 reports for auditors.",
      ],
    },
    {
      title: "Chattybot",
      links: [{ label: "Code", href: "https://github.com/apnatvar/chattybot" }],
      points: [
        "Built a self-hostable, multi-tenant chatbot with a widget websites can embed.",
        "It uses each site's pages and product catalogue to answer questions and point people to relevant links.",
        "Added encrypted site credentials, fallback replies, and a Docker deployment setup.",
      ],
    },
  ],
  capabilities: {
    services: [
      "web applications",
      "application maintenance",
      "API integration",
      "SEO",
      "automations",
      "data reporting",
      "deployment",
      "production support",
      "responsive UI",
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
      text: "Full-stack Web Developer at Brownsmith Dynamics, building and maintaining production websites, catalogues, internal tools, API integrations, automations, and deployment workflows.",
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
      text: "Software Developer at Mount Technics Consultancy, creating an automated Python and Selenium data pipeline that reduced manual intervention by 95%.",
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
    {
      label: "Resume",
      href: "https://github.com/apnatvar/apnatvar/blob/main/ApnatvaCV.pdf",
    },
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
      {
        label: "Resume",
        href: "https://github.com/apnatvar/apnatvar/blob/main/ApnatvaCV.pdf",
      },
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
