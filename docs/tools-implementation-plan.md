# Browser tools implementation plan

## Repository findings

- Next.js 15 App Router with React 19 and strict TypeScript.
- Tailwind CSS 4 and existing Shadcn-style UI primitives.
- Shared `metadataBase` is already configured for `https://apnatva.dev`.
- Sitemap and robots are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.
- The global footer is the least disruptive place for a new Tools link.
- No test runner is configured. Deterministic logic will remain framework-free and be checked with TypeScript, lint, production builds, and documented manual cases.
- No `.openai/hosting.json` is present.

## Stages

1. Add this repository assessment and implementation plan.
2. Add `/tools` plus focused shared page, result, and export components.
3. Add pure focus-planner types, configuration, validation, scheduling logic, and UI.
4. Add focus-planner Markdown, JSON, plain-text, and print exports.
5. Add pure decision scoring and recommendation logic plus the calculator UI.
6. Add decision-result Markdown, JSON, plain-text, and print exports.
7. Add per-route metadata, visible FAQs, and matching SoftwareApplication/FAQPage JSON-LD.
8. Add sitemap entries, a footer link, and relevant internal links.
9. Run lint, type checking, logic checks, and the production build.
10. Fix regressions and document rules, validation, privacy, exports, and manual verification.

## Implementation boundaries

- Browser-only React state; no persistence, APIs, authentication, analytics, or remote calls.
- Five-minute schedule granularity and a minimum 15-minute task block.
- Explicit unscheduled output; tasks are never silently dropped.
- Decision recommendations are selected from deterministic rules and fixed text templates.
- Print output relies only on `window.print()` and print-specific CSS.
