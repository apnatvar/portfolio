"use client";

import { OverviewCanvas } from "@/components/new-ui/overview-canvas";
import { SectionReader } from "@/components/new-ui/section-reader";
import { Badge } from "@/components/ui/badge";
import {
  portfolioSections,
  type PortfolioSection,
} from "@/data/new-ui-sections";
import { useMemo, useState } from "react";

type ViewMode = "overview" | "expanded";

type SpatialNavigationShellProps = {
  sections: PortfolioSection[];
};

export default function SpatialNavigation({
  sections = portfolioSections,
}: SpatialNavigationShellProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [hasAutoCollapsed, setHasAutoCollapsed] = useState(false);

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeSectionId) ?? null,
    [activeSectionId, sections],
  );

  const openSection = (sectionId: string) => {
    const index = sections.findIndex((section) => section.id === sectionId);
    if (index < 0) return;

    setFocusedIndex(index);
    setActiveSectionId(sectionId);
    setViewMode("expanded");
    setIsReading(true);
    setHasAutoCollapsed(false);
  };

  const closeSection = () => {
    setViewMode("overview");
    setIsReading(false);
    setHasAutoCollapsed(false);
  };

  const handleAutoCollapse = () => {
    if (hasAutoCollapsed) return;
    setHasAutoCollapsed(true);
    window.setTimeout(() => {
      closeSection();
    }, 120);
  };

  return (
    <div className="md:hidden min-h-full bg-background text-foreground">
      <main className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-6 px-3 py-3 md:px-6 md:py-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background px-4 py-6 md:px-6 md:py-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--secondary))_0%,transparent_42%,hsl(var(--muted))_100%)] opacity-40" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="border-primary/30 bg-background/60 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                New UI / Section Navigation System
              </Badge>
              <div className="space-y-3">
                <h1 className="max-w-4xl font-unbounded text-4xl leading-[1.05] text-foreground md:text-6xl">
                  The website becomes a field of draggable section containers.
                </h1>
                <p className="max-w-3xl font-space-grotestk text-sm leading-6 text-muted-foreground md:text-[15px]">
                  Overview and reading mode are separate, explicit states. On
                  phones the system is linear and adjacent. On desktop the whole
                  field stays visible and draggable before a section expands
                  into immersive reading.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="rounded-full bg-secondary/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em]"
              >
                overview/collapsed
              </Badge>
              <Badge
                variant="secondary"
                className="rounded-full bg-secondary/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em]"
              >
                active/expanded
              </Badge>
              <Badge
                variant="secondary"
                className="rounded-full bg-secondary/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em]"
              >
                focused index
              </Badge>
              <Badge
                variant="secondary"
                className="rounded-full bg-secondary/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em]"
              >
                auto-collapse
              </Badge>
            </div>
          </div>
        </section>

        <OverviewCanvas
          sections={sections}
          focusedIndex={focusedIndex}
          activeSectionId={activeSectionId}
          isReading={isReading}
          onFocusIndex={setFocusedIndex}
          onOpenSection={openSection}
        />

        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-border/70 bg-card/70 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Current state
            </p>
            <p className="mt-3 font-unbounded text-2xl text-foreground">
              {viewMode}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-card/70 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Focused section
            </p>
            <p className="mt-3 font-unbounded text-2xl text-foreground">
              {String(focusedIndex + 1).padStart(2, "0")}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-card/70 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Auto collapse
            </p>
            <p className="mt-3 font-unbounded text-2xl text-foreground">
              {hasAutoCollapsed ? "triggered" : "armed"}
            </p>
          </div>
        </section>

        <SectionReader
          section={activeSection}
          isOpen={viewMode === "expanded"}
          hasAutoCollapsed={hasAutoCollapsed}
          onClose={closeSection}
          onAutoCollapse={handleAutoCollapse}
        />
      </main>
    </div>
  );
}
