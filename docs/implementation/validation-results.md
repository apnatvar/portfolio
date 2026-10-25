# Validation results — 25 October 2026

## Final result

- Production `npm run build`: passed on Next.js 15.5.28 (33 generated static outputs including metadata handlers, 23 sitemap landing pages). Compilation, build lint and TypeScript validation passed. Explicit `npm run lint` and `npm run typecheck` also passed during integration.
- `npm run test:tools`: 15 deterministic tests passed for existing scheduling and decision calculations.
- `npm run qa:seo`: passed against the final local production server; 23 canonical pages checked for HTTP status, unique titles/descriptions, matching canonical, indexability, social metadata, initial H1/main landmarks, JSON-LD parseability, internal links/fragments, sitemap/prerender coverage, discovery links, robots, noindex test route, and unknown-route 404s.
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npm run qa:browser`: final run passed all 43 specifications in 1.4 minutes. Coverage includes all public routes, responsive widths 320/375/390/768/1440, three display modes, keyboard menus, 200% text resizing, no-JavaScript server content, axe WCAG 2/2.1/2.2 A/AA checks, console/runtime errors, metadata checker positive/negative states and no-network behavior, existing tool calculations/clipboard errors, mocked form success/failure, duplicate-submit lock, draft persistence, malformed API requests, honeypot, origin and oversized-body rejection.
- `npm run qa:lighthouse`: completed six final mobile/desktop reports for Home, Tools and Focus Planner; automated accessibility, best-practices and SEO categories scored 100 on all six. Performance results and non-comparable public/local baseline boundaries are in `docs/seo/performance-baseline.md`.
- Manually reviewed generated homepage screenshots at mobile/desktop sizes. Removed the display-mode popup because it obscured the mobile CTA; retained switcher. Final mobile screenshot shows the primary project CTA. Generated social image endpoint responds 200 with image/png.
- No valid contact message was sent to the external Google Form. No Search Console, analytics account, real-user measurements or schema eligibility service was accessed.

## Failures found and corrected

Initial compile caught a Windows text-encoding error in the edited root layout; normalized it to UTF-8. Sandboxed Chromium, Playwright workers and one subsequent Next.js worker launch failed with EPERM/startup restrictions; successfully ran the required tools with approved process access. These were execution-environment failures, not counted as passing tests.

First browser run: 38 passed and 5 failed. Four failures were stale/ambiguous selectors after intentional homepage/checker changes. The fifth found a real regression: conditional smooth-scroll wrappers remounted the form on display-mode changes, clearing drafts. Fixed the wrapper identity and reran the full suite; all 43 pass. Updated section labels to real headings, preserving useful heading structure. SEO checks passed again after final source changes.

## Limits

Automated axe success is not complete accessibility certification. JSON-LD syntax checks are not vocabulary, eligibility or search-display validation. Local performance cannot establish deployed regressions, field Core Web Vitals, INP or rankings; desktop home LCP remains above 2.5 seconds in the final lab run. CI is prepared in source but has not been run on GitHub. External form receipt, hosting redirects, post-release indexing and owner account configuration remain manual checks. Existing legacy service URLs remain functional rather than being redirected; no renamed existing route required a redirect.

No commit or deployment was made.

## Pre-commit verification

At the owner's subsequent request to test, commit and push, the current change passed a fresh production build, lint, explicit TypeScript check, all 15 deterministic tool tests, all 43 browser specifications (1.4 minutes), and rendered SEO validation of 23 canonical pages. Browser and SEO checks used the newly built production server on port 3002. A separate read-only pre-commit review found no actionable blockers. No application changes were required during this verification. Earlier statements above describe the implementation handoff before this commit request; Git history records the subsequent commit.
