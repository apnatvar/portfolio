import WorkHorizontalScrollSection from "@/components/work";
import { MorphingNav } from "@/components/navbar";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Front-end and technical SEO work", "Websites and tools by Apnatva Singh Rawat, with a focus on front-end development and technical SEO.", "/work");
export default function WorkPage() {
  return <div className="atelier-page"><MorphingNav /><header className="work-page-intro"><span className="atelier-label">The work, collected</span><h1>A few things I’ve made.</h1><p>Some for clients. Some because I wanted them to exist.</p><p>I work across front-end development and technical SEO: interfaces, performance, and the structure that helps people and search engines find their way around a site.</p><p>Here are a few examples, from a content-heavy business website to an open-source workout planner.</p></header><WorkHorizontalScrollSection /></div>;
}
