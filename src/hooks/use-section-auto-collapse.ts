"use client";

import { MutableRefObject, useEffect, useRef } from "react";

type UseSectionAutoCollapseProps = {
  enabled: boolean;
  rootRef: MutableRefObject<HTMLElement | null>;
  sentinelRef: MutableRefObject<HTMLElement | null>;
  hasTriggered: boolean;
  onTrigger: () => void;
};

export function useSectionAutoCollapse({
  enabled,
  rootRef,
  sentinelRef,
  hasTriggered,
  onTrigger,
}: UseSectionAutoCollapseProps) {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || !rootRef.current || !sentinelRef.current || hasTriggered) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || hasTriggered) return;

        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          onTrigger();
        }, 180);
      },
      {
        root: rootRef.current,
        threshold: 0.98,
      },
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, hasTriggered, onTrigger, rootRef, sentinelRef]);
}
