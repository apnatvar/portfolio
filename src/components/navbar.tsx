"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

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

function HireAPSubComponent() {
  return (
    <div className="flex flex-col md:flex-row max-w-2xl items-center flex-wrap">
      {subNavItemsHireMe.map((item) => (
        <Button key={item.label} variant={"link"}>
          <Link href={item.href} target="_blank">
            {item.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}

const subNavItemsWork: SubNavItem[] = [
  { label: "Elza - Website", href: "https://elza.co.in" },
  { label: "Haneri - Online Catalog", href: "" },
  { label: "Urban Mobility - AI Traffic Control", href: "" },
];

function WorkSubComponent() {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl">
      <h3 className="text-center text-base md:text-xl">Full Case Study</h3>{" "}
      <div>
        {subNavItemsWork.map((item) => (
          <Button key={item.label} variant={"link"}>
            <Link href={item.href} target="_blank">
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
      <p className="text-base md:text-lg">
        I design interfaces for you with a sprinkle of personal innovation.
        Specialised websites help you stand out better. You can sell products,
        courses, templates, art, clothes, and so much more.
      </p>
    </div>
  );
}

const navItems: NavItem[] = [
  {
    label: "Hire Me",
    href: "/hire-ap",
    SubComponent: HireAPSubComponent,
  },
  {
    label: "Work",
    href: "/#work",
    SubComponent: WorkSubComponent,
  },
  {
    label: "About",
    href: "/about-ap",
    SubComponent: APSubComponent,
  },
];

export function MorphingNav() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const fullMenuRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    if (!navRef.current || !pillRef.current) return;

    const nav = navRef.current;
    const pill = pillRef.current;

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
  }, []);

  useGSAP(() => {
    if (!fullMenuRef.current || !navRef.current) return;

    const fullMenu = fullMenuRef.current;
    const nav = navRef.current;

    const navRect = nav.getBoundingClientRect();

    const originX = navRect.left + navRect.width / 2;
    const originY = navRect.top + navRect.height / 2;

    gsap.to(fullMenu, {
      clipPath: isOpen
        ? `circle(150% at ${originX}px ${originY}px)`
        : `circle(0px at ${originX}px ${originY}px)`,
      autoAlpha: isOpen ? 1 : 0,
      pointerEvents: isOpen ? "auto" : "none",
      duration: isOpen ? 0.95 : 0.7,
      ease: isOpen ? "power3.out" : "power3.inOut",
    });
  }, [isOpen]);

  useEffect(() => {
    const sentinel = document.getElementById("page-end-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOpen(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.6,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 z-50 mx-auto w-full px-4 py-4 md:px-8 max-w-dvw"
      >
        <div
          ref={pillRef}
          className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between bg-background"
        >
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="link"
              size="default"
              data-nav-link
              className="text-foreground text-base"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}

          <button
            type="button"
            data-burger
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 bg-background rounded-full"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      <div
        ref={fullMenuRef}
        className="fixed inset-0 z-[60] invisible bg-background/95 opacity-0 backdrop-blur-md min-h-1/2 max-h-dvh max-w-dvw"
        style={{
          clipPath: "circle(0px at calc(100% - 52px) calc(100% - 52px))",
        }}
      >
        <div className="flex h-full flex-col px-12 py-12">
          <div className="grid flex-1 place-items-center">
            <div className="flex flex-col items-center gap-4 text-4xl font-medium">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="flex flex-row flex-nowrap shrink gap-12 md:gap-24 max-md:basis-1/2"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-italianno transition-all hover:tracking-widest duration-500 hover:opacity-80 text-8xl md:text-[115px] italic"
                  >
                    {item.label}
                  </Link>
                  <item.SubComponent />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
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
      </div>
    </>
  );
}
