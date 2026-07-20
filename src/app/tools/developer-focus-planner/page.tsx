import { FocusPlanner } from "@/components/tools/focus-planner";
import { JsonLd } from "@/components/tools/json-ld";
import { ToolPageHeader } from "@/components/tools/tool-page-header";
import type { Metadata } from "next";
import Link from "next/link";

const title = "Developer Focus Planner and Pomodoro Schedule Builder | AP Natva";
const description =
  "Build a focused developer work schedule using deep work, Pomodoro or balanced time blocks. Runs entirely in your browser with printable exports.";
const url = "https://apnatva.dev/tools/developer-focus-planner";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "developer focus planner",
    "developer schedule planner",
    "coding pomodoro planner",
    "deep work planner for developers",
    "programming timetable generator",
    "coding productivity planner",
    "developer time blocking tool",
  ],
  alternates: { canonical: "/tools/developer-focus-planner" },
  openGraph: { type: "website", title, description, url, images: ["/4.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/4.webp"] },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    question: "How is the schedule created?",
    answer:
      "Fixed meetings and breaks are placed first. Remaining tasks are ordered by priority and cognitive demand, then fitted into deterministic blocks for the selected style.",
  },
  {
    question: "Does my task data leave this browser?",
    answer:
      "No. Planning, validation and exports run locally, and the tool does not persist your entries after the page is closed.",
  },
  {
    question: "Can I save the plan?",
    answer:
      "Yes. Print or save it as a PDF, download Markdown or JSON, or copy a plain-text version.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Developer Focus Planner",
    description,
    applicationCategory: "DeveloperApplication",
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

export default function DeveloperFocusPlannerPage() {
  return (
    <main className="tool-page mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <JsonLd data={structuredData} />
      <ToolPageHeader
        title="Developer Focus Planner"
        description="Shape tasks, meetings and breaks into a realistic workday using balanced, deep-work, Pomodoro or flexible blocks."
      />
      <FocusPlanner />
      <section className="tool-support-content mt-12 grid gap-8 border-t pt-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-medium">How to use it</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>Set the workday, long break and planning style.</li>
            <li>Add tasks, marking only movable work as splittable.</li>
            <li>Fix meetings to a start time, then build and review any overflow.</li>
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
            <Link className="underline underline-offset-4" href="/tools/decision-confidence-calculator">Decision Confidence Calculator</Link>
            <Link className="underline underline-offset-4" href="/hire-ap">Web development services</Link>
            <Link className="underline underline-offset-4" href="/about-ap">About AP</Link>
          </div>
        </nav>
      </section>
    </main>
  );
}
