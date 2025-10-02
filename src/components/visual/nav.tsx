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
    { label: "Section One", targetId: "section-1" },
    {
      label: "Section Two",
      targetId: "section-2",
    },
    { label: "Section Three", targetId: "section-3" },
  ],
  offsetY = 80,
  size = "sm",
  className,
}: VerticalNavButtonsProps) {
  const scrollToId = React.useCallback(
    (id: string) => {
      const selector = `#${id}`;
      gsap.to(window, {
        duration: 0.9,
        ease: "power2.out",
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
            className="justify-center"
            onClick={() => scrollToId(item.targetId)}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
