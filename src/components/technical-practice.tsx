



import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PracticeMotion } from "@/components/practice-motion";
import { portfolioContent } from "@/content/portfolio-content";



const disciplines = [
  {
    number: "i", title: "Front-end, with feeling.", label: "Design + implementation", href: "/front-end", link: "Inside the front-end work",
    intro: "I work on the layout and the code together. That means the spacing in a mockup has to survive a real screen, a long heading, and someone navigating with a keyboard.",
    items: [
      ["Interface design", "Type, layout, hierarchy, responsive behaviour, and the small interactions that make a page feel considered."],
      ["Production front-ends", "React, Next.js, and TypeScript. Reusable components, content templates, API integration, and the loading and error states around them."],
      ["Accessible interaction", "Semantic HTML, keyboard access, focus states, labelled forms, and motion that respects the reader’s preferences."],
      ["Performance", "Rendering choices, image and font delivery, JavaScript cost, and layout stability. A useful interface has to arrive promptly, too."],
    ],
  },
  {
    number: "ii", title: "SEO, in the source.", label: "Discovery + technical foundations", href: "/seo", link: "Inside the SEO work",
    intro: "Search is part of how a website is built. I work on what a crawler can reach, what the server sends back, and whether each page has a clear reason to exist.",
    items: [
      ["Crawlable architecture", "Routes, internal links, status codes, redirects, canonicals, sitemaps, and robots directives that agree with one another."],
      ["Page-level implementation", "Useful server-rendered content, titles and descriptions, heading structure, and structured data that matches the visible page."],
      ["Programmatic SEO", "Data-backed templates, publishing rules, unique page value, and checks for incomplete records before a site grows."],
      ["Diagnosis + follow-through", "Inspect the site, prioritise the fixes, implement them, and compare the output. Search Console and field data inform the next pass when available."],
    ],
  },
];

export function TechnicalPractice() {
  return <PracticeMotion>
    <div className="journal-section-label"><span className="atelier-label">02 / The practice</span><span className="atelier-label">Front-end development & technical SEO</span></div>
    <div className="journal-intro"><h2>Next.js websites,<br />built for discovery.</h2><p>My focus is content-rich websites: service catalogues, editorial pages, and tools with something useful to offer. I design and build the front-end, then carry that attention into the rendering, page structure, and technical SEO underneath it.</p></div>
    <div className="practice-connector" aria-hidden="true"><span>The interface</span><svg viewBox="0 0 700 90" fill="none"><path d="M5 45H220C265 45 250 10 300 10S355 80 400 80 440 45 480 45H695" /><path d="M5 45L15 40M5 45L15 50M695 45L685 40M695 45L685 50" /><circle cx="350" cy="45" r="35" /><path d="M350 0V90M305 45H395" /></svg><span>The infrastructure</span></div>
    <div className="discipline-columns">{disciplines.map(discipline => <article key={discipline.number} className="discipline">
      <span className="atelier-label">Study {discipline.number} / {discipline.label}</span><h3>{discipline.title}</h3><p className="discipline-intro">{discipline.intro}</p>
      <dl>{discipline.items.map(([title, description]) => <div className="discipline-row" key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl>
      <Link className="atelier-link" href={discipline.href}>{discipline.link}<ArrowUpRight size={16} /></Link>
    </article>)}</div>
    <div className="practice-stack"><span className="atelier-label">Frequently on the desk</span><p>React · Next.js · TypeScript · Tailwind CSS · GSAP · Semantic HTML · Structured data · Search Console</p></div>
  </PracticeMotion>;
}

const buildNotes = [
  ["01", "The page before the polish.", "I start with the content and the task. Which pages belong here? What does a visitor need to do? That shapes the navigation, the component boundaries, and the URLs before I start tuning the visual details.", "Page structure / Responsive layouts / Reusable components"],
  ["02", "What arrives in the browser.", "A front-end is more than its finished screenshot. I consider server and client responsibilities, loading and error states, the weight of an interaction, and what remains available before JavaScript finishes loading.", "Server rendering / Progressive enhancement / Accessible states"],
  ["03", "What search can make of it.", "I check the rendered content, preferred URLs, metadata, structured data, and the links joining it all together. For generated pages, the data needs to support a useful page before a template turns it into a URL.", "Crawlability / Canonicals / Schema / Programmatic quality gates"],
  ["04", "The details after delivery.", "I review the result on real viewport sizes, inspect loading and layout behaviour, and leave the implementation understandable for the next person. Available field and search data help decide what needs attention after launch.", "Web Vitals / Performance diagnosis / Handover / Iteration"],
];

export function TechnicalNotebook() {
  return <>
    <section className="journal-section build-notebook" id="approach">
      <div className="journal-section-label"><span className="atelier-label">04 / Working notes</span><span className="atelier-label">A little of the thinking underneath</span></div>
      <div className="journal-intro"><h2>The craft goes<br />below the surface.</h2><p>I enjoy the expressive part of a website. I also want its forms to work, its pages to render, and its next maintainer to be able to find their way around. Here is how those concerns enter the build.</p></div>
      <div className="build-notes">{buildNotes.map(([number, title, text, annotation]) => <article key={number}><span className="build-note-number">{number}</span><h3>{title}</h3><div><p>{text}</p><span className="build-annotation">{annotation}</span></div></article>)}</div>
      <div className="notebook-reading"><span className="atelier-label">Open on another page</span><Link href="/writing/nextjs-technical-seo-checklist">A Next.js technical SEO checklist <ArrowUpRight size={15} /></Link><Link href="/writing/nextjs-performance-workflow">A performance investigation workflow <ArrowUpRight size={15} /></Link><Link href="/tools/metadata-checker">Try the HTML metadata checker <ArrowUpRight size={15} /></Link></div>
    </section>
    <section className="journal-section field-experience" id="experience">
      <div className="journal-section-label"><span className="atelier-label">05 / In practice</span><span className="atelier-label">Websites, content, and the systems behind them</span></div>
      <div className="experience-heading"><h2>A few places<br />I’ve put this to work.</h2><p>The front-end is my focus. Work in cloud infrastructure, automation, and content helps me see what happens on either side of it.</p></div>
      <ol>{portfolioContent.experience.map(item => <li key={item.year}><span>{item.year}</span><p>{item.text}</p></li>)}</ol>
      <p className="experience-education">Computer Engineering, First Class Honours / Trinity College Dublin</p>
      <Link href="/about-ap" className="atelier-link">A little more about me <ArrowUpRight size={16} /></Link>
    </section>
  </>;
}
