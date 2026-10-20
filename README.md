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
