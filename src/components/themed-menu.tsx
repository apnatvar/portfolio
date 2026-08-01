"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useDisplayMode } from "@/components/display-mode/display-mode-provider";

const menuItems = [
  { label: "Hire Me", href: "/hire-ap" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about-ap" },
  { label: "Blogs", href: "/blogs" },
];

export function ThemedMenu() {
  const { mode } = useDisplayMode();
  const [open, setOpen] = useState(false);

  return (
    <div className={`themed-menu themed-menu--${mode} fixed bottom-4 right-4 z-[65] md:bottom-6 md:right-6`}>
      {open ? (
        <nav className="themed-menu-panel" aria-label="Portfolio navigation">
          <div className="themed-menu-heading">
            <span>{mode === "swiss" ? "NAV—04" : "Navigation"}</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
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
      ) : (
        <button
          type="button"
          className="themed-menu-trigger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded="false"
        >
          {mode === "swiss" ? <span>MENU / 04</span> : <span>Menu</span>}
          <Menu aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  );
}
