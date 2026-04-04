"use client";

import { SectionBlocks } from "@/components/new-ui/section-blocks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PortfolioSection } from "@/data/new-ui-sections";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useSectionAutoCollapse } from "@/hooks/use-section-auto-collapse";
import { cn } from "@/lib/utils";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type SectionReaderProps = {
  section: PortfolioSection | null;
  isOpen: boolean;
  hasAutoCollapsed: boolean;
  onClose: () => void;
  onAutoCollapse: () => void;
};

export function SectionReader({
  section,
  isOpen,
  hasAutoCollapsed,
  onClose,
  onAutoCollapse,
}: SectionReaderProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useBodyScrollLock(isOpen);

  useSectionAutoCollapse({
    enabled: isOpen,
    rootRef: scrollerRef,
    sentinelRef,
    hasTriggered: hasAutoCollapsed,
    onTrigger: onAutoCollapse,
  });

  useEffect(() => {
    if (!panelRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
      );
    }
  }, [isOpen, section?.id]);

  useEffect(() => {
    if (!isOpen || !scrollerRef.current) return;
    scrollerRef.current.scrollTo({ top: 0, behavior: "auto" });
  }, [isOpen, section?.id]);

  if (!section) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-background/88 backdrop-blur-xl" />

      <div
        ref={panelRef}
        className="relative mx-auto flex h-full max-w-7xl flex-col px-3 py-3 md:px-6 md:py-5"
      >
        <header className="sticky top-0 z-10 mb-3 rounded-[1.75rem] border border-border/70 bg-background/90 p-3 backdrop-blur-xl md:p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="border-primary/30 bg-background/60 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                {section.eyebrow}
              </Badge>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Reading mode
                </p>
                <h2 className="mt-2 font-unbounded text-2xl text-foreground md:text-4xl">
                  {section.title}
                </h2>
                <p className="mt-3 max-w-3xl font-space-grotestk text-sm leading-6 text-muted-foreground md:text-[15px]">
                  {section.kicker}
                </p>
              </div>
            </div>

            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label={`Close ${section.title}`}
              className="shrink-0 rounded-full border border-border/70 bg-background/80"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
        </header>

        <article
          ref={scrollerRef}
          className="min-h-0 flex-1 overflow-y-auto rounded-[2rem] border border-border/70 bg-background/75 px-4 pb-24 pt-4 shadow-[0_28px_100px_-60px_hsl(var(--foreground)/0.65)] backdrop-blur-sm md:px-8 md:pt-8"
        >
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-dashed border-border/70 px-4 py-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Scroll to the end to collapse back into overview.
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full font-mono uppercase tracking-[0.16em]"
                onClick={onClose}
              >
                <ArrowLeft className="size-4" />
                Return
              </Button>
            </div>

            <SectionBlocks section={section} />

            <div
              ref={sentinelRef}
              className="flex h-20 items-end justify-center rounded-[1.25rem] border border-dashed border-border/70 bg-secondary/20 px-4 py-3"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                End reached. Returning to overview.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
