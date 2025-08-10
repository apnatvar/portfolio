// hooks/useSmoothScroll.js
import { useCallback } from "react";

export default function useSmoothScroll() {
  const smoothScrollTo = useCallback((id, duration = 2000, offset = 20) => {
    const target = document.getElementById(id);
    if (!target) return;

    const start = window.pageYOffset;
    const end = target.getBoundingClientRect().top + start - offset;
    const distance = end - start;
    const startTime = performance.now();

    function easeInOutQuad(t) {
      return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t;
    }

    function scroll() {
      const now = performance.now();
      const time = Math.min((now - startTime) / duration, 1);
      const easedTime = easeInOutQuad(time);
      window.scrollTo(0, start + distance * easedTime);

      if (time < 1) requestAnimationFrame(scroll);
    }

    requestAnimationFrame(scroll);
  }, []);

  return smoothScrollTo;
}
