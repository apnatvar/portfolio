# Information architecture

## Current service structure

- `/services` is the index for the four primary specialist offers.
- `/services/technical-seo` covers technical SEO, including Next.js-specific SEO implementation.
- `/services/programmatic-seo` covers scalable page systems and publishing controls.
- `/services/seo-automation` covers AI-assisted metadata, content QA, issue classification, link suggestions, and repeatable checks with human review.
- `/services/core-web-vitals` covers loading, interaction, and visual stability diagnosis.
- Legacy service routes remain functional for existing links and search discovery, but are not featured in the primary service index or specialist related-service links.

## Supporting paths

Service pages link to related specialist services and to `/work`, `/tools`, `/writing`, and `/hire-ap`. `/work` is a server-rendered project index preserving all six existing projects. Writing guides support informational intent and link back to an appropriate service.

## Linking rules

- Use descriptive link labels that explain the destination.
- Guides currently share a small related-resource set spanning technical SEO, programmatic SEO, performance, work and tools; narrow it when more specialised articles are added.
- Keep service pages accessible from the services index and relevant portfolio or guide context.
- Preserve canonical URLs and legacy routes unless a migration plan explicitly changes them.
- Do not add a `/skills` route; it is not published.
