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
  Braces,
  Check,
  CircleUserRound,
  Database,
  Eye,
  Handshake,
  LockKeyhole,
  Network,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portable Context — One Profile for the Agentic Internet",
  description:
    "A user-controlled, portable personal context layer for people, applications, AI assistants, and agents.",
  alternates: {
    canonical: "/portable-context",
  },
  openGraph: {
    type: "website",
    url: "/portable-context",
    title: "Portable Context — One Profile for the Agentic Internet",
    description:
      "Store structured personal context once, choose who may access it, and expose the same authorized representation through web, API, and MCP.",
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
    copy: "Set every section to public, connections, or private. Additional facts can have their own visibility.",
  },
  {
    icon: Handshake,
    title: "Establish relationships",
    copy: "A request and acceptance create a two-way connection with broader—but still limited—access.",
  },
  {
    icon: ShieldCheck,
    title: "Resolve access",
    copy: "One central resolver identifies the requester and returns only the context that relationship permits.",
  },
  {
    icon: Braces,
    title: "Use authorized context",
    copy: "People, applications, and agents consume the same filtered representation through web, JSON API, or MCP.",
  },
] as const;

const visibilityLevels = [
  {
    icon: Eye,
    level: "Public",
    audience: "Anyone",
    copy: "The profile owner has deliberately made this context available without a relationship.",
  },
  {
    icon: UserRoundCheck,
    level: "Connections",
    audience: "Accepted two-way connections",
    copy: "Public context plus sections intentionally shared with established connections.",
  },
  {
    icon: LockKeyhole,
    level: "Private",
    audience: "Owner only",
    copy: "Never included for anonymous visitors, unrelated users, connections, or their agents.",
  },
] as const;

const prototypeCapabilities = [
  "Structured personal profiles",
  "Section and per-fact visibility",
  "Connection requests and two-way acceptance",
  "A centralized context resolver",
  "Public profile and normalized JSON API",
  "Profile-specific MCP endpoints",
] as const;

const productionRequirements = [
  "OAuth and scoped application grants",
  "Expiration, rotation, and reliable revocation",
  "Audit logs and access history",
  "Stronger sensitive-data controls",
  "Export and data portability",
  "Production infrastructure and security review",
] as const;

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
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
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
    <div className="min-h-screen bg-background text-foreground">
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
          <nav className="flex items-center gap-4 text-sm" aria-label="Product navigation">
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
            <Link href="/" className="font-medium no-underline hover:underline">
              AP portfolio
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
                One profile for the agentic internet.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Portable Context lets a person maintain structured personal context once, decide
                what people, applications, and agents may access, and expose one consistently
                filtered representation across every interface.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="#product-model">
                    Explore the product model
                    <ArrowDown aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#agent-context">See the agent flow</Link>
                </Button>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                A working product-model prototype—not a production identity platform.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-6" aria-label="Context resolution summary">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Profile context
                  </p>
                  <p className="mt-1 font-mono text-sm">@demo_alpha</p>
                </div>
                <Badge variant="secondary">access: connection</Badge>
              </div>
              <div className="space-y-3 py-5">
                {[
                  ["Identity", "public"],
                  ["Education", "public"],
                  ["Professional", "connections"],
                  ["Goals", "connections"],
                  ["Private reminder", "withheld"],
                ].map(([label, access]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2.5 text-sm"
                  >
                    <span>{label}</span>
                    <span
                      className={
                        access === "withheld"
                          ? "text-muted-foreground line-through"
                          : "font-mono text-xs text-muted-foreground"
                      }
                    >
                      {access}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t pt-4 text-sm text-muted-foreground">
                <ShieldCheck aria-hidden="true" className="size-4" />
                Private context stays private.
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="The problem"
              title="Your context is everywhere except under your control."
              description="The same biography, education, experience, interests, goals, and preferences are repeatedly recreated across disconnected systems. Each copy becomes another version to maintain and another access decision the user cannot clearly see."
            />
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
              {[
                "Job and education applications",
                "Professional communities",
                "Clubs and local groups",
                "SaaS applications",
                "AI assistants and agents",
                "Personal profile pages",
              ].map((item, index) => (
                <div key={item} className="flex min-h-24 items-start gap-4 bg-card p-5">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-medium leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="product-model" className="scroll-mt-8 border-y border-border/80 bg-card/50">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHeading
              eyebrow="The product model"
              title="One source. Explicit boundaries. Multiple interfaces."
              description="Context moves through a simple, inspectable sequence. Access control is part of the model—not a separate promise added after the data is stored."
            />
            <ol className="mt-12 grid gap-4 md:grid-cols-5">
              {modelSteps.map((step, index) => (
                <li key={step.title} className="relative">
                  <Card className="h-full shadow-none">
                    <CardHeader>
                      <div className="mb-4 flex items-center justify-between">
                        <step.icon aria-hidden="true" className="size-5" />
                        <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                      </div>
                      <CardTitle className="leading-snug">{step.title}</CardTitle>
                      <CardDescription className="leading-6">{step.copy}</CardDescription>
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
            title="Three levels with plain meanings."
            description="The owner chooses how every profile section is exposed. Accepting a connection expands access only to connection-visible context; private information remains owner-only."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {visibilityLevels.map((item) => (
              <Card key={item.level} className="shadow-none">
                <CardHeader>
                  <item.icon aria-hidden="true" className="mb-5 size-6" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="text-xl">{item.level}</CardTitle>
                    <Badge variant="outline">{item.audience}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{item.copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-border/80 bg-foreground text-background">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
                The handshake
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                A relationship changes access—not ownership.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-background/70 sm:text-lg">
                One person sends a connection request. The other accepts. The resulting relationship
                is symmetric, but it grants only the context marked for connections.
              </p>
              <p className="mt-5 text-sm text-background/60">
                “Handshake” describes the consent flow; it is not a claim of TCP semantics.
              </p>
            </div>
            <div className="rounded-xl border border-background/25 p-5 sm:p-8">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                <div className="rounded-lg border border-background/25 p-4">
                  <CircleUserRound aria-hidden="true" className="mx-auto size-7" />
                  <p className="mt-2 font-semibold">Person A</p>
                </div>
                <div className="text-xs text-background/60">
                  request
                  <ArrowRight aria-hidden="true" className="mx-auto mt-1 size-5" />
                </div>
                <div className="rounded-lg border border-background/25 p-4">
                  <CircleUserRound aria-hidden="true" className="mx-auto size-7" />
                  <p className="mt-2 font-semibold">Person B</p>
                </div>
              </div>
              <div className="my-5 flex items-center gap-3 text-xs text-background/60">
                <span className="h-px flex-1 bg-background/25" />
                B accepts
                <span className="h-px flex-1 bg-background/25" />
              </div>
              <div className="flex items-center justify-center gap-3 rounded-lg bg-background px-4 py-3 text-foreground">
                <CircleUserRound aria-hidden="true" className="size-5" />
                <ArrowRight aria-hidden="true" className="size-4" />
                <ArrowRight aria-hidden="true" className="size-4 rotate-180" />
                <CircleUserRound aria-hidden="true" className="size-5" />
                <span className="ml-2 text-sm font-semibold">Connected</span>
              </div>
            </div>
          </div>
        </section>

        <section id="agent-context" className="scroll-mt-8 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
            <SectionHeading
              eyebrow="Agent-readable context"
              title="A profile can be an interface, not just a webpage."
              description="Each profile in the prototype exposes its own MCP endpoint. The endpoint identifies the requester, checks the relationship, calls the central resolver, and returns authorized structured context."
            />
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                {[
                  [Bot, "AI agent"],
                  [Network, "Profile MCP"],
                  [ShieldCheck, "Context resolver"],
                ].map(([Icon, label], index) => {
                  const FlowIcon = Icon as typeof Bot;
                  return (
                    <div key={label as string} className="contents">
                      <div className="rounded-xl border bg-card p-5 text-center">
                        <FlowIcon aria-hidden="true" className="mx-auto size-6" />
                        <p className="mt-3 text-sm font-semibold">{label as string}</p>
                      </div>
                      {index < 2 ? (
                        <ArrowRight
                          aria-hidden="true"
                          className="mx-auto size-5 rotate-90 text-muted-foreground sm:rotate-0"
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <div className="overflow-hidden rounded-xl border bg-foreground text-background">
                <div className="flex items-center justify-between border-b border-background/20 px-4 py-3 text-xs text-background/60">
                  <span>Authorized response</span>
                  <span className="font-mono">application/json</span>
                </div>
                <pre className="overflow-x-auto p-5 text-sm leading-7"><code>{`{
  "profile": {},
  "accessLevel": "connection"
}`}</code></pre>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Anonymous agents receive public context. An identified accepted connection can
                receive connection-visible context. Private context remains unavailable. The current
                prototype uses simple bearer tokens—not production OAuth.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border/80 bg-card/50">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHeading
              eyebrow="The distinction"
              title="Identity verifies a person. Context defines what can be understood."
              description="Portable Context sits beside login providers and profile products. Its concern is the structured, permissioned context that follows identity—not replacing authentication itself."
            />
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-2">
              <div className="bg-background p-6 sm:p-8">
                <Badge variant="secondary">Traditional identity</Badge>
                <p className="mt-6 text-2xl font-semibold tracking-tight">“Who are you?”</p>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Establishes or verifies identity so a person can sign in and act as themselves.
                </p>
              </div>
              <div className="bg-background p-6 sm:p-8">
                <Badge>Portable context</Badge>
                <p className="mt-6 text-2xl font-semibold tracking-tight">
                  “Who are you, what will you expose, and what may an authorized agent understand?”
                </p>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Resolves structured personal context according to explicit visibility and relationships.
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-4xl text-sm leading-6 text-muted-foreground">
              It is not a social network, Google login replacement, professional-profile clone,
              password manager, or a store-everything system for unrestricted AI access.
            </p>
          </div>
        </section>

        <section id="prototype" className="scroll-mt-8 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="Prototype boundaries"
            title="The core model works. Production trust requires more."
            description="The prototype is deliberately narrow: it demonstrates the access model end to end without presenting its current authentication and infrastructure as production-ready."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card className="shadow-none">
              <CardHeader>
                <Badge variant="secondary">Implemented</Badge>
                <CardTitle className="mt-3 text-xl">What the prototype proves</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {prototypeCapabilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-none">
              <CardHeader>
                <Badge variant="outline">Before production</Badge>
                <CardTitle className="mt-3 text-xl">What still has to be built</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {productionRequirements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6">
                      <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t border-border/80">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-20 sm:px-6 sm:py-24 lg:flex-row lg:items-end lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                See the system
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                Want a walkthrough of the working prototype?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Review the profile model, visibility controls, connection handshake, central resolver,
                and web/API/MCP outputs together.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button asChild size="lg">
                <Link href="/hire-ap">
                  Request a walkthrough
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/">Meet the builder</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
