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
  Globe2,
  Handshake,
  KeyRound,
  LockKeyhole,
  Plug,
  Search,
  ShieldCheck,
  UserRoundCheck,
  Vault,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portable Context — Maintain Your Context Once",
  description:
    "A reusable, user-controlled context profile with public, connected, and private layers for people and their agents.",
  alternates: {
    canonical: "/portable-context",
  },
  openGraph: {
    type: "website",
    url: "/portable-context",
    title: "Portable Context — Maintain Your Context Once",
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
    copy: "People, applications, and agents consume the same authorized representation through web, API, or MCP.",
  },
] as const;

const visibilityLevels = [
  {
    icon: Eye,
    level: "Public",
    audience: "Discoverable by anyone",
    copy: "Intentionally public identity, interests, capabilities, goals, and open-to-connect status. Visible on profiles and searchable through the platform MCP.",
  },
  {
    icon: UserRoundCheck,
    level: "Connected",
    audience: "Approved relationships",
    copy: "Richer personal context shared with mutually approved people and agents acting on their behalf. The database currently names this level `connections`.",
  },
  {
    icon: LockKeyhole,
    level: "Private",
    audience: "Owner only",
    copy: "A holding space for context the owner may share later. Never exposed merely because someone is connected.",
  },
] as const;

const prototypeCapabilities = [
  "Data-rich fictional Alpha, Beta, and Gamma profiles",
  "Public, connected, and private data on every profile",
  "Accepted Alpha–Gamma and pending Beta→Alpha relationships",
  "Public web profiles and a normalized context API",
  "Per-profile MCP servers at /profile/{username}/mcp",
  "Public discovery MCP at /platform/mcp",
  "One visibility resolver across web, API, and MCP",
  "Boundary test canaries and development bearer tokens",
] as const;

const productionRequirements = [
  "OAuth 2.1 authorization-code flow with PKCE",
  "Granular scopes and clear consent screens",
  "Encrypted per-user credential storage",
  "Short-lived, audience-bound access tokens",
  "Expiration, rotation, and reliable revocation",
  "Audit history and stronger sensitive-data controls",
  "Export, portability, and production infrastructure",
  "Independent security and privacy review",
] as const;

const agentFlow = [
  { icon: CircleUserRound, label: "Human consent", detail: "Login + approve scopes" },
  { icon: Plug, label: "Secure connector", detail: "Credentials stay in host" },
  { icon: ShieldCheck, label: "Context resolver", detail: "Identity + scope + relationship" },
  { icon: Bot, label: "Agent result", detail: "Filtered context only" },
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
          </nav>
        </div>
      </header>

      <div>
        <section className="border-b border-border/80">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-32">
            <div>
              <Badge variant="outline">Functional prototype</Badge>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                One profile for every agent. You decide what each relationship can understand.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Portable Context is a user-controlled context layer for people and their agents.
                Make information public for discovery, share richer context with approved
                connections, and keep the rest truly private.
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

            <div
              className="border bg-card p-4 shadow-sm transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-md sm:p-6"
              aria-label="Public, connected, and private context layers"
            >
              <div className="border border-primary bg-primary/5 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Globe2 aria-hidden="true" className="size-5 text-primary" />
                    <p className="font-semibold">Public</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">discoverable</span>
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
                    <span className="font-mono text-xs text-muted-foreground">approved people</span>
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
                      <span className="font-mono text-xs text-background/60">owner only</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-background/70">
                      Held until the owner decides otherwise
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium">
                Public for discovery. Connected for people you trust. Private until you decide
                otherwise.
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
                "SaaS applications",
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
                  <Card className={`h-full ${interactiveCardClass}`}>
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
                  <p className="text-sm leading-6 text-muted-foreground">{item.copy}</p>
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
                description="The platform-wide MCP searches public profiles and capabilities across the network. It never widens its boundary for an authenticated requester: connected and private information cannot appear in discovery results."
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
                  Platform discovery MCP
                </span>
                <code>/platform/mcp</code>
              </div>
              <div className="space-y-3 p-5 font-mono text-sm">
                {[
                  "search_public_profiles",
                  "count_public_profiles",
                  "get_public_profile",
                ].map((tool) => (
                  <div key={tool} className="border border-background/25 px-3 py-2.5">
                    {tool}
                  </div>
                ))}
              </div>
              <p className="border-t border-background/20 px-5 py-4 text-sm leading-6 text-background/65">
                Authorization does not expand search beyond intentionally public context.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border/80 bg-foreground text-background">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
                The handshake
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Alpha and Gamma share more because both conditions are true.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-background/70 sm:text-lg">
                Gamma&apos;s agent authenticates as Gamma and requests Alpha&apos;s profile. Portable
                Context confirms both the granted permission and the accepted Alpha–Gamma
                relationship before returning Alpha&apos;s public and connected layers.
              </p>
              <p className="mt-5 text-sm text-background/60">
                Alpha&apos;s private layer is available only to an agent explicitly authorized as
                Alpha.
              </p>
            </div>
            <div className="border border-background/25 p-5 sm:p-8">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                <div className="border border-background/25 p-4 transition-colors duration-200 hover:bg-background/10">
                  <CircleUserRound aria-hidden="true" className="mx-auto size-7" />
                  <p className="mt-2 font-semibold">Alpha</p>
                </div>
                <div className="text-xs text-background/60">
                  accepted
                  <ArrowRight aria-hidden="true" className="mx-auto mt-1 size-5" />
                </div>
                <div className="border border-background/25 p-4 transition-colors duration-200 hover:bg-background/10">
                  <CircleUserRound aria-hidden="true" className="mx-auto size-7" />
                  <p className="mt-2 font-semibold">Gamma</p>
                </div>
              </div>
              <div className="my-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="border border-background/25 p-3 text-center text-xs">
                  OAuth scope to read connected profiles
                </div>
                <span className="text-center text-xl text-background/60">+</span>
                <div className="border border-background/25 p-3 text-center text-xs">
                  Accepted Alpha–Gamma relationship
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 bg-background px-4 py-3 text-center text-foreground">
                <ShieldCheck aria-hidden="true" className="size-5 shrink-0" />
                <span className="text-sm font-semibold">
                  Gamma&apos;s agent receives Alpha&apos;s public + connected context
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="agent-context" className="scroll-mt-8 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="Built for agents"
            title="The agent sees useful context—not the credential that unlocks it."
            description="In normal use, a person adds Portable Context as a connector in their preferred agent host. Login, consent, and OAuth happen in a secure browser flow outside the model conversation. The host stores credentials and silently authorizes later tool calls."
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
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</p>
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
                  <div className="flex items-center gap-3">
                    <Vault aria-hidden="true" className="size-6" />
                    <h3 className="text-xl font-semibold">Inside the secure host</h3>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-background/70">
                    <li>OAuth authorization-code flow with PKCE</li>
                    <li>Refresh credentials in an encrypted vault or OS keychain</li>
                    <li>Short-lived access token attached silently to tool calls</li>
                  </ul>
                </div>
                <div className="bg-background p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <KeyRound aria-hidden="true" className="size-6 text-primary" />
                    <h3 className="text-xl font-semibold">Inside the model conversation</h3>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li>Authorized profile information returned by tools</li>
                    <li>No passwords, authorization codes, access tokens, or refresh tokens</li>
                    <li>No manual token copying during normal use</li>
                  </ul>
                </div>
              </div>
              <p className="max-w-4xl text-sm leading-6 text-muted-foreground">
                An <code>.env</code> file is a development analogy, not a production credential
                strategy. Production credentials belong in an encrypted, per-user credential store.
                Portable Context then checks requester identity, granted scope, and relationship
                before returning only the permitted layer.
              </p>
          </div>
        </section>

        <section className="border-y border-border/80 bg-card/50">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionHeading
              eyebrow="One security boundary"
              title="The same resolver protects every interface."
              description="The public webpage, normalized JSON API, and per-profile MCP all ask one centralized resolver what the requester may receive. Interface code does not get to invent its own visibility rules."
            />
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-2">
              <div className="bg-background p-6 transition-colors duration-200 hover:bg-secondary sm:p-8">
                <Badge variant="secondary">Interfaces</Badge>
                <p className="mt-6 font-mono text-sm">/profile/{`{username}`}/mcp</p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                  <li>Public web profile</li>
                  <li>Normalized context API</li>
                  <li>Read-only, per-profile MCP tools</li>
                </ul>
              </div>
              <div className="bg-background p-6 transition-colors duration-200 hover:bg-secondary sm:p-8">
                <Badge>Resolved result</Badge>
                <ul className="mt-6 space-y-4 text-sm leading-6">
                  <li className="flex items-start justify-between gap-4 border-b pb-3">
                    <span>Anonymous or unrelated</span>
                    <span className="font-mono text-xs text-muted-foreground">public</span>
                  </li>
                  <li className="flex items-start justify-between gap-4 border-b pb-3">
                    <span>Accepted connection</span>
                    <span className="font-mono text-xs text-muted-foreground">public + connected</span>
                  </li>
                  <li className="flex items-start justify-between gap-4">
                    <span>Profile owner</span>
                    <span className="font-mono text-xs text-muted-foreground">all three layers</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-6 max-w-4xl text-sm leading-6 text-muted-foreground">
              Portable Context is not a password manager, cryptographic identity network, or fully
              decentralized identity protocol. It is a permissioned context layer that works beside
              identity and authentication systems.
            </p>
          </div>
        </section>

        <section id="prototype" className="scroll-mt-8 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="Prototype boundaries"
            title="A credible prototype with an explicit production boundary."
            description="The current system proves structured context, discovery, relationships, and visibility enforcement end to end. Its manually generated pcx_… bearer tokens exist for development and MCP Inspector testing—not as the intended customer experience."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card className={interactiveCardClass}>
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
            <Card className={interactiveCardClass}>
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
          <div className="mt-6 flex items-start gap-3 border border-primary bg-primary/5 p-4 text-sm leading-6">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <p>
              Production should replace prototype tokens with OAuth 2.1, PKCE, secure credential
              storage, granular scopes, consent, revocation, and audit history. None of those are
              presented here as already implemented.
            </p>
          </div>
        </section>

        <footer className="border-t-4 border-foreground bg-foreground text-background">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
                Portable Context / Prototype 01
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
                Maintain your context once. Decide who can understand what.
              </h2>
            </div>
            <div className="lg:text-right">
              <p className="mb-5 text-sm leading-6 text-background/65">
                Public for discovery. Connected for people you trust. Private until you decide
                otherwise.
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
