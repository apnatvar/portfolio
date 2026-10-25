# Analytics and measurement

## Current state

No analytics implementation or analytics identifiers were found in the current source review. No Search Console export, field Web Vitals data, or analytics account data was supplied. Do not claim that GA4, Clarity, conversion tracking, or SEO performance monitoring is implemented.

`PORTFOLIO-AUDIT.md` contains historical local Lighthouse measurements from 20 October 2026. Those are lab comparisons, not real-user field data, and are not a current production baseline. A current production HTML fetch is useful for response and source verification only; it is not analytics evidence.

## Proposed measurement, not implemented

If measurement is approved, evaluate GA4 and Microsoft Clarity behind a clear consent flow. Use environment-backed placeholders such as `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_CLARITY_PROJECT_ID`; do not commit live IDs or load either vendor tag before the configured consent state permits it. Google documents both basic mode (block tag loading until consent) and advanced consent mode; select the behavior with the site's consent and privacy requirements before implementation.

Start with aggregate page views and a minimal set of non-sensitive navigation events. Defer conversion tracking until the event definition, consent behavior, and destination have been reviewed. Never send form contents, email addresses, names, arbitrary text, or other personal information in analytics events or URL parameters. The contact form's success is not currently an instrumented conversion.

Keep Search Console as the source for search query, page, indexing, and sitemap observations when access is available. Use field Web Vitals for user-experience outcomes; lab Lighthouse data is diagnostic and should be reported separately.

## References

- [Google consent mode setup](https://developers.google.com/tag-platform/security/guides/consent)
- [Basic and advanced consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [Google Search Console URL Inspection](https://support.google.com/webmasters/answer/9012289)
