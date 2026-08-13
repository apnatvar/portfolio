export const SITE_URL = "https://apnatva.dev";
export const SITE_NAME = "AP";
export const DEFAULT_SOCIAL_IMAGE = "/4.webp";

export const PERSON_ID = `${SITE_URL}/#apnatva`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const PROFILE_URLS = [
  "https://www.linkedin.com/in/apnatva-singh-rawat/",
  "https://github.com/apnatvar",
  "https://medium.com/@nattupi",
  "https://www.instagram.com/nattupi/",
] as const;

export const siteIdentityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Apnatva Singh Rawat",
      alternateName: ["AP", "Apnatva"],
      url: SITE_URL,
      image: `${SITE_URL}${DEFAULT_SOCIAL_IMAGE}`,
      jobTitle: "Full-stack Web Developer and Software Developer",
      email: "mailto:rawat@apnatva.dev",
      sameAs: PROFILE_URLS,
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "API integration",
        "Web application development",
        "Software automation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "Apnatva",
      inLanguage: "en-IN",
      publisher: { "@id": PERSON_ID },
    },
  ],
};
