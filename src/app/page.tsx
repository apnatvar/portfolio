import { JsonLd } from "@/components/json-ld";
import { EngineeringHome } from "@/components/engineering-home";
import { PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { PortfolioRenderer } from "@/portfolio/portfolio-renderer";
export const metadata = pageMetadata("Next.js Technical SEO Engineer", "AP builds, optimises, and automates technical SEO infrastructure for Next.js and TypeScript websites. Based in India, available remotely worldwide.", "/");
export default function Home() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${SITE_URL}/#webpage`, url: SITE_URL, name: "AP — Next.js Technical SEO Engineer", description: metadata.description, isPartOf: { "@id": WEBSITE_ID }, mainEntity: { "@id": PERSON_ID } }} /><PortfolioRenderer><EngineeringHome /></PortfolioRenderer></>;
}
