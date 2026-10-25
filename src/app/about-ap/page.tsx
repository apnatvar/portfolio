import { AboutRenderer } from "@/portfolio/about/about-renderer";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("A little about AP", "Apnatva Singh Rawat: front-end developer and designer working with React, Next.js, TypeScript, and technical SEO. The person behind the work.", "/about-ap");
export default function Page() { return <AboutRenderer />; }
