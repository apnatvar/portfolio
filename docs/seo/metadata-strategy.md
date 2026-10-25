# Metadata strategy

## Current pattern

`src/lib/metadata.ts` centralizes route metadata through `pageMetadata(title, description, path)`: title, description, canonical, Open Graph title/description/URL/image, and Twitter card/title/description/image. The root layout sets `metadataBase` from `SITE_URL`. Pages with special requirements use local `Metadata` objects or `generateMetadata`, including service details, writing, hire, and tools.

`npm run qa:seo` checks that sitemap pages have a title and description unique within the sitemap set, one canonical URL matching the sitemap URL, an OG title, a Twitter title, and no unintended `noindex`. It checks emitted HTML, not rendered search result appearance.

## Rules for new and changed pages

- Give every indexable route a distinct, accurate title and description that match the visible page and search intent.
- Set a self-referencing canonical for the preferred public route. Normalize links and sitemap entries to the same HTTPS host and path.
- Use absolute URL resolution via the configured metadata base for image and URL metadata. Keep social artwork stable and provide useful alt text where supported.
- Use `noindex` intentionally for private, QA, or duplicate pages; also keep those routes out of the sitemap. `robots.txt` is a crawl rule, not an indexing directive.
- Check generated production HTML after metadata changes. Do not assume that metadata is correct solely because a source helper has the expected values.

## Deployment state

The public fetch on 25 October 2026 reported `AP | Freelance Full-Stack Developer in Dehradun`. This is the pre-change production baseline. The new specialist metadata is implemented and validated locally; this task does not deploy. The generated `/opengraph-image` supplies new brand artwork; existing portrait assets remain available to legacy page-specific social previews.

## References

- [Next.js 15 `metadata` and `generateMetadata`](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)
- [Google title link guidance](https://developers.google.com/search/docs/appearance/title-link)
- [Google snippets and meta descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
