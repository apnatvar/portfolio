# Internal linking

## Current implementation and checks

The App Router uses standard Next.js links for internal navigation. The sitemap is sourced from `src/lib/routes.ts`; contextual service, guide, work, tool, and contact links help users move between related material. `npm run qa:seo` extracts anchor `href` values from sitemap pages, requests internal destinations, checks for successful responses, and verifies in-page fragment targets.

This catches broken destinations in the tested production output. It does not assess whether anchor text is descriptive, whether a page is easy to discover in the full site, or whether a link is useful to a reader.

## Link rules

- Use an actual anchor or Next.js `Link` that renders an `<a href>`; do not rely on click handlers as the only navigation mechanism.
- Write link text that names the destination or action. Avoid repeated generic labels when the context is not clear.
- Link from a guide to the relevant service, from a service to related specialist work, and from work to its evidence and next step where appropriate.
- Keep navigation available without hover and preserve keyboard focus visibility.
- Check fragment IDs when headings or section structure change.

Google notes that crawlable links are generally HTML anchor elements with an `href`; links aid discovery but do not ensure crawling or indexing.

## References

- [Google link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google crawling and indexing overview](https://developers.google.com/search/docs/crawling-indexing)
