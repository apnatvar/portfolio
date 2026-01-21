"use client";

import * as React from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  User,
  Menu as MenuIcon,
  X as XIcon,
  Share2,
  BriefcaseBusiness,
  Contact,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);

    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return coarse;
}

async function shareTo(url: string) {
  await navigator.clipboard.writeText(url);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function FloatingOrbitalMenu() {
  const isCoarse = useCoarsePointer();
  const [open, setOpen] = React.useState(false);

  // Mock/dynamic data (replace with your own)
  const items = React.useMemo<MenuItem[]>(
    () => [
      {
        id: "summary",
        label: "Summary",
        icon: <User className="h-4 w-4" />,
        href: "#summary",
      },
      {
        id: "work",
        label: "Projects",
        icon: <BriefcaseBusiness className="h-4 w-4" />,
        href: "#work",
      },
      {
        id: "contact",
        label: "Contact Me",
        icon: <Contact className="h-4 w-4" />,
        href: "#contactme",
      },
      {
        id: "share",
        label: "Share",
        icon: <Share2 className="h-4 w-4" />,
        onClick: () => shareTo("https://apnatva.vercel.app/visual"),
      },
      {
        id: "home",
        label: "Home",
        icon: <Home className="h-4 w-4" />,
        href: "/visual",
      },
    ],
    [],
  );

  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);

  const count = items.length;

  React.useEffect(() => {
    // Reset refs length on item count changes
    itemRefs.current = itemRefs.current.slice(0, count);
  }, [count]);

  React.useEffect(() => {
    // Kill previous timeline
    tlRef.current?.kill();
    tlRef.current = null;

    const nodes = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!nodes.length) return;

    // Orbit radius adapts to number of items, but stays compact in the corner
    const radius = clamp(72 + count * 10, 76, 160);

    // Keep orbit inside the viewport corner: distribute in an upper-left quadrant arc.
    // Angles chosen so x < 0 and y < 0 relative to the main button.
    const startDeg = 200;
    const endDeg = 260;

    // Prepare initial state
    gsap.set(nodes, {
      x: 0,
      y: 0,
      scale: 0.9,
      opacity: 0,
      pointerEvents: "none",
    });

    const tl = gsap.timeline({ paused: true });

    nodes.forEach((el, i) => {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const ang = degToRad(startDeg + (endDeg - startDeg) * t);

      const x = Math.cos(ang) * radius; // negative-ish
      const y = Math.sin(ang) * radius; // negative-ish (up)

      tl.to(
        el,
        {
          x,
          y,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
          pointerEvents: "auto",
        },
        0 + i * 0.04,
      );
    });

    // Close animation (reverse back to origin)
    tl.to(
      nodes,
      {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.92,
        duration: 0.28,
        ease: "power2.in",
        stagger: { each: 0.03, from: "end" },
        pointerEvents: "none",
      },
      "+=0.02",
    );

    tlRef.current = tl;

    if (open) {
      // play only the "open" portion (first half)
      tl.pause(0);
      tl.tweenTo(tl.duration() / 2, { ease: "none" });
    } else {
      // if closed, ensure everything is at rest
      tl.pause(0);
    }
  }, [open, count]);

  React.useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (open) {
      tl.pause(0);
      tl.tweenTo(tl.duration() / 2, { ease: "none" });
    } else {
      // If currently open, run the second half (close)
      const half = tl.duration() / 2;
      tl.pause(half);
      tl.play();
    }
  }, [open]);

  // Escape closes
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-background/85 backdrop-blur-3xl"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <div className="absolute bottom-0 right-0">
            {items.map((item, idx) => {
              const content = (
                <Button
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="group absolute bottom-0 right-0 text-green-600 h-12 w-12 rounded-full border border-amber-400 bg-background/85 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70 hover:shadow-[0_0_26px_rgba(255,255,255,0.18)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={item.label}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setOpen(false);
                  }}
                >
                  {item.icon}

                  <span className="pointer-events-none absolute right-12 -top-5">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "whitespace-nowrap",
                        isCoarse
                          ? "opacity-100"
                          : "opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </Badge>
                  </span>
                </Button>
              );

              if (item.href) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-label={item.label}
                    prefetch
                  >
                    {content}
                  </Link>
                );
              }

              return <React.Fragment key={item.id}>{content}</React.Fragment>;
            })}
          </div>

          <Button
            type="button"
            variant="default"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="floating-orbital-menu"
            className={cn(
              "relative h-14 w-14 rounded-full bg-background",
              "shadow-md text-green-600 border border-amber-400",
              "transition-[box-shadow,transform] duration-200",
              "hover:shadow-[0_0_34px_rgba(255,255,255,0.25)] hover:text-background hover:border-green-600",
              "active:scale-[0.98]",
            )}
          >
            <MenuIcon
              className={cn(
                "absolute inset-0 m-auto h-8 w-8 transition-all duration-200",
                open
                  ? "scale-90 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100",
              )}
            />
            <XIcon
              className={cn(
                "absolute inset-0 m-auto h-8 w-8 transition-all duration-200",
                open
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-90 -rotate-90 opacity-0",
              )}
            />
          </Button>

          {/* Screen-reader region id (matches aria-controls) */}
          <div id="floating-orbital-menu" className="sr-only" />
        </div>
      </div>
    </>
  );
}
