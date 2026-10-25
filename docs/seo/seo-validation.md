# SEO validation

## Automated release gate

Run `npm run qa:seo` against a production build. `.github/workflows/quality.yml` runs it after lint, tool tests, build, and typecheck. The script reads `SEO_BASE_URL` or defaults to `http://127.0.0.1:3000`; the canonical host is currently fixed as `https://apnatva.dev`.

The validator checks:

- Sitemap response, route population, URL host, uniqueness, and exclusion of `/test`.
- HTTP 200 for sitemap routes and successful internal links; valid fragment targets.
- Unique page titles and descriptions, one canonical matching each sitemap URL, no unintended `noindex`, OG/Twitter titles, one server-rendered H1 and one main landmark.
- JSON-LD JSON syntax, robots sitemap declaration, `/llms.txt` and `/llms-full.txt` availability and listed URLs.
- Unknown service/guide/general routes return 404; `/test` is noindex.
- Prerendered HTML routes are represented in the sitemap, excluding known metadata/static and test routes.

This gate is source-output and HTTP regression coverage. It makes no claim about Google's crawling, indexing, selected canonical, search appearance, rich-result eligibility, traffic, or real-user performance.

## Manual post-deploy review

1. Confirm the production revision and representative HTML response match the release.
2. Inspect important URLs and sitemap processing in Search Console when authorized access exists.
3. Test applicable structured-data eligibility separately; syntax success is not eligibility.
4. Compare lab runs under recorded settings and report them as lab data. Use field data for real-user Web Vitals.
5. Recheck redirects, metadata, internal link paths, consent behavior, and any analytics events after relevant changes.

## Historical report boundary

The measurements and validation claims in `PORTFOLIO-AUDIT.md` are dated 20 October 2026 and concern local builds at that point. They are useful as historical context, not proof of current production state. The production homepage fetch supplied for this review returned HTTP 200 and an older full-stack/Dehradun title, so reconcile the deployed revision before comparing new work to the repository's present metadata.

## References

- [Google Search JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds)
