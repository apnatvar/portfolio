import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SITE_URL } from "@/lib/site";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Check,
  CircleUserRound,
  Database,
  Eye,
  Globe2,
  Handshake,
  LockKeyhole,
  Plug,
  Search,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portable Context — Single Source of Truth",
  description:
    "A reusable, user-controlled context profile with public, connected, and private layers for people and their agents.",
  alternates: {
    canonical: "/portable-context",
  },
  openGraph: {
    type: "website",
    url: "/portable-context",
    title: "Portable Context — Single Source of Truth",
    description:
      "Make context public for discovery, share more with approved connections, and keep the rest truly private.",
  },
};

const modelSteps = [
  {
    icon: Database,
    title: "Store context",
    copy: "Maintain identity, education, work, skills, interests, goals, links, preferences, and additional facts in one structured profile.",
  },
  {
    icon: Eye,
    title: "Choose visibility",
    copy: "Set every section to public, connected, or private. Additional facts can have their own visibility.",
  },
  {
    icon: Search,
    title: "Be discoverable",
    copy: "Let public capabilities, interests, goals, and availability help the right people find you.",
  },
  {
    icon: Handshake,
    title: "Connect by consent",
    copy: "A request and mutual approval create a trusted relationship with access to connected context.",
  },
  {
    icon: Bot,
    title: "Use it everywhere",
    copy: "Websites, applications, and agents receive useful context while respecting the same choices.",
  },
] as const;

const visibilityLevels = [
  {
    icon: Eye,
    level: "Public",
    audience: "Discoverable by anyone",
    copy: "Intentionally public identity, interests, capabilities, goals, and open-to-connect status. Visible on profiles and available for discovery.",
  },
  {
    icon: UserRoundCheck,
    level: "Connected",
    audience: "Approved relationships",
    copy: "Richer personal context shared with mutually approved people and agents acting on their behalf.",
  },
  {
    icon: LockKeyhole,
    level: "Private",
    audience: "Owner only",
    copy: "A holding space for context the owner may share later. Never exposed merely because someone is connected.",
  },
] as const;

const prototypeCapabilities = [
  "Data-rich fictional Alice, Bob, and Charlie profiles",
  "Public, connected, and private data on every profile",
  "Accepted Bob–Alice and pending Charlie→Bob relationships",
  "Public profiles and cross-profile discovery",
  "Agent-readable context with relationship-aware access",
  "Consistent visibility choices wherever context is used",
] as const;

const agentFlow = [
  {
    icon: CircleUserRound,
    label: "You approve",
    detail: "Sign in and choose access",
  },
  {
    icon: Plug,
    label: "Secure connector",
    detail: "Authorization stays protected",
  },
  {
    icon: ShieldCheck,
    label: "Portable Context",
    detail: "Applies your sharing choices",
  },
  { icon: Bot, label: "Your agent", detail: "Receives only useful context" },
] as const;

const interactiveCardClass =
  "shadow-none transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-1 hover:border-foreground hover:shadow-md";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function PortableContextPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Portable Context",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/portable-context`,
    description: metadata.description,
    creator: {
      "@type": "Person",
      name: "Apnatva Singh Rawat",
      url: SITE_URL,
    },
  };

  return (
    <div className="portable-context-page min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <header className="border-b border-border/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/portable-context"
            className="text-sm font-semibold no-underline"
          >
            Portable Context
          </Link>
          <nav
            className="flex items-center gap-4 text-sm"
            aria-label="Product navigation"
          >
            <Link
              href="#product-model"
              className="hidden text-muted-foreground no-underline hover:text-foreground sm:inline"
            >
              How it works
            </Link>
            <Link
              href="#prototype"
              className="hidden text-muted-foreground no-underline hover:text-foreground sm:inline"
            >
              Prototype
            </Link>
          </nav>
        </div>
      </header>

      <div>
        <section className="border-b border-border/80">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-32">
            <div>
              <Badge variant="outline">Functional prototype</Badge>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Single Source of Truth for The Agentic Internet.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Portable Context is a user-controlled context layer for people
                and their agents. Make information public for discovery, share
                richer context with approved connections, and keep the rest
                truly private.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="#product-model">
                    Explore the product model
                    <ArrowDown aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="portable-context-agent-cta"
                >
                  <Link href="#agent-context">See the agent flow</Link>
                </Button>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                A working product-model prototype—not a production identity
                platform.
              </p>
            </div>

            <div
              className="border bg-card p-4 shadow-sm transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-md sm:p-6"
              aria-label="Public, connected, and private context layers"
            >
              <div className="border border-primary bg-primary/5 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Globe2
                      aria-hidden="true"
                      className="size-5 text-primary"
                    />
                    <p className="font-semibold">Public</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    discoverable
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Identity, capabilities, interests, goals, open to connect
                </p>
                <div className="mt-4 border border-foreground bg-secondary p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <UserRoundCheck aria-hidden="true" className="size-5" />
                      <p className="font-semibold">Connected</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      approved people
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Richer context for trusted people and their agents
                  </p>
                  <div className="mt-4 bg-foreground p-4 text-background sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <LockKeyhole aria-hidden="true" className="size-5" />
                        <p className="font-semibold">Private</p>
                      </div>
                      <span className="font-mono text-xs text-background/60">
                        owner only
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-background/70">
                      Held until the owner decides otherwise
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium">
                Public for discovery. Connected for people you trust. Private
                until you decide otherwise.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="The problem"
              title="Stop explaining yourself from scratch."
              description="People repeatedly explain who they are, what they do, what they need, and how they prefer to work. Portable Context keeps that information structured and reusable, without treating every part of a person as public data."
            />
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
              {[
                "Job and education applications",
                "Professional communities",
                "Clubs and local groups",
                "Owned Businesses",
                "AI assistants and agents",
                "Personal profile pages",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex min-h-24 items-start gap-4 bg-card p-5 transition-colors duration-200 hover:bg-secondary"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-medium leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/80 bg-foreground text-background">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
                AI search and discovery
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Deterministic answers help the right people find you.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-background/70 sm:text-lg">
                Instead of asking AI to infer who you are from scattered pages,
                Portable Context gives it explicit, structured answers. You can
                clearly communicate your skills, services, businesses,
                interests, and availability so relevant searches have a
                dependable source to interpret.
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-background/60">
                An agent can match that public context to a customer&apos;s
                request, explain why it is relevant, and present the result
                without forcing the customer to leave the chat.
              </p>
            </div>
            <div className="border border-background/25 p-5 transition-colors duration-200 hover:bg-background/5 sm:p-8">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="border border-background/25 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-background/60">
                    <Globe2 aria-hidden="true" className="size-4" />
                    Explicit public context
                  </div>
                  <ul className="mt-5 space-y-3 text-sm">
                    <li>Skills and capabilities</li>
                    <li>Services and businesses</li>
                    <li>Goals and availability</li>
                  </ul>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="mx-auto size-5 rotate-90 text-background/60 sm:rotate-0"
                />
                <div className="bg-background p-5 text-foreground">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    <Search
                      aria-hidden="true"
                      className="size-4 text-primary"
                    />
                    Interpretable result
                  </div>
                  <p className="mt-5 text-sm leading-6">
                    AI can find, understand, and present a relevant person or
                    business directly in the conversation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="product-model"
          className="scroll-mt-8 border-y border-border/80 bg-card/50"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHeading
              eyebrow="The product model"
              title="One source. Explicit boundaries. Multiple interfaces."
              description="Context moves through a simple, inspectable sequence. Access control is part of the model—not a separate promise added after the data is stored."
            />
            <ol className="mt-12 grid gap-4 md:grid-cols-5">
              {modelSteps.map((step, index) => (
                <li key={step.title} className="relative">
                  <Card className={`h-full ${interactiveCardClass}`}>
                    <CardHeader>
                      <div className="mb-4 flex items-center justify-between">
                        <step.icon aria-hidden="true" className="size-5" />
                        <span className="font-mono text-xs text-muted-foreground">
                          0{index + 1}
                        </span>
                      </div>
                      <CardTitle className="leading-snug">
                        {step.title}
                      </CardTitle>
                      <CardDescription className="leading-6">
                        {step.copy}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  {index < modelSteps.length - 1 ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-card md:block"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="User-controlled access"
            title="Three understandable context layers."
            description="Public for discovery. Connected for people you trust. Private until you decide otherwise. Every profile area has an explicit boundary, and a connection never turns private context into shared context."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {visibilityLevels.map((item) => (
              <Card key={item.level} className={interactiveCardClass}>
                <CardHeader>
                  <item.icon aria-hidden="true" className="mb-5 size-6" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="text-xl">{item.level}</CardTitle>
                    <Badge variant="outline">{item.audience}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.copy}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-border/80 bg-card/50">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Public discovery"
                title="Find people through what they intentionally share."
                description="Search across public profiles and capabilities without exposing connected or private information. Discovery stays inside the public layer, even for signed-in users."
              />
              <div className="mt-7 flex flex-wrap gap-2">
                <Badge variant="outline">Public identity</Badge>
                <Badge variant="outline">Capabilities</Badge>
                <Badge variant="outline">Interests</Badge>
                <Badge variant="outline">Goals</Badge>
                <Badge variant="outline">Open to connect</Badge>
              </div>
            </div>
            <div className="overflow-hidden border bg-foreground text-background transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between border-b border-background/20 px-4 py-3 text-xs text-background/60">
                <span className="flex items-center gap-2">
                  <Search aria-hidden="true" className="size-4" />
                  Public discovery
                </span>
                <span>Public layer only</span>
              </div>
              <div className="space-y-3 p-5 text-sm">
                {[
                  "Find people by capability or interest",
                  "Understand who is open to connecting",
                  "View intentionally public profile context",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="border border-background/25 px-3 py-2.5"
                  >
                    {feature}
                  </div>
                ))}
              </div>
              <p className="border-t border-background/20 px-5 py-4 text-sm leading-6 text-background/65">
                Connected and private context never appears in discovery.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border/80 bg-foreground text-background">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
                Trusted collaboration
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Bob and Alice, and their agents
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-background/70 sm:text-lg">
                Bob and Alice are mutually approved connections. When Alice
                chooses to use her agent with Portable Context, it can
                understand Bob&apos;s public and connected context to help them
                collaborate more effectively.
              </p>
              <p className="mt-5 text-sm text-background/60">
                Bob&apos;s private context remains visible only to Bob and
                agents he explicitly authorizes as himself.
              </p>
            </div>
            <div className="border border-background/25 p-5 sm:p-8">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                <div className="border border-background/25 p-4 transition-colors duration-200 hover:bg-background/10">
                  <CircleUserRound
                    aria-hidden="true"
                    className="mx-auto size-7"
                  />
                  <p className="mt-2 font-semibold">Bob</p>
                </div>
                <div className="text-xs text-background/60">
                  accepted
                  <ArrowRight
                    aria-hidden="true"
                    className="mx-auto mt-1 size-5"
                  />
                </div>
                <div className="border border-background/25 p-4 transition-colors duration-200 hover:bg-background/10">
                  <CircleUserRound
                    aria-hidden="true"
                    className="mx-auto size-7"
                  />
                  <p className="mt-2 font-semibold">Alice</p>
                </div>
              </div>
              <div className="my-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="border border-background/25 p-3 text-center text-xs">
                  Alice approves her agent
                </div>
                <span className="text-center text-xl text-background/60">
                  +
                </span>
                <div className="border border-background/25 p-3 text-center text-xs">
                  Bob and Alice are connected
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 bg-background px-4 py-3 text-center text-foreground">
                <ShieldCheck aria-hidden="true" className="size-5 shrink-0" />
                <span className="text-sm font-semibold">
                  Alice&apos;s agent receives Bob&apos;s public + connected
                  context
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="agent-context"
          className="scroll-mt-8 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
        >
          <SectionHeading
            eyebrow="Built for agents"
            title="The agent sees useful context—not the credential that unlocks it."
            description="Add Portable Context as a connector, sign in through a secure OAuth flow, and approve what your agent may use. The agent receives relevant profile context while the authorization itself stays protected by the host."
          />
          <div className="mt-12 space-y-6">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
              {agentFlow.map((item, index) => {
                const FlowIcon = item.icon;
                return (
                  <div key={item.label} className="contents">
                    <Card
                      className={`flex min-h-36 items-center justify-center p-5 text-center ${interactiveCardClass}`}
                    >
                      <FlowIcon aria-hidden="true" className="mx-auto size-6" />
                      <p className="mt-3 text-sm font-semibold">{item.label}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {item.detail}
                      </p>
                    </Card>
                    {index < agentFlow.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="mx-auto size-5 rotate-90 text-muted-foreground lg:rotate-0"
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="grid gap-px overflow-hidden border bg-border lg:grid-cols-2">
              <div className="bg-foreground p-6 text-background sm:p-8">
                <h3 className="text-xl font-semibold">Simple for people</h3>
                <p className="mt-4 text-sm leading-6 text-background/70">
                  Add the connector, sign in, review the requested access, and
                  return to your agent. No manual credential handling is part of
                  the normal experience.
                </p>
              </div>
              <div className="bg-background p-6 sm:p-8">
                <h3 className="text-xl font-semibold">Useful for agents</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Agents can use approved profile information to help with real
                  work. They receive context, not the credentials used to
                  authorize it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/80 bg-card/50">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHeading
              eyebrow="Consistent privacy"
              title="Your choices travel with your context."
              description="Whether someone finds you publicly, views your profile, or works with you through an agent, the same three sharing choices continue to apply."
            />
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-2">
              <div className="bg-background p-6 transition-colors duration-200 hover:bg-secondary sm:p-8">
                <Badge variant="secondary">Public discovery</Badge>
                <p className="mt-6 text-2xl font-semibold tracking-tight">
                  Public means public.
                </p>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Discovery uses only information you deliberately placed in the
                  public layer.
                </p>
              </div>
              <div className="bg-background p-6 transition-colors duration-200 hover:bg-secondary sm:p-8">
                <Badge>Trusted use</Badge>
                <p className="mt-6 text-2xl font-semibold tracking-tight">
                  Connecting shares more—not everything.
                </p>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Approved people and their agents can use connected context.
                  Private remains yours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="prototype"
          className="scroll-mt-8 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
        >
          <SectionHeading
            eyebrow="Working prototype"
            title="The core product experience is demonstrable today."
            description="The prototype shows how structured profiles, discovery, mutual connections, three sharing layers, and agent-readable context work together."
          />
          <div className="mt-12">
            <Card className={interactiveCardClass}>
              <CardHeader>
                <Badge variant="secondary">Implemented</Badge>
                <CardTitle className="mt-3 text-xl">
                  What the prototype proves
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {prototypeCapabilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="border-t-4 border-foreground bg-foreground text-background">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
                Portable Context / Prototype 01
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
                Single Context Source, unlimited usage potential.
              </h2>
            </div>
            <div className="lg:text-right">
              <p className="mb-5 text-sm leading-6 text-background/65">
                Public for discovery. Connected for people you trust. Private
                until you decide otherwise.
              </p>
              <Badge
                asChild
                variant="outline"
                className="border-background/50 px-3 py-1.5 text-background transition-colors duration-200 hover:bg-background hover:text-foreground"
              >
                <Link href="/">Meet the builder</Link>
              </Badge>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
