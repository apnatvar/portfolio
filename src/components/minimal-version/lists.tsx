"use client";

import * as React from "react";
import Link from "next/link";
import {
  Code2,
  Database,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Waypoints,
} from "lucide-react";

// --------------------
// Work (name + date)
// --------------------
type WorkItem = { role: string; org: string; date: string };
const WORK_DATA: WorkItem[] = [
  {
    role: "Junior Software Developer",
    org: "FinTech Co.",
    date: "2024 — Present",
  },
  { role: "Software Intern", org: "DataOps Studio", date: "2023 — 2024" },
  { role: "Contract Developer", org: "Boutique Agency", date: "2023" },
];

export function WorkList() {
  return (
    <ul className="space-y-2  w-full mx-auto p-4">
      {WORK_DATA.map((w) => (
        <li
          key={`${w.org}-${w.date}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4"
        >
          <span className="font-medium">{w.role}</span>
          <span className="text-muted-foreground">{w.org}</span>
          <span className="text-sm text-muted-foreground">{w.date}</span>
        </li>
      ))}
    </ul>
  );
}

// -----------------------
// Education (name + date)
// -----------------------
type EducationItem = { program: string; school: string; date: string };
const EDUCATION_DATA: EducationItem[] = [
  {
    program: "B.E. Computer Engineering",
    school: "State University",
    date: "2019 — 2023",
  },
  {
    program: "Cert. — Data Analytics",
    school: "Online Institute",
    date: "2022",
  },
];

export function EducationList() {
  return (
    <ul className="space-y-2 w-full mx-auto p-4">
      {EDUCATION_DATA.map((e) => (
        <li
          key={`${e.school}-${e.date}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4"
        >
          <span className="font-medium">{e.program}</span>
          <span className="text-muted-foreground">{e.school}</span>
          <span className="text-sm text-muted-foreground">{e.date}</span>
        </li>
      ))}
    </ul>
  );
}

// -------------------
// Skills (name + icon)
// -------------------
type SkillItem = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
const SKILLS_DATA: SkillItem[] = [
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Code2 },
  { name: "Tailwind", icon: Waypoints },
  { name: "PayloadCMS", icon: Database },
  { name: "Python", icon: Code2 },
  { name: "SQL", icon: Database },
];

export function SkillsList() {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mx-auto p-4">
      {SKILLS_DATA.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.name} className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="text-sm">{s.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

// -----------------------------------
// About Me (name/label + date/timing)
// -----------------------------------
type AboutItem = { label: string; date: string };
const ABOUT_DATA: AboutItem[] = [
  { label: "Built a financial data tool processing ~₹10M/yr", date: "2024" },
  { label: "Launched boutique studio website (perf-focused)", date: "2024" },
  { label: "Exploring quantum software engineering", date: "2025" },
];

export function AboutList() {
  return (
    <ul className="space-y-2 w-full mx-auto p-4">
      {ABOUT_DATA.map((a) => (
        <li
          key={`${a.label}-${a.date}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4"
        >
          <span className="font-medium">{a.label}</span>
          <span className="text-muted-foreground md:col-span-2">{a.date}</span>
        </li>
      ))}
    </ul>
  );
}

// ------------------------------------
// Social Links (icon + hyperlink text)
// ------------------------------------
type SocialItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SOCIAL_DATA: SocialItem[] = [
  { label: "GitHub", href: "https://github.com/your-handle", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-handle",
    icon: Linkedin,
  },
  {
    label: "Twitter/X",
    href: "https://twitter.com/your-handle",
    icon: Twitter,
  },
];

export function SocialList() {
  return (
    <ul className="space-y-2 w-full mx-auto p-4">
      {SOCIAL_DATA.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
            <Link
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-90"
            >
              {s.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
