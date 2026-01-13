"use client";

import * as React from "react";
import Link from "next/link";
import {
  FaDatabase,
  FaDocker,
  FaFile,
  FaGitAlt,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPython,
} from "react-icons/fa6";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiTypescript,
  SiPayloadcms,
  SiApplemusic,
  SiKubernetes,
  SiSupabase,
  SiVercel,
  SiShadcnui,
  SiChessdotcom,
} from "react-icons/si";

type WorkItem = { role: string; org: string; date: string };
const WORK_DATA: WorkItem[] = [
  // {
  //   role: "Backend Developer",
  //   org: "PasTicks",
  //   date: "Sep 2025 — Present",
  // },
  {
    role: "Content and Brand Intern",
    org: "Motilal Oswal Financial Services",
    date: "Jun 2025 — Present",
  },
  {
    role: "Full Stack Developer",
    org: "Bala-G Studios",
    date: "Feb 2025 — Aug 2025",
  },
  {
    role: "Software Developer",
    org: "Anand Rawat and Co. Chartered Accountants",
    date: "Sep 2024 — Mar 2025",
  },
  {
    role: "Junior Software Developer",
    org: "Avaya International",
    date: "May 2023 — July 2024",
  },
  {
    role: "Software Developer Intern",
    org: "Mount Technics Consultancy",
    date: "May 2022 — Aug 2022",
  },
];

export function WorkList() {
  return (
    <ul className="space-y-2  w-full mx-auto p-4">
      {WORK_DATA.map((w) => (
        <li
          key={`${w.org}-${w.date}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 text-center"
        >
          <span className="font-medium">{w.role}</span>
          <span className="text-muted-foreground">{w.org}</span>
          <span className="text-sm text-muted-foreground mb-5">{w.date}</span>
        </li>
      ))}
    </ul>
  );
}

type EducationItem = { program: string; school: string; date: string };
const EDUCATION_DATA: EducationItem[] = [
  {
    program: "B.E. Computer Engineering",
    school: "Trinity College Dublin",
    date: "2019 — 2023",
  },
  {
    program: "ISC Examinations",
    school: "St. George's College",
    date: "2018",
  },
];

export function EducationList() {
  return (
    <ul className="space-y-2 w-full mx-auto p-4">
      {EDUCATION_DATA.map((e) => (
        <li
          key={`${e.school}-${e.date}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 text-center"
        >
          <span className="font-medium">{e.program}</span>
          <span className="text-muted-foreground">{e.school}</span>
          <span className="text-sm text-muted-foreground mb-5">{e.date}</span>
        </li>
      ))}
    </ul>
  );
}

type SkillItem = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
const SKILLS_DATA: SkillItem[] = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: FaPython },
  { name: "SQL", icon: FaDatabase },
  { name: "PayloadCMS", icon: SiPayloadcms },
  { name: "Tailwind", icon: RiTailwindCssFill },
  { name: "Next.js", icon: RiNextjsFill },
  { name: "Shadcn", icon: SiShadcnui },
  { name: "Git", icon: FaGitAlt },
  { name: "Docker", icon: FaDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Supabase", icon: SiSupabase },
  { name: "Vercel", icon: SiVercel },
];
export function SkillsList() {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mx-auto p-4">
      {SKILLS_DATA.map((s) => {
        const Icon = s.icon;
        return (
          <li
            key={s.name}
            className="flex items-center gap-2 justify-center  mb-5"
          >
            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="text-sm">{s.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

type AboutItem = { label: string; date: string };
const ABOUT_DATA: AboutItem[] = [
  // { label: "Built a financial data tool processing ~₹10M/yr", date: "2024" },
  // { label: "Launched boutique studio website (perf-focused)", date: "2024" },
  // { label: "Exploring quantum software engineering", date: "2025" },
];

export function AboutList() {
  return (
    <ul className="space-y-2 w-full mx-auto p-4">
      {ABOUT_DATA.map((a) => (
        <li
          key={`${a.label}-${a.date}`}
          className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2"
        >
          <span className="font-medium md:col-span-2 text-center">
            {a.label}
          </span>
          <span className="text-muted-foreground text-center">{a.date}</span>
        </li>
      ))}
    </ul>
  );
}

type SocialItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SOCIAL_DATA: SocialItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
    icon: FaLinkedin,
  },
  { label: "GitHub", href: "https://github.com/apnatvar/", icon: FaGithub },
  {
    label: "Instagram",
    href: "https://instagram.com/nattupi/",
    icon: FaInstagram,
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/profile/nattupi",
    icon: SiApplemusic,
  },
  {
    label: "Chess.com",
    href: "https://www.chess.com/member/nattupi",
    icon: SiChessdotcom,
  },
];

export function SocialList() {
  return (
    <ul className="space-y-2 w-full mx-auto p-4">
      {SOCIAL_DATA.map((s) => {
        const Icon = s.icon;
        return (
          <li
            key={s.label}
            className="flex items-center gap-1 justify-center mb-5"
          >
            <Icon className="h-5 w-4 text-muted-foreground" aria-hidden />
            <Link
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:underline-offset-4 hover:opacity-90"
            >
              {s.label}
            </Link>
          </li>
        );
      })}
      <li key="CV" className="flex items-center gap-2 justify-center mb-5">
        <FaFile className="h-4 w-4 text-muted-foreground" aria-hidden />
        <Link
          href="https://github.com/apnatvar/apnatvar/blob/main/ApnatvaCV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:underline-offset-4 hover:opacity-90"
        >
          CV
        </Link>
      </li>
    </ul>
  );
}
