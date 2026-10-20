# Portfolio audit — 20 October 2026

Implemented in the existing repository. All measurements below are from local production builds.

## Scope and architecture

Next.js App Router, React 19, TypeScript, Tailwind CSS, GSAP/ScrollTrigger, Lenis, and Embla. Creative keeps the animated presentation, Resume provides a compact document, and Swiss retains its editorial grid. Shared professional copy lives in `src/content/portfolio-content.ts`.

Inspected `/`, `/about-ap`, `/hire-ap`, `/services` and all three service details, `/tools` and both tool details, `/links`, `/ideals`, `/portable-context`, `/test`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`. No CI workflow was present. Existing deterministic tool tests were retained.

The published homepage was inspected alongside the local version; both had the large empty lead-in. The palette, portraits, typography, ribbons, horizontal work presentation, and all three modes are preserved.

## Confirmed problems and changes

| Confirmed evidence | Implemented change |
| --- | --- |
| Creative home started with a 50–60vh spacer, lacked an h1, and put identity/actions below the initial view. | Added a direct identity/role header with work, experience, tools, links, and contact paths. Retained the creative greeting. Reduced empty About/Hire lead-ins. |
| The shell rendered blank before hydration; creative renderers disabled SSR. | Server-render the default creative content. A no-JavaScript browser check verifies real headings and metadata. |
| Switching modes forced scroll-to-top and changed the shell wrapper. Screenshot review later caught a jump from the top into Profile. | Keep a stable wrapper, preserve route/hash and corresponding section offsets, keep top-of-page visitors at the top, and retain Hire drafts across modes. |
| Project text, profile, experience, and education were independently duplicated. | Read shared content. Add only supported project categories: Forme is Open source; Urban Mobility is a Research prototype. |
| The work anchor sat inside a transformed track; project anchors were nested in buttons and could receive invisible focus. | Anchor the section, use semantic project headings and link buttons, synchronize keyboard focus with scrolling, and offer a direct readable-list option in Resume mode. |
| About's services Observer listened globally and prevented default scrolling. | Scope it to its own viewport and permit normal scrolling. Normal-motion wheel/keyboard checks pass. |
| Reduced-motion CSS did not stop GSAP, Lenis, or carousel autoplay. | Gate setup with motion media queries, provide static layouts, and clean up contexts/listeners/observers. |
| Fixed About/education layouts clipped long text. Resume projects produced 328px content at a 320px viewport. | Let profile copy determine height, make expanded details scrollable, and wrap project titles/categories/links. |
| Navigation lacked complete modal keyboard behavior; footer repeated the socials ID; nested mains were present. | Use a native creative dialog, Escape/focus behavior, skip navigation, visible focus, one main landmark, and unique anchors. Stop automatically opening the menu at page end. |
| Axe measured Swiss contrast at 3.8–4.04:1 and Services text at 2.7–3.04:1; some names omitted visible words. | Slightly darken Swiss red, use a readable creative text accent, and align accessible names with visible labels. |
| Hire fields lacked associated labels; state alone allowed duplicate same-turn submits; server logs exposed submitted details. Malformed JSON returned 500. | Add labels/help, a synchronous submission lock, safe 400 responses, upstream timeout, and remove payload logging. Retain failed drafts and reset only on success. |
| Clipboard rejection was unhandled. | Show accessible feedback and offer Markdown/JSON downloads; clean up the copied-state timer. |
| Services emitted empty social images; Portable Context omitted one; favicon used the portrait; sitemap claimed one unsupported modification date. | Reuse existing social artwork and SVG favicon, remove unsubstantiated dates, retain route-specific canonicals and noindex for `/test`. |
| Reading notes had an empty header/no h1; machine-readable indexes omitted tools. | Add a truthful reading-notes heading and footer link, semantic headings, and existing tool/prototype URLs. |
| Profiling showed about 1.3s style/layout work on initial home load. | Defer offscreen work/contact/transition/link animation setup until within 400px of the viewport, keeping SSR content and refreshing pins after initialization. |

## Performance

Baseline: clean archive of `f1421fc4670c94bf6dfed0233851c17530eed44f`, built on Next.js 15.5.7 and served on port 3001. After: final production build on Next.js 15.5.28, port 3000. Same Chrome executable, Lighthouse 12.8.2, routes, and emulation/settings. Individual lab runs are comparisons, not field Web Vitals; TBT is not INP. No field INP data was available.

| Route | Emulation | Performance score | LCP (s) | TBT (ms) | CLS |
| --- | --- | ---: | ---: | ---: | ---: |
| Home | mobile | 76 → 86 | 3.75 → 3.02 | 527 → 353 | 0.002 → 0.009 |
| Home | desktop | 26 → 62 | 3.61 → 2.78 | 667 → 373 | 0.651 → 0.009 |
| Tools | mobile | 92 → 97 | 3.31 → 2.51 | 51 → 50 | 0.000 → 0.000 |
| Tools | desktop | 80 → 86 | 2.59 → 2.11 | 135 → 41 | 0.002 → 0.002 |
| Focus planner | mobile | 91 → 98 | 3.31 → 2.26 | 114 → 52 | 0.000 → 0.000 |
| Focus planner | desktop | 73 → 85 | 3.31 → 2.26 | 186 → 53 | 0.000 → 0.000 |

All after runs scored 100 for accessibility, best practices, and SEO. Homepage CLS is now below 0.1. Homepage LCP remains above the 2.5s objective; it is not reported as meeting that target. The final deferral pass reduced homepage style/layout work about 28% and TBT from 520 to 350ms mobile and 620 to 370ms desktop, without changing LCP.

Mobile script transfer was approximately 226.4KiB on baseline home and 231KiB after the changes; Tools was 192.7 → 193.9KiB and Focus Planner 181.4 → 182.5KiB. Added browser tooling stays in devDependencies and is not imported by application code. The existing font fallback lookup warning was resolved without replacing the font.

Raw reports remain local in ignored `.audit-artifacts/baseline-*.json`, `.audit-artifacts/after-*.json`, and timestamped `.qa-results/lighthouse/` directories. Screenshots stay in `.qa-results/screenshots/` and out of Git.

## Validation

- `npm run lint`: passed; final build also ran lint without warnings.
- `npm run typecheck`: passed; final production builds also passed TypeScript validation.
- `npm run test:tools`: all 15 deterministic tests passed.
- `npm run build`: passed on Next.js 15.5.28, including generated pages.
- Production `npm run qa:browser`: final pre-commit run passed all 30 specifications in one run (about one minute). Earlier audit failures were corrected and are retained in the local logs for traceability.
- Coverage: public routes, metadata/indexability, internal links, machine-readable endpoints, modes/persistence, keyboard menus, draft retention, malformed API bodies, duplicate submits, mocked success/failure, both tool calculations, clipboard rejection, no-JS HTML, and console/uncaught JavaScript errors.
- Reflow: 320, 375, 390, 768, and 1440px. Reviewed screenshots of every mode at 390/1440px. A targeted check also passed 200% text resizing at 1440px on Home, Hire, and Tools across all three modes. Manual Tab/Enter testing confirmed the skip link focuses the single main landmark. No separate light/dark toggle was present.
- Axe: WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA tags across available modes. No violations remain in tested states. This does not establish full WCAG conformance or replace physical assistive-technology testing.

Reproduction commands and browser installation are in `README.md`. Final commit check: `.qa-results/browser-precommit.log`. Earlier logs: `.qa-results/browser-final.log`, `browser-rerun.log`, `browser-performance.log`, and `browser-text-resize.log`. Screenshot review found and corrected the top-of-page mode-switch jump. No screenshot baselines were committed.

## Dependencies and deferred recommendations

Patched Next.js and eslint-config-next within the existing 15.5 line to 15.5.28, and transitive tar to 7.5.22. Audit: 51 findings including 2 critical → 50 findings, 0 critical, 27 high, 23 moderate. Remaining findings include existing dependencies and development profiling dependencies; no incompatible major overrides were forced. Full audit records are in `.qa-results/dependency-audit*.json`.

Deferred:

- Verify real Google Form receipt/inbox delivery. Browser submissions were intercepted; real API checks sent invalid data only. No synthetic enquiry was sent externally.
- Further dependency maintenance for remaining advisories, including Lighthouse's development tree.
- Approved project responsibilities, architecture/trade-offs, and outcomes before adding dedicated case studies. Existing claims/links were retained; no accomplishments were invented.
- A technical writing collection when content or verified URLs are supplied. Personal reading notes remain distinct; no CMS, new tools, backend, or CRM was introduced.
- Field monitoring and repeated measurements on the actual deployment. Heavy dependency removal, broad animation rewrites, and redesign remain speculative rather than automatically implemented.
