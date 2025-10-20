// components/nav/VerticalNavButtons.tsx
"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollToPlugin);

export type NavItem = {
  label: string;
  targetId: string; // e.g., "features"
  speed: number;
};

export interface VerticalNavButtonsProps {
  items?: NavItem[];
  /** Offset in px for sticky headers etc. */
  offsetY?: number;
  /** Button size (shadcn). */
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function VerticalNavButtons({
  items = [
    { label: "Summary", targetId: "summary", speed: 0.5 },
    { label: "Work", targetId: "work", speed: 1.2 },
    {
      label: "Say Hello",
      targetId: "contactme",
      speed: 6,
    },
  ],
  offsetY = 80,
  size = "sm",
  className,
}: VerticalNavButtonsProps) {
  const scrollToId = React.useCallback(
    (id: string, speed: number) => {
      const selector = `#${id}`;
      gsap.to(window, {
        duration: speed,
        ease: "power4.out",
        scrollTo: { y: selector, offsetY },
      });
    },
    [offsetY]
  );

  return (
    <div
      className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}
    >
      {items.map((item, i) => {
        return (
          <Button
            key={i}
            size={size}
            variant="outline"
            className="justify-center hover:text-violet-500 font-playfair"
            onClick={() => scrollToId(item.targetId, item.speed)}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
