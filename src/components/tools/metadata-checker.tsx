"use client";

import { useState } from "react";

type Finding = { label: string; value: string; status: "ok" | "missing" | "invalid" | "info" };

function inspectHtml(source: string): Finding[] {
  const doc = new DOMParser().parseFromString(source, "text/html");
  const title = doc.title.trim();
  const description = doc.querySelector('meta[name="description" i]')?.getAttribute("content")?.trim() ?? "";
  const canonical = doc.querySelector('link[rel~="canonical" i]')?.getAttribute("href")?.trim() ?? "";
  const robots = doc.querySelector('meta[name="robots" i]')?.getAttribute("content")?.trim() ?? "";
  const h1s = doc.querySelectorAll("h1");
  const jsonScripts = [...doc.querySelectorAll('script[type="application/ld+json"]')];
  const parsed = jsonScripts.map((script) => {
    try { JSON.parse(script.textContent ?? ""); return true; } catch { return false; }
  });
  let canonicalValid = false;
  if (canonical) {
    try { const url = new URL(canonical); canonicalValid = ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname); } catch { canonicalValid = false; }
  }
  return [
    { label: "Title", value: title || "No <title> found", status: title ? "ok" : "missing" },
    { label: "Meta description", value: description || "No description found", status: description ? "ok" : "missing" },
    { label: "Canonical URL", value: canonical || "No canonical link found", status: canonical ? canonicalValid ? "ok" : "invalid" : "missing" },
    { label: "Robots directive", value: robots || "No robots meta tag (default behavior depends on crawler)", status: robots ? "info" : "info" },
    { label: "H1 headings", value: `${h1s.length} found${h1s.length ? `: ${[...h1s].map((h) => h.textContent?.trim()).filter(Boolean).join(" · ")}` : ""}`, status: h1s.length === 1 ? "ok" : h1s.length === 0 ? "missing" : "info" },
    { label: "JSON-LD syntax", value: jsonScripts.length ? `${parsed.filter(Boolean).length} of ${jsonScripts.length} script${jsonScripts.length === 1 ? "" : "s"} parse as JSON` : "No JSON-LD scripts found", status: parsed.length && parsed.every(Boolean) ? "ok" : parsed.length ? "invalid" : "info" },
  ];
}

const stateStyle = { ok: "border-emerald-500/40", missing: "border-amber-500/50", invalid: "border-red-500/50", info: "border-border" };

export function MetadataChecker() {
  const [html, setHtml] = useState("");
  const [checked, setChecked] = useState(false);
  const findings = checked ? inspectHtml(html) : [];
  return <section className="mt-8" aria-labelledby="metadata-checker-title">
    <h2 id="metadata-checker-title" className="text-2xl font-medium">Paste rendered HTML</h2>
    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">Paste a page source or rendered HTML snapshot. Parsing happens locally in this browser tab; the HTML is not uploaded or saved.</p>
    <label htmlFor="html-input" className="mt-5 block text-sm font-medium">HTML source</label>
    <textarea id="html-input" value={html} onChange={(event) => { setHtml(event.target.value); setChecked(false); }} placeholder="<!doctype html>…" className="mt-2 min-h-64 w-full rounded-xl border border-input bg-background p-4 font-mono text-xs leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    <button type="button" disabled={!html.trim()} onClick={() => setChecked(true)} className="mt-4 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">Check HTML</button>
    {checked && <div className="mt-8" aria-live="polite"><h2 className="text-xl font-medium">Checks</h2><ul className="mt-3 grid gap-3 sm:grid-cols-2">{findings.map((finding) => <li key={finding.label} className={`rounded-xl border p-4 ${stateStyle[finding.status]}`}><p className="font-medium">{finding.label}</p><p className="mt-1 break-words text-sm leading-6 text-muted-foreground">{finding.value}</p></li>)}</ul></div>}
    <aside className="mt-8 rounded-xl border border-border/70 p-5 text-sm leading-6 text-muted-foreground"><h2 className="font-medium text-foreground">Scope and limitations</h2><p className="mt-2">This checks only markup you paste: title, description, canonical URL syntax, robots meta presence/value, H1 count/text, and whether JSON-LD scripts parse as JSON. It does not fetch or crawl a URL, verify the live response or canonical target, determine whether a search engine can index a page, or validate schema properties or rich result eligibility.</p><p className="mt-2">A syntactically valid tag or JSON document does not establish that it is correct for the page or eligible for a search feature. Use crawler and Search Console tools for those checks.</p></aside>
  </section>;
}
