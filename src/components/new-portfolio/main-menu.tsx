"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type BoardItem = {
  key:
    | "github"
    | "linkedin"
    | "about"
    | "services"
    | "work"
    | "education"
    | "skills"
    | "blog"
    | "hire-me";
  title: string;
  href: string;
  phrase: string;
};

const BOARD_ITEMS: BoardItem[] = [
  { key: "github", title: "GitHub", href: "#", phrase: "Visit external site" },
  {
    key: "linkedin",
    title: "LinkedIn",
    href: "#",
    phrase: "Visit external site",
  },
  { key: "about", title: "About", href: "#", phrase: "Learn more" },
  {
    key: "services",
    title: "Services",
    href: "#",
    phrase: "See services and cost",
  },
  {
    key: "work",
    title: "Work",
    href: "#",
    phrase:
      "Experience and samples Experience and samples Experience and samples Experience and samples Experience and samples Experience and samples Experience and samples Experience and samples Experience and samples",
  },
  {
    key: "education",
    title: "Education",
    href: "#",
    phrase: "See more",
  },
  {
    key: "skills",
    title: "Skills",
    href: "#",
    phrase: "See all",
  },
  { key: "blog", title: "Blog", href: "#", phrase: "Visit external site" },
  { key: "hire-me", title: "Hire Me", href: "#", phrase: "Contact me" },
];

const ARCADE_COLORS = [
  "hsla(190, 95%, 60%, 0.88)",
  "hsla(280, 95%, 65%, 0.88)",
  "hsla(330, 95%, 65%, 0.86)",
  "hsla(45, 100%, 60%, 0.84)",
  "hsla(140, 85%, 55%, 0.84)",
  "oklch(0.22 0 0)",
];

function getCellBorderClasses(index: number) {
  const row = Math.floor(index / 3);
  const col = index % 3;

  return cn(
    "border-border",
    "border-b last:border-b-0",
    "md:border-b-0",
    row < 2 && "md:border-b",
    col < 2 && "md:border-r",
  );
}

function getRandomColor(exclude?: string) {
  const filtered = ARCADE_COLORS.filter((color) => color !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default function TicTacToeOverlayBoard() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const cellRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const gradientRefs = useRef<(HTMLDivElement | null)[]>([]);
  const colorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverLockRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const updateDesktopState = () => {
      setIsDesktop(media.matches);
    };

    updateDesktopState();
    media.addEventListener("change", updateDesktopState);

    return () => {
      media.removeEventListener("change", updateDesktopState);
    };
  }, []);

  useEffect(() => {
    const colorTweens: (gsap.core.Tween | gsap.core.Timeline)[] = [];
    const gradientTweens: (gsap.core.Tween | gsap.core.Timeline)[] = [];

    const runColorPulse = (element: HTMLDivElement) => {
      let currentColor = getRandomColor();

      gsap.set(element, {
        background: `radial-gradient(circle at 50% 50%, ${currentColor} 0%, transparent 68%)`,
        opacity: 0.08,
        scale: 1,
      });

      const pulse = () => {
        const nextColor = getRandomColor(currentColor);
        currentColor = nextColor;

        gsap.set(element, {
          background: `radial-gradient(circle at 50% 50%, ${currentColor} 0%, transparent 68%)`,
        });

        const tween = gsap.timeline({
          onComplete: () => {
            const delay = gsap.utils.random(1.8, 4.6);
            const delayed = gsap.delayedCall(delay, pulse);
            colorTweens.push(delayed as unknown as gsap.core.Tween);
          },
        });

        tween.to(element, {
          opacity: gsap.utils.random(0.12, 0.24),
          scale: gsap.utils.random(1.02, 1.08),
          duration: gsap.utils.random(1.8, 3.4),
          ease: "power2.inOut",
        });

        tween.to(
          element,
          {
            opacity: gsap.utils.random(0.04, 0.1),
            scale: 1,
            duration: gsap.utils.random(2.4, 4.2),
            ease: "power2.inOut",
          },
          ">",
        );

        colorTweens.push(tween);
      };

      pulse();
    };

    gradientRefs.current.forEach((gradient) => {
      if (!gradient) return;

      gsap.set(gradient, {
        backgroundPosition: "0% 50%",
      });

      const tween = gsap.to(gradient, {
        backgroundPosition: "100% 50%",
        duration: gsap.utils.random(10, 16),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gradientTweens.push(tween);
    });

    colorRefs.current.forEach((colorLayer) => {
      if (!colorLayer) return;
      runColorPulse(colorLayer);
    });

    return () => {
      [...colorTweens, ...gradientTweens].forEach((tween) => tween.kill());
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const board = boardRef.current;
    if (!cursor || !board) return;

    const getBoardLocalPoint = (clientX: number, clientY: number) => {
      const rect = board.getBoundingClientRect();

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.28,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.28,
      ease: "power3.out",
    });

    const moveHandler = (event: MouseEvent) => {
      if (hoverLockRef.current) return;

      const point = getBoardLocalPoint(event.clientX, event.clientY);
      xTo(point.x);
      yTo(point.y);
    };

    const enterBoard = (event: MouseEvent) => {
      const point = getBoardLocalPoint(event.clientX, event.clientY);

      xTo(point.x);
      yTo(point.y);

      gsap.to(cursor, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const leaveBoard = () => {
      hoverLockRef.current = false;

      gsap.to(cursor, {
        autoAlpha: 0,
        scale: 0.4,
        duration: 0.18,
        ease: "power2.out",
      });
    };

    const cellEnterHandlers: Array<() => void> = [];
    const cellLeaveHandlers: Array<() => void> = [];

    cellRefs.current.forEach((cell) => {
      if (!cell) return;

      const onEnter = () => {
        hoverLockRef.current = true;

        const boardRect = board.getBoundingClientRect();
        const rect = cell.getBoundingClientRect();
        const cx = rect.left - boardRect.left + rect.width / 2;
        const cy = rect.top - boardRect.top + rect.height / 2;

        xTo(cx);
        yTo(cy);

        gsap.to(cursor, {
          width: rect.width - 4,
          height: rect.height - 4,
          borderRadius: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.48,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        hoverLockRef.current = false;

        gsap.to(cursor, {
          width: 10,
          height: 10,
          autoAlpha: 0.9,
          duration: 1.24,
          ease: "power3.out",
          "--w": "12px",
        });
      };

      cell.addEventListener("mouseenter", onEnter);
      cell.addEventListener("mouseleave", onLeave);

      cellEnterHandlers.push(() => {
        cell.removeEventListener("mouseenter", onEnter);
      });

      cellLeaveHandlers.push(() => {
        cell.removeEventListener("mouseleave", onLeave);
      });
    });

    board.addEventListener("mouseenter", enterBoard);
    board.addEventListener("mouseleave", leaveBoard);
    window.addEventListener("mousemove", moveHandler);

    gsap.set(cursor, {
      x: board.clientWidth / 2,
      y: board.clientHeight / 2,
      autoAlpha: 0,
      scale: 0.8,
      width: 22,
      height: 22,
      borderRadius: 999,
    });

    return () => {
      board.removeEventListener("mouseenter", enterBoard);
      board.removeEventListener("mouseleave", leaveBoard);
      window.removeEventListener("mousemove", moveHandler);
      cellEnterHandlers.forEach((fn) => fn());
      cellLeaveHandlers.forEach((fn) => fn());
    };
  }, [isDesktop]);

  return (
    <section className="relative bg-background">
      <div className="relative">
        <div ref={boardRef} className="relative h-auto md:h-[200svh]">
          <div className="grid h-full grid-cols-1 md:grid-cols-3 md:grid-rows-3">
            {BOARD_ITEMS.map((item, index) => (
              <Link
                key={item.key}
                ref={(node) => {
                  cellRefs.current[index] = node;
                }}
                href={item.href}
                type="button"
                className={cn(
                  "group relative flex min-h-[20svh] w-full flex-col items-start justify-between overflow-hidden p-5 text-left transition-colors duration-300 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:min-h-0 md:p-8",
                  "hover:bg-transparent",
                  getCellBorderClasses(index),
                )}
              >
                <div className="pointer-events-none absolute inset-0 z-0">
                  {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.96),hsl(var(--background)/0.9))]" /> */}

                  <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.18)_0%,transparent_58%),linear-gradient(90deg,transparent_0%,hsl(var(--foreground)/0.05)_50%,transparent_100%)]" />

                  <div
                    ref={(node) => {
                      gradientRefs.current[index] = node;
                    }}
                    className="absolute inset-0 opacity-[0.16]"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.04) 22%, transparent 42%, rgba(255,255,255,0.03) 60%, transparent 100%)",
                      backgroundSize: "200% 200%",
                    }}
                  />

                  <div
                    ref={(node) => {
                      colorRefs.current[index] = node;
                    }}
                    className="absolute inset-[-12%] opacity-10 blur-2xl"
                  />
                </div>

                <div className="relative z-10 space-y-3">
                  <p className="relative text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                    {item.title}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </p>

                  <span className="inline-block text-sm text-muted-foreground">
                    <span className="relative inline-block">{item.phrase}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div
            className="target-cursor box-border pointer-events-none absolute left-0 top-0 z-40 hidden -translate-x-1/2 -translate-y-1/2 bg-transparent md:block"
            ref={cursorRef}
          />
        </div>
      </div>
    </section>
  );
}
