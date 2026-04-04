export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type MetricItem = {
  label: string;
  value: string;
};

export type FactCard = {
  title: string;
  description: string;
  label: string;
  href: string;
};

export type ProcessStep = {
  stepLabel: string;
  title: string;
  bullets: string[];
};

export type SkillItem = {
  name: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  href: string;
  unavailable?: boolean;
  tools: string[];
};

export type PlanItem = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    href: string;
  };
  tags: string[];
};

export type GalleryImage = {
  src: string;
  alt: string;
  href: string;
};

export type SocialItem = {
  label: string;
  href: string;
};

export type SectionBlock =
  | {
      type: "intro";
      nameNative: string[];
      nameRomanized: string;
      pronunciation: string;
      meanings: string[];
      focusWords: string[];
      footer: string;
    }
  | {
      type: "fact-cards";
      cards: FactCard[];
    }
  | {
      type: "process";
      steps: ProcessStep[];
    }
  | {
      type: "skills";
      heading: string;
      intro: string[];
      skills: SkillItem[];
      tools: LinkItem[];
    }
  | {
      type: "projects";
      projects: ProjectItem[];
    }
  | {
      type: "plans";
      plans: PlanItem[];
    }
  | {
      type: "metrics";
      body: string;
      links: LinkItem[];
      metrics: MetricItem[];
    }
  | {
      type: "gallery";
      body: string;
      images: GalleryImage[];
    }
  | {
      type: "social";
      body: string;
      socials: SocialItem[];
      footer: string;
    };

export type PortfolioSection = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  kicker: string;
  metrics: string[];
  desktopPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate: number;
  };
  blocks: SectionBlock[];
};

function daysSince(dateString: string) {
  const start = new Date(dateString);
  const today = new Date();
  const diff = today.getTime() - start.getTime();
  return `${Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))}+`;
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: "origin",
    slug: "origin",
    title: "Origin Node",
    eyebrow: "Identity",
    summary:
      "A name, a pronunciation, and a set of disciplines that frame the portfolio as a connected system rather than a list of pages.",
    kicker: "Searching for memorable designs.",
    metrics: ["01", "Spatial entry", "Mobile-first"],
    desktopPosition: { x: 80, y: 56, width: 360, height: 270, rotate: -4 },
    blocks: [
      {
        type: "intro",
        nameNative: ["अपनत्व", "सिंह", "रावत"],
        nameRomanized: "Apnatva",
        pronunciation: "/ˈʌp.nəː.tvə/",
        meanings: [
          "1. sense of belonging",
          "2. digital designer",
          "3. oneness",
        ],
        focusWords: [
          "FRONTEND",
          "BACKEND",
          "FULLSTACK",
          "UI/UX",
          "MARKETING",
          "SEO",
          "AI",
          "AUTOMATION",
          "WEBAPPS",
          "DESIGNER",
          "DEVELOPER",
          "ENGINEER",
          "ARCHITECT",
        ],
        footer: "Searching for memorable designs.",
      },
    ],
  },
  {
    id: "foundation",
    slug: "foundation",
    title: "Foundation Grid",
    eyebrow: "Profile",
    summary:
      "Education, work, and a summary that explains the crossover between systems thinking, branding, and interaction design.",
    kicker: "Engineering roots, design-driven present.",
    metrics: ["02", "Context cards", "Career arc"],
    desktopPosition: { x: 520, y: -12, width: 410, height: 320, rotate: 3 },
    blocks: [
      {
        type: "fact-cards",
        cards: [
          {
            title: "B. Eng.",
            description: "Computer Engineering\nFirst Class Honours",
            label: "Trinity College Dublin",
            href: "https://www.tcd.ie/",
          },
          {
            title: "Current Job",
            description: "Content & Branding\nFinance Company",
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
          },
          {
            title: "Summary",
            description:
              "My journey began in college, where I designed social media creatives and publication PDFs, exploring how layout and typography could tell attract and advertise. That phase grounded my appreciation for design as communication, not decoration. My early internships and work pulled me into software development. I worked on scripting, webapps, and automation pipelines learning to build systems that scale.\n\nMy current job sits closer to branding, shaping how ideas translate visually across social platforms. Alongside this, I freelance and keep learning, connecting both sides of my craft. It's this harmony between ideas and technology that gives me an edge in bringing design to life.",
            label: "Curriculum Vitae",
            href: "https://github.com/apnatvar/apnatvar/blob/main/ApnatvaCV.pdf",
          },
          {
            title: "UI/UX Toolbox",
            description:
              "TypeScript\nNext.js\nGSAP, Motion.dev\nShadcn, Tailwind CSS",
            label: "GitHub",
            href: "https://github.com/apnatvar",
          },
        ],
      },
    ],
  },
  {
    id: "process",
    slug: "process",
    title: "Working Method",
    eyebrow: "Services",
    summary:
      "A structured build sequence from discovery through deployment, presented as a readable operating model.",
    kicker: "Plan → Design → Build → Deploy",
    metrics: ["03", "Delivery system", "7 steps"],
    desktopPosition: { x: 1008, y: 108, width: 390, height: 290, rotate: -2 },
    blocks: [
      {
        type: "process",
        steps: [
          {
            stepLabel: "Step-1",
            title: "Discovery & Requirements",
            bullets: [
              "Defining goals and aligning requirements",
              "Audience, positioning, brand voice (draft)",
              "Inspirations, sitemap draft and content inventory",
            ],
          },
          {
            stepLabel: "Step-2",
            title: "Wireframes & UX Flows",
            bullets: [
              "Low-fidelity layout structure per section and page",
              "Defining critical requirements",
              "Mobile-first reworks and accessibility pass",
            ],
          },
          {
            stepLabel: "Step-3",
            title: "Informative Reconciliation",
            bullets: [
              "Map drafts and ideas to initial requirements",
              "Content model and reusable sections",
              "Hosting Plans, data modelling and security discussions",
            ],
          },
          {
            stepLabel: "Step-4",
            title: "UI Design System",
            bullets: [
              "Typography scale, spacing, grid rules",
              "Brand Guidelines and Logo Asset building",
              "Building the final UI and defining the UX",
            ],
          },
          {
            stepLabel: "Step-5",
            title: "Build & Integrate CMS",
            bullets: [
              "Component implementation with reusable blocks",
              "CMS schema + validation + previews",
              "Performance budgets and image strategy",
            ],
          },
          {
            stepLabel: "Step-6",
            title: "QA, Performance, SEO",
            bullets: [
              "Cross-browser/device QA + edge cases",
              "Trial website deployment for client satisfaction",
              "Rework UI/UX and content as per requirements",
            ],
          },
          {
            stepLabel: "Step-7",
            title: "Deploy & Monitor",
            bullets: [
              "CI/CD, Docker VPS or Serverless deployments",
              "Cloudfare CDN caching strategy and redirects",
              "Optional Uptime + logging + analytics instrumentation",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "skills",
    slug: "skills",
    title: "From Systems to Screens",
    eyebrow: "Skills",
    summary:
      "Backend depth and current frontend focus are framed together so the section reads as capability, not a checklist.",
    kicker: "Engineering roots, design-driven present.",
    metrics: ["04", "12 skills", "Full-stack"],
    desktopPosition: { x: 224, y: 420, width: 420, height: 330, rotate: 2 },
    blocks: [
      {
        type: "skills",
        heading: "From Systems to Screens",
        intro: [
          "I have built web applications, written automation and scraping scripts, and designed ML models and pipelines. My experience with Python, Go, Java, Docker, and Kubernetes gave me a solid understanding of backend systems, scalability, and production-grade architecture.",
          "Currently, I am focussing on front-end design. I work extensively with TypeScript, Next.js, Tailwind CSS, Shadcn, GSAP, and PayloadCMS to create visually refined, interactive, and scalable web experiences. I now can design, develop, and deliver full-stack web-apps.",
        ],
        skills: [
          { name: "TypeScript" },
          { name: "Python" },
          { name: "SQL" },
          { name: "PayloadCMS" },
          { name: "Tailwind" },
          { name: "Next.js" },
          { name: "Shadcn" },
          { name: "Git" },
          { name: "Docker" },
          { name: "Kubernetes" },
          { name: "Supabase" },
          { name: "Vercel" },
        ],
        tools: [
          {
            label: "Tweakcn",
            href: "https://tweakcn.com/",
            external: true,
          },
          {
            label: "React Bits",
            href: "https://reactbits.dev/",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "projects",
    slug: "projects",
    title: "Curated Projects",
    eyebrow: "Work",
    summary:
      "A set of solo and group projects across ML, automation, analytics, blockchain, and reusable UI systems.",
    kicker: "Solo & Group Projects",
    metrics: ["05", "6 projects", "Case-study ready"],
    desktopPosition: { x: 740, y: 500, width: 450, height: 340, rotate: -3 },
    blocks: [
      {
        type: "projects",
        projects: [
          {
            title: "AI Traffic System",
            description:
              "Built as a part of my Final Year Thesis. The aim of the project was to decrease the reliance on hardware for automated traffic management. The algorithm relies on available GPS data from services like Google Maps for lane and traffic density. THe information is then processed via a Neural Net, training the Multi-Agent model using reinforcement learning techniques to minimise metrics like average wait times, and average queue length. The model was built using Python and PyTorch training the model from base. The simulation was ran on SUMO across 7 maps of varying complexity to track the success of the algorithm. Achieved a First Class Honours on this work.",
            href: "https://github.com/apnatvar/adaptive-traffic-control",
            tools: ["Python", "PyTorch", "SUMO"],
          },
          {
            title: "Cyclistic Data Analysis",
            description:
              "Technical Project completed as part of the Google Data Analytics Certificate. The project demanded collection of yearly data in CSV format. The data was (E)xtracted, (L)oaded into an MSSQL database, and (T)ransformed for consistency and correctness. The data was analysed via Python scripts and Tableau visualisations to analyse daily, weekly, and monthly trends in data drawing insights and forming recommendations. The summarised data was loaded and visualised in Excel and exported to PowerPoint for the final presentation.",
            href: "https://github.com/apnatvar/analytics/tree/main/Cyclistic",
            tools: ["Python", "SQL", "Pandas", "Tableau"],
          },
          {
            title: "Emissions Tracking Software",
            description:
              "Group project completed as part of the Computer Networking Module at Trinity College Dublin. Leveraged a Raspberry Pi on a LAN to connect multiple devices to a blockchain. Demonstrated usecase of tracking car emissions on a blockchain to for public access and strictness. Used Python multi-threading to handle concurrent collections, block hash secured with SHA-256, SQLite to store and retrieve standard emission rates for cars, and auto-update blocks after every trip.",
            href: "https://github.com/apnatvar/Computer-Networking/tree/main/Project%202",
            tools: ["Python", "SQL", "Networking"],
          },
          {
            title: "ML Data Lake",
            description:
              "Built a web scraper to scrape data in multiple Indian languages from Social Platforms like Facebook, Twitter, Google News, etc. Data was cleaned and stored in an MSSQL database to prepare to be fed into a LLM for processing and report the sentiment analysis of the public on specified topics. Used Python and Selenium to build the scraper handling data with standard REST APIs and browser scraping. Worked solo on the project developing a small GUI as well to aid the non-tech users in using the underlying technology.",
            href: "unavailable",
            unavailable: true,
            tools: ["Python", "Selenium", "SQL"],
          },
          {
            title: "Excel Automation Application",
            description:
              "Completed as part of a Freelancing job. Built a Python-based script (using only NumPy and Pandas) packaged with PyInstaller as a `.exe` to install on Windows and run independently. Consolidated data from 34 (files) x 5 (sheets) into 5 files. Reduced processing times from several days to minutes. Added features for after-processing to reduce even more human efforts in consolidating and cleaning data. Set up Excel macros to transform the final data into the required format, eliminating the need for manual work.",
            href: "https://github.com/apnatvar/deliveredProjects/blob/main/ConsolidateExcel.py",
            tools: ["Python", "Pandas", "Tkinter"],
          },
          {
            title: "Sample UI Blocks",
            description:
              "Pre-cursor to a template based website builder. Offers a look into standalone components and blocks built with Shadcn primitives and styled with Tailwind. The components are built for reuse and utilise props and dynamically genreates them to let the user extend the functionality without any code changes. Currently hosted on vercel, and offering previews only at the moment.",
            href: "https://samples-ap.vercel.app/",
            tools: ["TypeScript", "Next.js", "Shadcn", "Tailwind CSS"],
          },
        ],
      },
    ],
  },
  {
    id: "plans",
    slug: "plans",
    title: "Plans of Tomorrow",
    eyebrow: "Forward View",
    summary:
      "The future-facing section turns goals into a sequence of creative directions around motion, 3D, product thinking, collaboration, and studio-building.",
    kicker: "Plans of Tomorrow",
    metrics: ["06", "5 tracks", "Visual ambition"],
    desktopPosition: { x: 1260, y: 420, width: 390, height: 330, rotate: 4 },
    blocks: [
      {
        type: "plans",
        plans: [
          {
            title: "Bringing Motion to Meaning",
            description:
              "Animation is where design breathes. I continue to push creative boundaries with two animation libraries GSAP and Motion.dev to make transitions feel deliberate and alive, inviting user interaction.",
            image: {
              src: "https://live.staticflickr.com/65535/54891894480_3e02a3e0a3_b.jpg",
              alt: "An image with text talking about the importance of animations in UI/UX",
              href: "https://www.flickr.com/photos/203680033@N06/54891894480/in/dateposted-public/",
            },
            tags: ["GSAP", "2D/3D Animations", "Motion.dev"],
          },
          {
            title: "A Third Dimension",
            description:
              "Blender is an amazing tool that I have begun working with recently. I use Meshy for fast object creation, while I plan to use blender for product designing and scene development.",
            image: {
              src: "https://live.staticflickr.com/65535/54891894450_485ae70176_b.jpg",
              alt: "A creative with 3D Bird prop and text about the use of 3D in websites",
              href: "https://www.flickr.com/photos/203680033@N06/54891894450/in/dateposted-public/",
            },
            tags: ["Three.js", "3D Modelling", "Blender", "Meshy AI"],
          },
          {
            title: "Mastering the Principles",
            description:
              "I have always analysed tech products and thought about how I would go about designing them. I want to design products and interfaces that compliment them, to give users an experience that is unintrusive and seamless.",
            image: {
              src: "https://live.staticflickr.com/65535/54891821323_bfa069e7a0_b.jpg",
              alt: "A creative talking about academic excellence",
              href: "https://www.flickr.com/photos/203680033@N06/54891821323/in/dateposted-public/",
            },
            tags: ["Master's", "Design", "Interaction", "Interface"],
          },
          {
            title: "Learning from the System",
            description:
              "Every product has a lot of parts and great products are defined by the harmony between these parts. One person cannot do everything, so I want to work with creators and learn how a design goes from ideation to delivery.",
            image: {
              src: "https://live.staticflickr.com/65535/54890722027_41bfeebbf4_b.jpg",
              alt: "A creative asking about living in the moment and attracting good energy",
              href: "https://www.flickr.com/photos/203680033@N06/54890722027/in/dateposted-public/",
            },
            tags: ["Developer", "UI/UX", "Designer"],
          },
          {
            title: "Building My Simulation",
            description:
              "I want to establish my own design studio creating stories, experiences, products. My biggest motivations for this dream are Pininfarina, Virgil's OFF-WHITE designs, and Jony Ive's IO and earlier work. I am inspired to merge function with emotion and be an excellent digital storyteller and designer.",
            image: {
              src: "https://live.staticflickr.com/65535/54891599921_84a50e5c41_b.jpg",
              alt: "A creative talking about a journey through time and hoping it was worth it.",
              href: "https://www.flickr.com/photos/203680033@N06/54891599921/in/dateposted-public/",
            },
            tags: ["Design", "Storytelling", "Entrepreneur"],
          },
        ],
      },
    ],
  },
  {
    id: "library",
    slug: "library",
    title: "Component Library",
    eyebrow: "System Thinking",
    summary:
      "A reusable UI library section that combines design-system thinking with a longer-term MCP and AI-driven creation vision.",
    kicker: "Reusable, theme-ready, and extending into AI-assisted tooling.",
    metrics: ["07", "128+ components", "42+ blocks"],
    desktopPosition: { x: 480, y: 850, width: 420, height: 290, rotate: -2 },
    blocks: [
      {
        type: "metrics",
        body: "My UI Component Library was initially to showcase what I can build, letting clients `shop` sections for their sites, while acting as a foundation for refinement. Built with Shadcn UI and Tailwind, it's dynamic, reusable, and theme-ready. A eureka moment led to me working to integrate MCP. It'll evolve into an AI-driven design system trained to create with my taste. Currently the library only hosts simple components, the blocks get creative, and full websites take it further.",
        links: [
          {
            label: "UI Component Library",
            href: "https://modelcontextprotocol.io/docs/getting-started/intro",
            external: true,
          },
          {
            label: "MCP",
            href: "https://modelcontextprotocol.io/docs/getting-started/intro",
            external: true,
          },
        ],
        metrics: [
          { label: "Components", value: "128+" },
          { label: "Blocks", value: "42+" },
          { label: "Days Spent", value: daysSince("2025-08-13") },
        ],
      },
    ],
  },
  {
    id: "between-work",
    slug: "between-work",
    title: "Between Work",
    eyebrow: "Gallery",
    summary:
      "Photography and travel imagery become another destination in the system, showing craft beyond screen-based work.",
    kicker: "Crafting experiences, on-screen and off.",
    metrics: ["08", "Visual archive", "Image-led"],
    desktopPosition: { x: 980, y: 860, width: 470, height: 320, rotate: 3 },
    blocks: [
      {
        type: "gallery",
        body: "Crafting experiences, on-screen and off.",
        images: [
          {
            src: "https://live.staticflickr.com/65535/54888664057_55bbe2d3e2_b.jpg",
            alt: "photo near the Taj Mahal",
            href: "https://www.flickr.com/photos/203680033@N06/54888664057/in/dateposted-public/",
          },
          {
            src: "https://live.staticflickr.com/65535/54888664062_9dbc7d2440_b.jpg",
            alt: "diwali fireworks",
            href: "https://www.flickr.com/photos/203680033@N06/54888664062/in/dateposted-public/",
          },
          {
            src: "https://live.staticflickr.com/65535/54889541331_2873982e01_b.jpg",
            alt: "a cave near mount abu, rajasthan",
            href: "https://www.flickr.com/photos/203680033@N06/54889541331/in/dateposted-public/",
          },
          {
            src: "https://live.staticflickr.com/65535/54888664092_aaa53443d5_b.jpg",
            alt: "17866820963288583",
            href: "https://www.flickr.com/photos/203680033@N06/54888664092/in/dateposted-public/",
          },
          {
            src: "https://live.staticflickr.com/65535/54889832925_c9c528a0ab_b.jpg",
            alt: "black and white photo of a hand on a porch in Egypt",
            href: "https://www.flickr.com/photos/203680033@N06/54889832925/in/dateposted-public/",
          },
          {
            src: "https://live.staticflickr.com/65535/54889783374_0a5897d701_b.jpg",
            alt: "A photo showing a trekker and the Kedarkantha peak",
            href: "https://www.flickr.com/photos/203680033@N06/54889783374/in/dateposted-public/",
          },
        ],
      },
    ],
  },
  {
    id: "connect",
    slug: "connect",
    title: "Connect to My Mainframe",
    eyebrow: "Contact",
    summary:
      "The closing section keeps social links visible and direct, with the same copy carried over into a cleaner, more readable format.",
    kicker: "The Simulation is always running.",
    metrics: ["09", "Social links", "Always available"],
    desktopPosition: { x: 40, y: 860, width: 360, height: 280, rotate: -4 },
    blocks: [
      {
        type: "social",
        body: "Connect to My Mainframe",
        socials: [
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
          },
          { label: "GitHub", href: "https://github.com/apnatvar/" },
          { label: "Instagram", href: "https://instagram.com/nattupi/" },
          { label: "Medium", href: "https://medium.com/@nattupi" },
          {
            label: "Chess.com",
            href: "https://www.chess.com/member/nattupi",
          },
          {
            label: "CV",
            href: "https://github.com/apnatvar/apnatvar/blob/main/ApnatvaCV.pdf",
          },
        ],
        footer: "The Simulation is always running.",
      },
    ],
  },
];
