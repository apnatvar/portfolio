import { DecisionConfidenceCalculator } from "@/components/tools/decision-confidence-calculator";
import { JsonLd } from "@/components/tools/json-ld";
import { ToolPageHeader } from "@/components/tools/tool-page-header";
import type { Metadata } from "next";
import Link from "next/link";

const title = "Decision Confidence Calculator and Decision Readiness Tool | AP Natva";
const description =
  "Evaluate decision readiness, risk, evidence and reversibility using a structured client-side decision framework.";
const url = "https://apnatva.dev/tools/decision-confidence-calculator";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "decision confidence calculator",
    "decision readiness tool",
    "decision making framework",
    "reversible decision calculator",
    "decision risk assessment",
    "should I decide now",
    "decision analysis tool",
  ],
  alternates: { canonical: "/tools/decision-confidence-calculator" },
  openGraph: { type: "website", title, description, url, images: ["/4.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/4.webp"] },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    question: "Does this calculator use AI?",
    answer:
      "No. It uses fixed factor weights, explicit recommendation rules and predefined next-step text entirely in your browser.",
  },
  {
    question: "What does the readiness score mean?",
    answer:
      "It is a broad framework summary of evidence, reversibility, urgency, upside, alignment and emotional calm—not a prediction or guarantee.",
  },
  {
    question: "Is this financial or professional advice?",
    answer:
      "No. It is a general decision framework and is not financial, legal, medical or psychological advice.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Decision Confidence Calculator",
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url,
    browserRequirements: "Requires JavaScript enabled in a modern web browser.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export default function DecisionConfidenceCalculatorPage() {
  return (
    <main className="tool-page mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <JsonLd data={structuredData} />
      <ToolPageHeader
        title="Decision Confidence Calculator"
        description="Evaluate readiness, risk, evidence and reversibility with a transparent, deterministic decision framework."
      />
      <DecisionConfidenceCalculator />
      <section className="tool-support-content mt-12 grid gap-8 border-t pt-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-medium">How to use it</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>Name and categorize the decision if useful.</li>
            <li>Score all ten factors from their clearly labelled endpoints.</li>
            <li>Review the rule-based recommendation, key influences and next step.</li>
          </ol>
        </div>
        <div>
          <h2 className="text-2xl font-medium">FAQ</h2>
          <div className="mt-4 space-y-3">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="rounded-xl border p-4">
                <summary className="cursor-pointer font-medium">{question}</summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </div>
        <nav className="md:col-span-2" aria-label="Related pages">
          <h2 className="text-lg font-medium">Keep exploring</h2>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link className="underline underline-offset-4" href="/tools/developer-focus-planner">Developer Focus Planner</Link>
            <Link className="underline underline-offset-4" href="/hire-ap">Web development services</Link>
            <Link className="underline underline-offset-4" href="/about-ap">About AP</Link>
          </div>
        </nav>
      </section>
    </main>
  );
}
