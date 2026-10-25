"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { useDisplayMode } from "@/components/display-mode/display-mode-provider";

const menuItems = [
  { label: "Hire Me", href: "/hire-ap" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Tools", href: "/tools" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about-ap" },
  { label: "Links", href: "/links" },
];

export function ThemedMenu() {
  const { mode } = useDisplayMode();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("button, a")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className={`themed-menu themed-menu--${mode} fixed bottom-4 right-4 z-[65] md:bottom-6 md:right-6`}>
      {open ? (
        <nav ref={panel} id={menuId} className="themed-menu-panel mb-2" aria-label="Portfolio navigation">
          <div className="themed-menu-heading">
            <span>{mode === "swiss" ? "NAV—06" : "Navigation"}</span>
            <button type="button" onClick={() => { setOpen(false); trigger.current?.focus(); }} aria-label="Close menu">
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
          <ol>
            {menuItems.map((item, index) => (
              <li key={item.href}>
                {mode === "swiss" ? <span aria-hidden="true">0{index + 1}</span> : null}
                <Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
        <button
          ref={trigger}
          type="button"
          className="themed-menu-trigger"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
        >
          <span>{mode === "swiss" ? "MENU" : "Menu"}</span>
          <Menu aria-hidden="true" className="size-4" />
        </button>
    </div>
  );
}
