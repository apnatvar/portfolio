import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, CodeXml, TimerReset } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Technical SEO & Developer Tools | AP" },
  description:
    "Check pasted HTML metadata and plan development work with free browser-local tools. No account or upload required.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Technical SEO & Developer Tools | AP",
    description:
      "Inspect HTML metadata and plan development work with browser-local utilities.",
    url: "/tools",
    images: ["/4.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical SEO & Developer Tools | AP",
    description:
      "HTML metadata checks and focused development planning, locally in your browser.",
    images: ["/4.webp"],
  },
  robots: { index: true, follow: true },
};

const tools = [
  {
    category: "Plan",
    href: "/tools/developer-focus-planner",
    title: "Developer Focus Planner",
    description:
      "Turn a task list into a practical day of focus blocks, breaks and honest overflow.",
    icon: TimerReset,
  },
  {
    category: "Plan",
    href: "/tools/decision-confidence-calculator",
    title: "Decision Confidence Calculator",
    description:
      "Score evidence, risk, urgency and reversibility to choose a sensible next move.",
    icon: BrainCircuit,
  },
  {
    category: "Check",
    href: "/tools/metadata-checker",
    title: "HTML Metadata Checker",
    description: "Inspect pasted HTML locally for title, description, canonical syntax, robots meta, H1s and parseable JSON-LD.",
    icon: CodeXml,
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto min-h-[75svh] w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Practical utilities
      </p>
      <h1 className="mt-3 max-w-4xl font-italianno text-5xl leading-none transition-all duration-500 sm:text-7xl lg:text-8xl">
        Useful tools, without an account.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
        Browser-based helpers for planning focused work, reviewing a decision framework, and checking selected HTML markup. Each tool explains its scope and limitations.
      </p>

      {["Plan", "Check"].map((category) => <section key={category} className="mt-10" aria-label={`${category} tools`}>
        <h2 className="mb-4 text-xl font-medium">{category}</h2>
        <div className="grid gap-4 md:grid-cols-2">
        {tools.filter((tool) => tool.category === category).map(({ href, title, description, icon: Icon }) => (
          <Card key={href} className="group transition-colors hover:border-foreground/40">
            <CardHeader>
              <Icon aria-hidden="true" className="mb-5 size-8 text-muted-foreground" />
              <CardTitle className="text-2xl font-medium"><h3>{title}</h3></CardTitle>
              <CardDescription className="max-w-md leading-6">{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={href}
                className="inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Open tool <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
        </div>
      </section>)}
    </div>
  );
}
