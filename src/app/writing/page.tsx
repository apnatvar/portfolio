import type { Metadata } from "next";
import { EngineeringNav } from "@/components/engineering-home";
import Link from "next/link";
import { guides } from "@/content/writing";

export const metadata: Metadata = {
  title: { absolute: "Writing on Technical SEO and Next.js | AP" },
  description: "Practical guides to technical SEO, programmatic page quality, and Next.js performance.",
  alternates: { canonical: "/writing" },
  openGraph: { type: "website", title: "Writing on Technical SEO and Next.js | AP", description: "Practical guides to technical SEO, programmatic page quality, and Next.js performance.", url: "/writing", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Writing on Technical SEO and Next.js | AP", description: "Practical guides to technical SEO, programmatic page quality, and Next.js performance.", images: ["/opengraph-image"] },
};

export default function WritingPage() {
  return <div className="mx-auto min-h-[75svh] w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
    <EngineeringNav />
    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Notes and field guides</p>
    <h1 className="mt-3 font-italianno text-5xl leading-none sm:text-7xl lg:text-8xl">Writing</h1>
    <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Practical references for building discoverable, useful, and fast web experiences.</p>
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {guides.map((guide) => <article key={guide.slug} className="rounded-2xl border p-6 sm:p-8">
        <p className="text-sm text-muted-foreground">Updated {guide.updated}</p>
        <h2 className="mt-3 text-2xl font-medium"><Link className="underline-offset-4 hover:underline" href={`/writing/${guide.slug}`}>{guide.title}</Link></h2>
        <p className="mt-3 leading-7 text-muted-foreground">{guide.description}</p>
        <Link className="mt-5 inline-block font-medium underline underline-offset-4" href={`/writing/${guide.slug}`}>Read guide</Link>
      </article>)}
    </div>
  </div>;
}
