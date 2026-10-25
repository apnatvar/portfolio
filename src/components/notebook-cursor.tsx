"use client";
import { useEffect, useRef } from "react";

/** Pointer tracking is native; no animation library is shipped with the layout. */
export function NotebookCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const point = cursor.current;
    const ring = halo.current;
    if (!point || !ring) return;
    let frame = 0;
    let active = false;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const follow = () => {
      x += (targetX - x) * .2; y += (targetY - y) * .2;
      ring.style.transform = `translate3d(${x}px,${y}px,0)`;
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > .1 ? requestAnimationFrame(follow) : 0;
    };
    const hide = () => {
      active = false;
      point.dataset.visible = ring.dataset.visible = "false";
      document.documentElement.classList.remove("has-notebook-cursor");
      cancelAnimationFrame(frame); frame = 0;
    };
    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!preference.matches || event.pointerType === "touch" || target?.closest("input, textarea, select, [contenteditable=true]") || document.querySelector("dialog[open]")) { hide(); return; }
      targetX = event.clientX; targetY = event.clientY;
      if (!active) { x = targetX; y = targetY; active = true; }
      point.style.transform = `translate3d(${targetX}px,${targetY}px,0)`;
      point.dataset.visible = ring.dataset.visible = "true";
      ring.dataset.interactive = String(Boolean(target?.closest("a, button, summary, [role=button]")));
      document.documentElement.classList.add("has-notebook-cursor");
      if (!frame) frame = requestAnimationFrame(follow);
    };
    const key = (event: KeyboardEvent) => { if (event.key === "Tab" || event.key === "Escape") hide(); };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", key);
    preference.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", key);
      preference.removeEventListener("change", hide);
    };
  }, []);
  return <div aria-hidden="true" className="notebook-pointer-layer">
    <div ref={cursor} className="notebook-cursor" data-visible="false"><svg viewBox="0 0 20 20" fill="none"><path d="M10 1V19M1 10H19" /><circle cx="10" cy="10" r="2" fill="currentColor" /></svg></div>
    <div ref={halo} className="notebook-cursor-halo" data-visible="false" data-interactive="false"><div className="cursor-compass"><svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="27" /><path d="M32 2V9M32 55V62M2 32H9M55 32H62" /><path d="M13 13L17 17M47 47L51 51M13 51L17 47M47 17L51 13" /></svg></div><span>↗</span></div>
  </div>;
}
