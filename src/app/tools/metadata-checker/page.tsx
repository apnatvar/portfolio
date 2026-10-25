import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs } from "@/lib/metadata";
import { MetadataChecker } from "@/components/tools/metadata-checker";
import { ToolPageHeader } from "@/components/tools/tool-page-header";
import type { Metadata } from "next";

const title = "HTML Metadata Checker | AP";
const description = "Check pasted HTML in your browser for a title, description, canonical syntax, robots meta, H1 headings, and parseable JSON-LD.";
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: "/tools/metadata-checker" },
  openGraph: { type: "website", title, description, url: "/tools/metadata-checker", images: ["/4.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/4.webp"] },
  robots: { index: true, follow: true },
};

export default function MetadataCheckerPage() {
  return <div className="tool-page mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16"><ToolPageHeader eyebrow="HTML inspection tool" title="Metadata Checker" description="Inspect a pasted HTML snapshot for a small set of on-page SEO signals." /><JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "HTML Metadata Checker", path: "/tools/metadata-checker" }])} /><MetadataChecker /><section className="mt-10 border-t pt-8"><h2 className="text-2xl mb-4">Continue the diagnosis</h2><p>Compare the results with the <Link className="underline" href="/writing/nextjs-technical-seo-checklist">Next.js technical SEO checklist</Link>. For implementation help, explore <Link className="underline" href="/services/technical-seo">technical SEO engineering</Link>.</p></section></div>;
}
