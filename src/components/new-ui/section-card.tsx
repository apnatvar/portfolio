"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { PortfolioSection } from "@/data/new-ui-sections";
import { cn } from "@/lib/utils";
import { ArrowUpRight, MoveDiagonal2 } from "lucide-react";

type SectionCardProps = {
  section: PortfolioSection;
  index: number;
  isFocused: boolean;
  isDimmed: boolean;
  isDesktop: boolean;
  onOpen: () => void;
  onFocus: () => void;
};

export function SectionCard({
  section,
  index,
  isFocused,
  isDimmed,
  isDesktop,
  onOpen,
  onFocus,
}: SectionCardProps) {
  return (
    <Card
      className={cn(
        "group relative h-full overflow-hidden border-border/70 bg-card/80 p-0 backdrop-blur-md transition-[transform,opacity,box-shadow,border-color] duration-300",
        "shadow-[0_18px_55px_-32px_hsl(var(--foreground)/0.45)]",
        "focus-within:border-primary/60",
        isFocused &&
          "border-primary/60 shadow-[0_28px_80px_-36px_hsl(var(--foreground)/0.55)]",
        isDimmed && "opacity-45",
        isDesktop && "hover:-translate-y-1 hover:border-primary/40",
      )}
      style={
        isDesktop
          ? {
              transform: `rotate(${section.desktopPosition.rotate}deg)`,
            }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--muted))_0%,transparent_55%)] opacity-70" />
      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="border-primary/30 bg-background/60 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                {section.eyebrow}
              </Badge>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  Section {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-unbounded text-xl leading-tight text-foreground md:text-2xl">
                  {section.title}
                </h2>
              </div>
            </div>
            <MoveDiagonal2 className="mt-1 size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
          </div>

          <p className="max-w-sm font-space-grotestk text-sm leading-6 text-muted-foreground md:text-[15px]">
            {section.summary}
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {section.metrics.map((metric) => (
              <Badge
                key={metric}
                variant="secondary"
                className="rounded-full bg-secondary/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-foreground"
              >
                {metric}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant={isFocused ? "default" : "secondary"}
              size="sm"
              className="rounded-full px-4 font-mono uppercase tracking-[0.16em]"
              onClick={onOpen}
            >
              Enter Section
              <ArrowUpRight className="size-4" />
            </Button>
            <button
              type="button"
              className="rounded-full border border-border/70 px-3 py-2 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground outline-none transition hover:border-primary/40 hover:text-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/60"
              onClick={onFocus}
            >
              Focus
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
