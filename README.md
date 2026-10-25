# AP Portfolio

This is the Next.js portfolio for AP (Apnatva Singh Rawat). The `/tools` area contains browser-only tools for planning focused development work and evaluating decision readiness. Rules and exports live in [`src/lib/tools`](src/lib/tools), with deterministic checks in [`tests/tools-logic.test.ts`](tests/tools-logic.test.ts).

## Browser QA

Install dependencies and Chromium once, then run the public-site browser checks:

```bash
npm ci
npx playwright install chromium
npm run qa:browser
```

Playwright starts the development server on `http://127.0.0.1:3000` if needed. The suite checks public routes and their metadata, internal links, horizontal overflow at 320, 375, 390, 768, and 1440 pixels, the three display modes, keyboard navigation, mocked hire-form responses, both browser tools, and WCAG 2.2 AA axe rules. It captures the home page in all three display modes at 390px and 1440px, and stores browser artifacts in the ignored `.qa-results/` directory. The hire form API is intercepted in the browser, so QA never submits a real message. API validation checks send malformed requests only, which are rejected before external submission.

To check a production build, start the server in one terminal:

```bash
npm run build
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3000
```

Then run the suite in a second PowerShell terminal:

```powershell
$env:PLAYWRIGHT_BASE_URL = "http://127.0.0.1:3000"
npm run qa:browser
```

To check a deployed or already-running site, set `PLAYWRIGHT_BASE_URL` and run the same command. For example, in PowerShell:

```powershell
$env:PLAYWRIGHT_BASE_URL = "https://example.com"
npm run qa:browser
```

## Lighthouse profiling

Use the production server described above, then run the representative mobile and desktop reports in a second terminal:

```bash
npm run qa:lighthouse
```

Set `PLAYWRIGHT_BASE_URL` to profile a deployed or already-running site. Lighthouse reports and metric summaries are written to `.qa-results/lighthouse/`.
Set `LIGHTHOUSE_PAGES=home` to profile only the homepage after changes limited to that route.

## Development

```bash
npm run dev
npm run lint
npm run typecheck
```

## Specialist site architecture

The homepage defaults to a server-rendered technical SEO introduction. Resume and Swiss modes preserve alternate personal portfolio views. Four primary services cover technical SEO (including Next.js implementation), programmatic SEO, SEO automation, and Core Web Vitals. Existing development service URLs remain functional. `/work` preserves all six projects; `/writing` contains three practical guides sourced from official documentation; `/tools/metadata-checker` inspects pasted HTML locally. No public SEO agent skill downloads are claimed.

Shared content: `src/content/portfolio-content.ts`, `src/content/service-pages.ts`, and `src/content/writing.ts`. Add indexable route paths to `src/lib/routes.ts`; sitemap and discovery summaries derive from shared content. Metadata helpers live in `src/lib/metadata.ts`; global identity lives in `src/lib/site.ts`. Generated social artwork is served at `/opengraph-image`.

## Deterministic SEO QA and CI

After building and starting a production server, run `npm run qa:seo` (set `SEO_BASE_URL` if using a port other than 3000). This verifies sitemap coverage, unique titles/descriptions, canonical consistency, indexability, initial H1/main landmarks, JSON-LD syntax, internal links/fragments, robots, machine summaries, and unknown-route 404s. It does not prove indexing, ranking, schema eligibility, or field performance. CI in `.github/workflows/quality.yml` runs lint, tool tests, build, types and rendered SEO checks. Browser accessibility and performance profiling are explicit separate commands.

The contact API keeps Google Form credentials server-only (`GOOGLE_FORM_ACTION`, `GOOGLE_FORM_EMAIL_ENTRY`, `GOOGLE_FORM_MESSAGE_ENTRY`). Provide them through deployment secrets; never expose them through `NEXT_PUBLIC_` variables. Requests reject a filled honeypot, disallowed supplied origins and bodies over 16KiB. These controls do not replace deployment-level rate limits. Local QA mocks successful submissions and never sends synthetic enquiries to the external form.

Strategy, evidence policy, technical audit, measurement limitations, roadmap and implementation results are in `docs/`. The earlier `PORTFOLIO-AUDIT.md` is a historical record from 20 October, not a statement of current production performance. No analytics or tracking scripts were added. Search Console ownership, live submissions, third-party account changes and field monitoring need owner access.
