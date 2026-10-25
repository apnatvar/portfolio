import { JsonLd } from "@/components/json-ld";
import CreativePortfolio from "@/portfolio/creative/creative-portfolio";
import { PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("AP — Design, code & a little curiosity", "The independent work of Apnatva Singh Rawat. Websites, useful little tools, and an unreasonable amount of attention to how things feel.", "/");
export default function Home() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${SITE_URL}/#webpage`, url: SITE_URL, name: "AP — Design, code & a little curiosity", description: metadata.description, isPartOf: { "@id": WEBSITE_ID }, mainEntity: { "@id": PERSON_ID } }} /><CreativePortfolio /></>;
}
