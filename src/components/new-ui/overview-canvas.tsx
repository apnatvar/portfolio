"use client";

import { SectionCard } from "@/components/new-ui/section-card";
import { Button } from "@/components/ui/button";
import type { PortfolioSection } from "@/data/new-ui-sections";
import { useOverviewDrag } from "@/hooks/use-overview-drag";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Grip, MousePointer2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type OverviewCanvasProps = {
  sections: PortfolioSection[];
  focusedIndex: number;
  activeSectionId: string | null;
  isReading: boolean;
  onFocusIndex: (index: number) => void;
  onOpenSection: (sectionId: string) => void;
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function OverviewCanvas({
  sections,
  focusedIndex,
  activeSectionId,
  isReading,
  onFocusIndex,
  onOpenSection,
}: OverviewCanvasProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const isDesktop = useIsDesktop();

  const cards = useMemo(
    () =>
      sections.map((section) => ({
        x: section.desktopPosition.x,
        y: section.desktopPosition.y,
        width: section.desktopPosition.width,
        height: section.desktopPosition.height,
      })),
    [sections],
  );

  const { bind, centerOnIndex, dragMovedRef, fieldSize, isDragging } =
    useOverviewDrag({
      enabled: isDesktop && !isReading,
      viewportRef,
      trackRef,
      cards,
      focusedIndex,
    });

  const canGoPrev = focusedIndex > 0;
  const canGoNext = focusedIndex < sections.length - 1;

  const moveFocus = (nextIndex: number) => {
    onFocusIndex(nextIndex);
    if (isDesktop) {
      centerOnIndex(nextIndex);
    }
  };

  const handleMobileTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isDesktop || isReading) return;
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleMobileTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isDesktop || isReading || touchStartRef.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartRef.current;
    const deltaX = endX - touchStartRef.current;
    touchStartRef.current = null;

    if (Math.abs(deltaX) < 48) return;

    if (deltaX < 0 && canGoNext) moveFocus(focusedIndex + 1);
    if (deltaX > 0 && canGoPrev) moveFocus(focusedIndex - 1);
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/80 shadow-[0_30px_100px_-70px_hsl(var(--foreground)/0.95)] backdrop-blur-xl",
        isReading && "pointer-events-none opacity-35",
      )}
      aria-label="Section overview navigation"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--muted))_0%,transparent_55%)]" />

      <div className="relative border-b border-border/70 px-4 py-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Spatial navigation overview
            </p>
            <div className="space-y-2">
              <h1 className="max-w-3xl font-unbounded text-3xl leading-tight text-foreground md:text-5xl">
                Draggable section containers replace traditional page navigation.
              </h1>
              <p className="max-w-2xl font-space-grotestk text-sm leading-6 text-muted-foreground md:text-[15px]">
                Each card is a destination. Enter one to read it in full-screen
                mode, then return automatically to the overview when you finish.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="rounded-full border border-border/70 bg-secondary/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {isDesktop ? (
                <span className="inline-flex items-center gap-2">
                  <Grip className="size-3.5" />
                  Drag field on desktop
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <MousePointer2 className="size-3.5" />
                  Adjacent only on mobile
                </span>
              )}
            </div>
            {activeSectionId ? (
              <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                Last opened:{" "}
                {sections.findIndex((section) => section.id === activeSectionId) +
                  1}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {isDesktop ? (
        <div
          ref={viewportRef}
          className={cn(
            "relative h-[68svh] min-h-[560px] overflow-hidden select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          style={{ touchAction: "none" }}
          onDragStart={(event) => event.preventDefault()}
          {...bind}
        >
          <nav
            ref={trackRef}
            className="absolute left-0 top-0 select-none"
            aria-label="Desktop section field"
            style={{
              width: fieldSize.width,
              height: fieldSize.height,
            }}
          >
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="absolute"
                style={{
                  left: section.desktopPosition.x,
                  top: section.desktopPosition.y,
                  width: section.desktopPosition.width,
                  height: section.desktopPosition.height,
                }}
              >
                <SectionCard
                  section={section}
                  index={index}
                  isDesktop
                  isFocused={focusedIndex === index}
                  isDimmed={focusedIndex !== index && !isReading}
                  onFocus={() => moveFocus(index)}
                  onOpen={() => {
                    if (dragMovedRef.current || isDragging) return;
                    moveFocus(index);
                    onOpenSection(section.id);
                  }}
                />
              </div>
            ))}
          </nav>
        </div>
      ) : (
        <div
          ref={viewportRef}
          className="relative px-3 pb-4 pt-4"
          onTouchStart={handleMobileTouchStart}
          onTouchEnd={handleMobileTouchEnd}
        >
          <nav aria-label="Mobile section navigator">
            <SectionCard
              section={sections[focusedIndex]}
              index={focusedIndex}
              isDesktop={false}
              isFocused
              isDimmed={false}
              onFocus={() => undefined}
              onOpen={() => onOpenSection(sections[focusedIndex].id)}
            />
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => canGoPrev && moveFocus(focusedIndex - 1)}
              disabled={!canGoPrev}
              aria-label="Previous section"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {String(focusedIndex + 1).padStart(2, "0")} /{" "}
              {String(sections.length).padStart(2, "0")}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => canGoNext && moveFocus(focusedIndex + 1)}
              disabled={!canGoNext}
              aria-label="Next section"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
