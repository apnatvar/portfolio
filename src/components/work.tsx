"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { portfolioContent } from "@/content/portfolio-content";
gsap.registerPlugin(ScrollTrigger, useGSAP);
const projects = portfolioContent.projects;
export default function WorkHorizontalScrollSection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const horizontal = useRef<ScrollTrigger | null>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
      if (!track.current || !root.current) return;
      const distance = () => Math.max(0, track.current!.scrollWidth - root.current!.clientWidth);
      const tween = gsap.to(track.current, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
      horizontal.current = tween.scrollTrigger ?? null;
      gsap.utils.toArray<HTMLElement>(".project-panel").forEach((panel) => {
        gsap.fromTo(panel.querySelector(".project-specimen"), { rotate: -8, scale: 0.85 }, { rotate: 4, scale: 1.05, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: 1 } });
        gsap.fromTo(panel.querySelector(".project-name"), { x: 65 }, { x: -35, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: 1 } });
      });
      gsap.to(".work-progress-fill", { scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      return () => { horizontal.current = null; };
    });
    media.add("(prefers-reduced-motion: no-preference) and (max-width: 899px)", () => {
      gsap.utils.toArray<HTMLElement>(".project-panel").forEach(panel => {
        gsap.from(panel.querySelector(".project-art"), { y: 55, rotate: -3, opacity: 0.3, scrollTrigger: { trigger: panel, start: "top 90%", end: "top 35%", scrub: 0.6 } });
      });
    });
    return () => media.revert();
  }, { scope: root });
  return <section ref={root} id="work" className="atelier-work" onFocusCapture={event => {
    const trigger = horizontal.current;
    const panel = (event.target as HTMLElement).closest<HTMLElement>(".project-panel");
    if (!trigger || !panel || !track.current) return;
    const progress = Math.min(1, Math.max(0, panel.offsetLeft / (track.current.scrollWidth - root.current!.clientWidth)));
    trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
    trigger.animation?.progress(progress);
  }}>
    <div className="work-heading"><h2>Some things I’ve made.</h2><span className="atelier-label">02 / Selected work</span></div>
    <div ref={track} className="project-track">{projects.map((project, i) => <article className={`project-panel project-palette-${i % 4}`} key={project.title}>
      <div className="project-art" aria-label={`Typographic study for ${project.title}`} role="img"><span className="project-art-index">AP / {String(i + 1).padStart(2, "0")}</span><div className="project-specimen" aria-hidden="true"><span>{["Bd.", "Elza", "Forme", "↗", "Σ", "Hello.", "Aa", "{ }", "↔"][i % 9]}</span><i /></div><span className="project-art-caption">{project.category ?? "An experiment"}</span></div>
      <div className="project-details"><div className="project-number">({String(i + 1).padStart(2, "0")})</div><h3 className="project-name">{project.title}</h3><p>{project.points[0]}</p><div className="project-links">{project.links.map(link => <a href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={16} /></a>)}</div></div>
    </article>)}</div>
    <div className="work-progress" aria-hidden="true"><div className="work-progress-fill" /></div>
    <noscript><style>{`.project-track { flex-direction: column !important; transform: none !important; }.atelier-work { height: auto !important; }.project-panel { width: 100% !important; min-height: 0 !important; }`}</style></noscript>
  </section>;
}
