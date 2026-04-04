"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  FactCard,
  GalleryImage,
  LinkItem,
  MetricItem,
  PlanItem,
  PortfolioSection,
  ProcessStep,
  ProjectItem,
  SectionBlock,
  SkillItem,
  SocialItem,
} from "@/data/new-ui-sections";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ExternalLink({ item }: { item: LinkItem }) {
  return (
    <Link
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer noopener" : undefined}
      className="inline-flex items-center gap-1 underline decoration-primary/50 underline-offset-4 transition hover:text-foreground"
    >
      {item.label}
      {item.external ? <ArrowUpRight className="size-3.5" /> : null}
    </Link>
  );
}

function FactCardsBlock({ cards }: { cards: FactCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((card) => (
        <Card
          key={`${card.title}-${card.label}`}
          className="border-border/70 bg-card/75 backdrop-blur-sm"
        >
          <CardHeader className="gap-3">
            <div className="flex items-center justify-between gap-3">
              <Badge
                variant="outline"
                className="border-primary/30 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                {card.label}
              </Badge>
              <Link
                href={card.href}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-border/70 p-2 text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                aria-label={`Open ${card.label}`}
              >
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <CardTitle className="font-unbounded text-xl text-foreground">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap font-space-grotestk text-sm leading-7 text-muted-foreground">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProcessBlock({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <Card
          key={step.stepLabel}
          className="border-border/70 bg-card/70 backdrop-blur-sm"
        >
          <CardHeader className="gap-2">
            <Badge
              variant="outline"
              className="w-fit border-primary/30 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {step.stepLabel}
            </Badge>
            <CardTitle className="font-unbounded text-lg text-foreground">
              {step.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 font-space-grotestk text-sm leading-6 text-muted-foreground">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 size-1.5 rounded-full bg-primary/70" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SkillsBlock({
  heading,
  intro,
  skills,
  tools,
}: {
  heading: string;
  intro: string[];
  skills: SkillItem[];
  tools: LinkItem[];
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-unbounded text-2xl text-foreground">{heading}</h3>
        {intro.map((paragraph) => (
          <p
            key={paragraph}
            className="font-space-grotestk text-[15px] leading-7 text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="rounded-2xl border border-border/70 bg-secondary/35 px-4 py-3 font-mono text-sm uppercase tracking-[0.16em] text-secondary-foreground"
          >
            {skill.name}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
        <p className="font-space-grotestk text-sm text-muted-foreground">
          Some additional tools that I rely on{" "}
          {tools.map((tool, index) => (
            <span key={tool.label}>
              <ExternalLink item={tool} />
              {index < tools.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function ProjectsBlock({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="grid gap-4">
      {projects.map((project, index) => (
        <Card
          key={`${project.title}-${index}`}
          className="border-border/70 bg-card/70 backdrop-blur-sm"
        >
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Project {String(index + 1).padStart(2, "0")}
                </p>
                <CardTitle className="font-unbounded text-lg text-foreground">
                  {project.title}
                </CardTitle>
              </div>
              {project.unavailable ? (
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                >
                  Proprietary Code
                </Badge>
              ) : (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-border/70 p-2 text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                  aria-label={`Open ${project.title}`}
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <Badge
                  key={tool}
                  variant="outline"
                  className="border-primary/20 bg-background/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                >
                  {tool}
                </Badge>
              ))}
            </div>
            <p className="font-space-grotestk text-sm leading-7 text-muted-foreground">
              {project.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PlansBlock({ plans }: { plans: PlanItem[] }) {
  return (
    <div className="space-y-6">
      {plans.map((plan, index) => (
        <article
          key={`${plan.title}-${index}`}
          className="grid gap-4 rounded-[2rem] border border-border/70 bg-card/70 p-4 backdrop-blur-sm md:grid-cols-[1.15fr_0.85fr] md:p-5"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Track {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-unbounded text-xl text-foreground">
                {plan.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {plan.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/20 bg-background/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="font-space-grotestk text-sm leading-7 text-muted-foreground">
              {plan.description}
            </p>
          </div>
          <Link
            href={plan.image.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative min-h-64 overflow-hidden rounded-[1.5rem] border border-border/70"
          >
            <Image
              src={plan.image.src}
              alt={plan.image.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </Link>
        </article>
      ))}
    </div>
  );
}

function MetricsBlock({
  body,
  links,
  metrics,
}: {
  body: string;
  links: LinkItem[];
  metrics: MetricItem[];
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-border/70 bg-card/70 p-5">
        <p className="font-space-grotestk text-[15px] leading-7 text-muted-foreground">
          {body}
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          {links.map((link) => (
            <ExternalLink key={link.label} item={link} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[1.5rem] border border-border/70 bg-secondary/35 p-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {metric.label}
            </p>
            <p className="mt-3 font-unbounded text-3xl text-foreground">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryBlock({
  body,
  images,
}: {
  body: string;
  images: GalleryImage[];
}) {
  return (
    <div className="space-y-6">
      <p className="font-space-grotestk text-[15px] leading-7 text-muted-foreground">
        {body}
      </p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {images.map((image, index) => (
          <Link
            key={`${image.src}-${index}`}
            href={image.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative aspect-[0.88] overflow-hidden rounded-[1.5rem] border border-border/70"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function SocialBlock({
  body,
  socials,
  footer,
}: {
  body: string;
  socials: SocialItem[];
  footer: string;
}) {
  return (
    <div className="space-y-6">
      <p className="font-space-grotestk text-[15px] leading-7 text-muted-foreground">
        {body}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {socials.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-between rounded-[1.25rem] border border-border/70 bg-card/70 px-4 py-4 font-space-grotestk text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            <span>{social.label}</span>
            <ArrowUpRight className="size-4" />
          </Link>
        ))}
      </div>
      <div className="rounded-[1.25rem] border border-dashed border-border/70 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {footer}
      </div>
    </div>
  );
}

function IntroBlock({
  block,
}: {
  block: Extract<SectionBlock, { type: "intro" }>;
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-3">
          {block.nameNative.map((line) => (
            <p
              key={line}
              className="font-amita text-5xl leading-none tracking-[0.12em] text-foreground md:text-7xl"
            >
              {line}
            </p>
          ))}
        </div>
        <div className="space-y-4 rounded-[1.75rem] border border-border/70 bg-card/70 p-5">
          <div>
            <p className="font-unbounded text-4xl text-foreground md:text-5xl">
              {block.nameRomanized}
            </p>
            <p className="mt-3 font-space-grotestk text-lg italic text-muted-foreground">
              {block.pronunciation}
            </p>
          </div>
          <div className="space-y-2">
            {block.meanings.map((meaning) => (
              <p
                key={meaning}
                className="font-space-grotestk text-base leading-7 text-muted-foreground"
              >
                {meaning}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border/70 bg-card/70 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Focus map
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {block.focusWords.map((word) => (
            <Badge
              key={word}
              variant="secondary"
              className="rounded-full bg-secondary/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
            >
              {word}
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-[1.25rem] border border-dashed border-border/70 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {block.footer}
      </div>
    </div>
  );
}

export function SectionBlocks({ section }: { section: PortfolioSection }) {
  return (
    <div className="space-y-6">
      {section.blocks.map((block, index) => {
        switch (block.type) {
          case "intro":
            return <IntroBlock key={`${block.type}-${index}`} block={block} />;
          case "fact-cards":
            return (
              <FactCardsBlock key={`${block.type}-${index}`} cards={block.cards} />
            );
          case "process":
            return <ProcessBlock key={`${block.type}-${index}`} steps={block.steps} />;
          case "skills":
            return (
              <SkillsBlock
                key={`${block.type}-${index}`}
                heading={block.heading}
                intro={block.intro}
                skills={block.skills}
                tools={block.tools}
              />
            );
          case "projects":
            return (
              <ProjectsBlock
                key={`${block.type}-${index}`}
                projects={block.projects}
              />
            );
          case "plans":
            return <PlansBlock key={`${block.type}-${index}`} plans={block.plans} />;
          case "metrics":
            return (
              <MetricsBlock
                key={`${block.type}-${index}`}
                body={block.body}
                links={block.links}
                metrics={block.metrics}
              />
            );
          case "gallery":
            return (
              <GalleryBlock
                key={`${block.type}-${index}`}
                body={block.body}
                images={block.images}
              />
            );
          case "social":
            return (
              <SocialBlock
                key={`${block.type}-${index}`}
                body={block.body}
                socials={block.socials}
                footer={block.footer}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
