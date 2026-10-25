# Technical SEO audit

## Current review snapshot

A direct public production fetch on 25 October 2026 returned HTTP 200, a 115,597-byte HTML response, the title `AP | Freelance Full-Stack Developer in Dehradun`, and the H1 `Apnatva Singh Rawat`. The current repository homepage metadata instead positions AP as a Next.js Technical SEO Engineer. This is the pre-change public baseline. Changes in this task are local and have not been deployed. Production also returned 200 for About, Hire, Services, Tools, robots and sitemap; their titles retained general development positioning. The public sitemap listed 13 routes; the implementation expands it to 23 canonical pages.

No Google Search Console access/export, field Web Vitals dataset, or analytics implementation was found in the current source review. Do not infer indexing, rankings, traffic, user experience, or conversion performance from HTTP and HTML checks alone.

## Current implementation

- Next.js 15 App Router pages are server-rendered and expose titles, descriptions, canonicals, Open Graph, and Twitter metadata through route metadata or `src/lib/metadata.ts`.
- `src/lib/routes.ts` provides the indexable route list. `src/app/sitemap.ts` uses it; `src/app/robots.ts` allows public paths and points to the sitemap.
- `/test` is explicitly excluded from indexing and from the sitemap.
- `npm run qa:seo` fetches the sitemap routes and checks HTTP status, unique title and description, a single matching canonical, robots directives, OG/Twitter titles, one server-rendered H1 and main landmark, JSON-LD parseability, internal links and fragments, robots and discovery endpoints, unknown-route 404s, `/test` noindex, and sitemap coverage of prerendered pages.
- `.github/workflows/quality.yml` runs lint, deterministic tool tests, a production build, typecheck, and `qa:seo` against the built application.

The SEO script is an implementation regression check. It does not query Google, prove crawling or indexing, validate schema vocabulary or rich-result eligibility, assess page usefulness, or measure real-user experience.

## Production versus historical evidence

`PORTFOLIO-AUDIT.md` is a historical report dated 20 October 2026. Its before/after Lighthouse comparisons describe local production builds at that time, not current production or field data. It reports no field INP data and says homepage lab LCP remained above its objective. Re-run comparable lab checks before using those figures as a current baseline; use field data for real-user Web Vitals when available.

## Next review steps

1. Confirm the production deployment, title, canonical, source revision, and redirect behavior agree with the intended repository state.
2. Run `npm run qa:seo` against the built site and retain its result with the release.
3. With authorized Search Console access, review URL inspection, indexing, sitemap processing, and query/page trends; record the date and scope.
4. Establish an approved field performance source before making Core Web Vitals outcome claims.

## References

- [Next.js 15 metadata API](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)
- [Next.js sitemap convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google Search JavaScript guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google technical requirements](https://developers.google.com/search/docs/essentials/technical)
