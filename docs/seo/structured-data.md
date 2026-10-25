# Structured data

## Current implementation

`src/components/json-ld.tsx` serializes JSON-LD and escapes `<` before injecting the script. `src/lib/site.ts` defines shared site/person identity data. The homepage emits a `ProfilePage`; service details emit `WebPage`, `Service`, and `BreadcrumbList`; other route-level markup is added where the content supports it. The `Service` provider points to the person identity and the service area is worldwide.

The SEO validator parses every emitted `application/ld+json` script with `JSON.parse`. That proves JSON syntax only. It does not check schema vocabulary, property types, page-to-markup agreement, Google feature eligibility, or rich-result display.

## Maintenance rules

- Mark up only information that is visible and accurate on the page. Keep the page text and JSON-LD synchronized.
- Use the narrowest truthful schema type. Do not add Offers, prices, ratings, reviews, FAQs, or outcomes without visible, verified content that supports them.
- Use stable entity IDs and valid absolute URLs. Keep Person identity consistent with the site entity graph.
- After changes, inspect rendered JSON-LD, validate syntax, and use Google's applicable Rich Results Test or Schema Markup Validator when eligibility is relevant.
- A valid script or test pass does not guarantee a rich result or ranking benefit.

## References

- [Google general structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google structured data intro](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld)
