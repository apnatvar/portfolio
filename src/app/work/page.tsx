import WorkHorizontalScrollSection from "@/components/work";
import { MorphingNav } from "@/components/navbar";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("A few things I have made", "Websites, small tools, and experiments by Apnatva Singh Rawat.", "/work");
export default function WorkPage() {
  return <div className="atelier-page"><MorphingNav /><header className="work-page-intro"><span className="atelier-label">The work, collected</span><h1>A few things I’ve made.</h1><p>Some for clients. Some because I wanted them to exist.</p></header><WorkHorizontalScrollSection /></div>;
}
