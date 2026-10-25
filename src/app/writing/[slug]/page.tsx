import type { Metadata } from "next";
import { EngineeringNav } from "@/components/engineering-home";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { getGuide, guides } from "@/content/writing";

const origin = "https://apnatva.dev";
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found | AP", robots: { index: false, follow: true } };
  const url = `${origin}/writing/${guide.slug}`;
  return {
    title: { absolute: `${guide.title} | AP` }, description: guide.description,
    alternates: { canonical: `/writing/${guide.slug}` },
    openGraph: { type: "article", title: guide.title, description: guide.description, url, publishedTime: `${guide.updated}T00:00:00.000Z`, modifiedTime: `${guide.updated}T00:00:00.000Z`, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: `${guide.title} | AP`, description: guide.description, images: ["/opengraph-image"] },
    robots: { index: true, follow: true },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const url = `${origin}/writing/${guide.slug}`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, datePublished: guide.updated, dateModified: guide.updated, mainEntityOfPage: url, author: { "@type": "Person", name: "Apnatva Singh Rawat", url: origin }, publisher: { "@type": "Person", name: "Apnatva Singh Rawat", url: origin } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: origin }, { "@type": "ListItem", position: 2, name: "Writing", item: `${origin}/writing` }, { "@type": "ListItem", position: 3, name: guide.title, item: url }] },
  ];
  return <div className="mx-auto min-h-[75svh] w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
    <EngineeringNav />
    <JsonLd data={jsonLd} />
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><Link className="underline" href="/writing">Writing</Link><span aria-hidden="true"> / </span><span>{guide.title}</span></nav>
    <header className="border-b border-border/70 pb-8"><p className="text-sm text-muted-foreground">Field guide · Updated {guide.updated}</p><h1 className="mt-3 font-italianno text-5xl leading-tight sm:text-7xl">{guide.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{guide.description}</p></header>
    <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
      {guide.sections.map((section) => <section key={section.heading} className="mb-10"><h2 className="text-2xl font-semibold">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-7 text-muted-foreground">{paragraph}</p>)}{section.code && <><p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Illustrative example — not executed</p><pre className="mt-2 overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm leading-6"><code>{section.code}</code></pre></>}</section>)}
      <section className="mb-10"><h2 className="text-2xl font-semibold">Official references</h2><ul className="mt-4 list-disc space-y-2 pl-5">{guide.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">{source.label}</a></li>)}</ul></section>
      <nav aria-label="Related pages" className="border-t pt-8"><h2 className="text-2xl font-semibold">Related</h2><div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">{guide.related.map((item) => <Link className="underline underline-offset-4" href={item.href} key={item.href}>{item.label}</Link>)}</div></nav>
    </div>
  </div>;
}
