import { AboutRenderer } from "@/portfolio/about/about-renderer";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("A little about AP", "Apnatva Singh Rawat: independent designer, developer, and occasional writer. A few notes on the person behind the work.", "/about-ap");
export default function Page() { return <AboutRenderer />; }
