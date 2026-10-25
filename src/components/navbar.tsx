"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

type NavItem = {
  label: string;
  href: string;
  SubComponent: ComponentType;
};

type SubNavItem = {
  label: string;
  href: string;
};

const subNavItemsHireMe: SubNavItem[] = [
  {
    label: "Send a Message",
    href: "/hire-ap",
  },
  {
    label: "Socials",
    href: "/#socials",
  },
  {
    label: "rawat@apnatva.dev",
    href: "mailto:rawat@apnatva.dev",
  },
  { label: "+91-879-141-4856", href: "https://wa.me/918791414856" },
];

const subNavItemsWork: SubNavItem[] = [
  { label: "Portfolio", href: "/" },
  { label: "Samples", href: "https://samples.apnatva.dev/" },
  {
    label: "Elza",
    href: "https://github.com/apnatvar/apnatvar/blob/main/Elza%20Case%20Study.pdf",
  },
  {
    label: "Urban Mobility",
    href: "https://github.com/apnatvar/adaptive-traffic-control/blob/main/Thesis.pdf",
  },
];

function HireAPSubComponent() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 max-w-2xl items-center">
      {subNavItemsHireMe.map((item) => (
        <Button asChild key={item.label} variant={"link"}>
          <Link href={item.href}>
            {item.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}

function WorkSubComponent() {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl">
      <h3 className="text-center text-base md:text-lg">Full Case Study</h3>{" "}
      <div className="flex flex-wrap items-center justify-center md:flex-nowrap md:gap-12 md:py-4">
        {subNavItemsWork.map((item) => (
          <Button asChild key={item.label} variant={"link"}>
            <Link href={item.href} target={item.href.startsWith("https:") ? "_blank" : undefined} rel="noreferrer">
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

function APSubComponent() {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl">
      <p className="text-xs md:text-sm">
        Design, code, and the occasional detour. Based in
        India, usually somewhere between a sketch and an open code editor.
      </p>
    </div>
  );
}

const navItems: NavItem[] = [
  { label: "Work", href: "/#work", SubComponent: WorkSubComponent },
  { label: "About", href: "/about-ap", SubComponent: APSubComponent },
  { label: "Say hello", href: "/#contact", SubComponent: HireAPSubComponent },
];
export function MorphingNav() {
  return <CreativeMorphingNav />;
}
function CreativeMorphingNav() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const fullMenuRef = useRef<HTMLDialogElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useGSAP(() => {
    if (!navRef.current || !pillRef.current) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    gsap.set(pill, {
      borderRadius: 999,
    });

    const morphTl = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-first-section]",
        start: "top -10%",
        end: "+=40%",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => setCollapsed(self.progress > 0.5),
      },
    });

    morphTl
      .to(
        nav,
        {
          top: "auto",
          bottom: 24,
          right: 24,
          left: "auto",
          width: 56,
          height: 56,
          padding: 0,
          duration: 1,
          ease: "none",
        },
        0,
      )
      .to(
        pill,
        {
          width: 56,
          height: 56,
          padding: 0,
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          duration: 1,
          ease: "none",
        },
        0,
      )
      .to(
        "[data-nav-link]",
        {
          opacity: 0,
          pointerEvents: "none",
          scale: 0.8,
          duration: 0.8,
          stagger: 0.03,
          ease: "none",
        },
        0,
      )
      .to(
        "[data-burger]",
        {
          opacity: 1,
          scale: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "none",
        },
        0.5,
      );
    return () => setCollapsed(false);
    });
    return () => media.revert();
  }, []);

  useGSAP(() => {
    if (!fullMenuRef.current || !navRef.current) return;

    const fullMenu = fullMenuRef.current;
    const nav = navRef.current;
    if (isOpen && !fullMenu.open) fullMenu.showModal();

    const navRect = nav.getBoundingClientRect();

    const originX = navRect.left + navRect.width / 2;
    const originY = navRect.top + navRect.height / 2;

    const animation = gsap.to(fullMenu, {
      clipPath: isOpen
        ? `circle(150% at ${originX}px ${originY}px)`
        : `circle(0px at ${originX}px ${originY}px)`,
      autoAlpha: isOpen ? 1 : 0,
      pointerEvents: isOpen ? "auto" : "none",
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : isOpen ? 0.95 : 0.7,
      ease: isOpen ? "power3.out" : "power3.inOut",
      onComplete: () => { if (!isOpen) fullMenu.close(); },
    });
    return () => { animation.kill(); };
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary navigation"
        className="fixed top-0 z-50 mx-auto w-full px-4 py-4 md:px-8 max-w-dvw"
      >
        <div
          ref={pillRef}
          className="mx-auto flex h-14 w-full max-w-sm items-center justify-around rounded-full border border-foreground/15 bg-background/90 px-5 backdrop-blur-md"
        >
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="link"
              size="default"
              data-nav-link
              tabIndex={collapsed ? -1 : 0}
              aria-hidden={collapsed}
              className="px-2 text-foreground text-sm md:text-base"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}

          <button
            type="button"
            data-burger
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="creative-navigation"
            tabIndex={collapsed ? 0 : -1}
            aria-hidden={!collapsed}
            onClick={() => setIsOpen(true)}
            className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 bg-background rounded-full"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      <dialog
        id="creative-navigation"
        ref={fullMenuRef}
        aria-label="Portfolio navigation"
        onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setIsOpen(false); }}
        onCancel={(event) => { event.preventDefault(); setIsOpen(false); }}
        className="fixed inset-0 z-[60] m-0 h-dvh w-dvw max-h-none max-w-none overflow-y-auto border-0 bg-background/95 p-0 text-foreground opacity-0 backdrop-blur-md"
        style={{
          clipPath: "circle(0px at calc(100% - 52px) calc(100% - 52px))",
        }}
      >
        <div className="flex min-h-full flex-col px-4 py-16 md:px-12 md:py-8">
          <div className="grid flex-1 place-items-center">
            <div className="flex flex-col items-center gap-4 text-4xl font-medium">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="flex flex-col md:flex-row flex-nowrap shrink gap-4 md:gap-24"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-italianno max-md:text-center transition-all hover:tracking-widest duration-500 hover:opacity-80 text-5xl md:text-[8rem] italic md:basis-1/2"
                  >
                    {item.label}
                  </Link>
                  <item.SubComponent />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-4 top-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
