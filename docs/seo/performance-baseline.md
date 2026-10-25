# Performance baseline and final lab review — 25 October 2026

## Conditions and evidence boundaries

Baseline: public https://apnatva.dev before deployment of this task. Final: local optimized production build at http://127.0.0.1:3000. Lighthouse 12.8.2, Headless Chrome 156, Windows host; default script mobile/desktop settings and cold navigation. One run per page/profile. The public baseline ran while browser QA was active; final local measurements ran after QA. Different hosting, network, cache and host-load conditions make this an observational comparison, not a controlled causal experiment. Neither is field data.

Raw local HTML payload: public 115,597 bytes; final 54,803 bytes (decoded HTML, not compressed wire bytes). Final Next.js build estimates homepage first-load JavaScript at 112 kB and checker at 109 kB. Lighthouse total/script transfers below include network-loaded and prefetched resources and differ from build estimates. No new production dependencies or tracking scripts were added.

## Measurements

| Context / route | Profile | Score | FCP s | LCP s | TBT ms | CLS | Modelled TTFB ms | Total KiB | Script KiB |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Public baseline / home | desktop | 60 | 1.23 | 1.75 | 713 | 0.000 | 704 | 397.7 | 233.2 |
| Public baseline / home | mobile | 68 | 1.44 | 3.48 | 1052 | 0.008 | 902 | 382.1 | 233.4 |
| Final local / focus-planner | desktop | 83 | 1.21 | 2.41 | 102 | 0.000 | 452 | 204.9 | 133.5 |
| Final local / focus-planner | mobile | 97 | 1.21 | 2.41 | 104 | 0.000 | 452 | 204.9 | 133.5 |
| Final local / home | desktop | 79 | 1.21 | 2.76 | 130 | 0.000 | 453 | 323.2 | 219.6 |
| Final local / home | mobile | 97 | 1.21 | 2.41 | 108 | 0.048 | 452 | 323.2 | 219.6 |
| Final local / tools | desktop | 85 | 1.21 | 2.25 | 94 | 0.000 | 452 | 224.3 | 147.3 |
| Final local / tools | mobile | 96 | 1.21 | 2.59 | 97 | 0.000 | 453 | 218.1 | 145.0 |

TTFB is the Lighthouse modelled navigation metric (`metrics.timeToFirstByte`), not measured origin latency or a real-user percentile. All six final reports scored 100 for automated accessibility, best practices and SEO. Automated category scores do not establish complete accessibility or technical SEO correctness.

## Interpretation and remaining work

The default homepage now sends useful Server Component HTML and does not mount the ribbon/shader/horizontal work animation stack. Alternate home renderers load on selection. Smooth-scroll code is deferred to existing About/Hire animated experiences with a stable provider boundary. Decorative font preloads were reduced; all font variants still use swap.

Final local mobile home LCP 2.41s and CLS 0.048 are within the numerical good thresholds, but this is one lab navigation. Desktop home LCP 2.76s and mobile tools LCP 2.59s remain above 2.5s. Further investigation should trace text/font LCP, global CSS/font loading, hydration and navigation prefetch in comparable deployed runs before changing behavior. Existing animated About/Hire routes still carry additional JavaScript and were regression-tested but not newly Lighthouse-profiled.

Field INP, 75th-percentile LCP/CLS, Search Console Web Vitals groups and conversion impact are unavailable. TBT is not INP; no field pass, ranking improvement, traffic lift or business outcome is claimed. Collect field data after release and compare the same deployed environment across repeated runs.

## Reproduction

Build with `npm run build`, start using `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3000`, then run `npm run qa:lighthouse`. Use `PLAYWRIGHT_BASE_URL` for another target and `LIGHTHOUSE_PAGES=home` for a focused run. Browser launch requires a permitted local Chromium process. Full JSON/HTML reports are ignored local artifacts under:

- `.qa-results/lighthouse/2026-10-25T07-09-52-844Z`
- `.qa-results/lighthouse/2026-10-25T07-14-58-185Z`

Earlier profiling attempts failed because sandboxed Chromium could not launch; the reported measurements are the successful runs outside that restriction. Historical 20 October reports remain separate in PORTFOLIO-AUDIT.md.
