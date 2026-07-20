import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, TimerReset } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Developer and Decision Tools | AP Natva",
  description:
    "Free browser-based tools for planning focused development work and evaluating decision readiness. No accounts, uploads or data storage.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Developer and Decision Tools | AP Natva",
    description:
      "Plan focused development work and evaluate decision readiness with private browser-based tools.",
    url: "/tools",
    images: ["/4.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Developer and Decision Tools | AP Natva",
    description:
      "Private, browser-based tools for focused work and clearer decisions.",
    images: ["/4.webp"],
  },
  robots: { index: true, follow: true },
};

const tools = [
  {
    href: "/tools/developer-focus-planner",
    title: "Developer Focus Planner",
    description:
      "Turn a task list into a practical day of focus blocks, breaks and honest overflow.",
    icon: TimerReset,
  },
  {
    href: "/tools/decision-confidence-calculator",
    title: "Decision Confidence Calculator",
    description:
      "Score evidence, risk, urgency and reversibility to choose a sensible next move.",
    icon: BrainCircuit,
  },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto min-h-[75svh] w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Practical utilities
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl">
        Useful tools, without an account.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
        Two deterministic tools for structuring focused work and assessing whether a decision is ready. Everything stays in this browser tab.
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-2" aria-label="Available tools">
        {tools.map(({ href, title, description, icon: Icon }) => (
          <Card key={href} className="group transition-colors hover:border-foreground/40">
            <CardHeader>
              <Icon aria-hidden="true" className="mb-5 size-8 text-muted-foreground" />
              <CardTitle className="text-2xl font-medium">{title}</CardTitle>
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
      </section>
    </main>
  );
}
