import { JsonLd } from "@/components/json-ld";
import CreativePortfolio from "@/portfolio/creative/creative-portfolio";
import { PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Next.js Developer & Technical SEO", "Design-led Next.js development and technical SEO for content-rich websites, catalogues, and useful tools. React and TypeScript by Apnatva Singh Rawat.", "/");
export default function Home() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${SITE_URL}/#webpage`, url: SITE_URL, name: "AP — Front-end Developer, Designer & Technical SEO", description: metadata.description, isPartOf: { "@id": WEBSITE_ID }, mainEntity: { "@id": PERSON_ID } }} /><CreativePortfolio /></>;
}
