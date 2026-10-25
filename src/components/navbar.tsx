"use client";


import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const index = [
  { numeral: "i", label: "The work", href: "/#work", note: "Client websites, small products, and the decisions behind them." },
  { numeral: "ii", label: "Front-end & design", href: "/front-end", note: "Interfaces, components, responsive details, and performance." },
  { numeral: "iii", label: "Technical SEO", href: "/seo", note: "Rendering, crawlability, page structure, and useful content." },
  { numeral: "iv", label: "A little about me", href: "/about-ap", note: "A face, a few photographs, and the path here." },
  { numeral: "v", label: "Leave a note", href: "/hire-ap", note: "A new project, an existing website, or a question to work through." },
];

export function MorphingNav() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const animation = useRef<Animation | null>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setCompact(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); animation.current?.cancel(); };
  }, []);

  const close = () => {
    const sheet = dialog.current;
    if (!sheet) return;
    animation.current?.cancel();
    setOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    animation.current = sheet.animate([{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: reduced ? "none" : "translateY(-24px)" }], { duration: reduced ? 0 : 250, easing: "ease-in", fill: "both" });
    animation.current.onfinish = () => { sheet.close(); animation.current?.cancel(); opener.current?.focus(); };
  };

  const show = () => {
    const sheet = dialog.current;
    if (!sheet) return;
    animation.current?.cancel();
    sheet.showModal();
    setOpen(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    animation.current = sheet.animate([{ opacity: 0, transform: reduced ? "none" : "translateY(-32px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: reduced ? 0 : 500, easing: "ease-out", fill: "both" });
  };

  const navigation = <>
    <nav aria-label="Primary navigation" className={`folio-nav${compact ? " folio-nav--compact" : ""}`}>
      <Link href="/" className="folio-nav-brand"><span>AP</span><small>Front-end & SEO</small></Link>
      <div className="folio-nav-links" aria-hidden={compact}>
        <Link href="/#work" tabIndex={compact ? -1 : 0}>Work</Link>
        <Link href="/#practice" tabIndex={compact ? -1 : 0}>Expertise</Link>
        <Link href="/about-ap" tabIndex={compact ? -1 : 0}>About</Link>
        <Link href="/hire-ap" tabIndex={compact ? -1 : 0}>Say hello <span aria-hidden="true">↗</span></Link>
      </div>
      <button ref={opener} type="button" className="folio-index-trigger" onClick={show} aria-label="Open index menu" aria-controls="creative-navigation" aria-expanded={open}><span>Index</span><span aria-hidden="true">+</span></button>
    </nav>
    <dialog ref={dialog} id="creative-navigation" aria-label="Portfolio navigation" className="folio-index-sheet" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if ((event.target as Element).closest("a")) close(); }}>
      <div className="folio-index-running-head"><Link href="/">AP / Apnatva Singh Rawat</Link><button type="button" onClick={close} aria-label="Close menu">Close <span aria-hidden="true">×</span></button></div>
      <div className="folio-index-layout"><div className="folio-index-preface"><span className="atelier-label">A table of contents</span><h2>In the <br />notebook.</h2><p>Front-end development, interface design, and technical SEO. A few different ways into the same work.</p><span className="folio-index-signature" aria-hidden="true">AP</span></div>
        <nav aria-label="Notebook index"><ol>{index.map(item => <li key={item.href}><span className="folio-index-number">{item.numeral}.</span><div><Link href={item.href}>{item.label}<span aria-hidden="true">↗</span></Link><p>{item.note}</p></div></li>)}</ol></nav>
      </div>
      <div className="folio-index-colophon"><span>Independent / Based in India</span><a href="mailto:rawat@apnatva.dev">rawat@apnatva.dev</a></div>
    </dialog>
  </>;
  // ScrollSmoother transforms its content. Keep fixed navigation in the viewport.
  return mounted ? createPortal(navigation, document.body) : navigation;
}
