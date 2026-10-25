# Portfolio audit — 25 October 2026

## Positioning and search intent

The niche is **design-led Next.js development for content-rich websites, catalogues, and useful tools, with technical SEO implemented in the code**. This connects interface design, React/TypeScript work, rendering, performance, and discovery without positioning the portfolio as a general marketing agency.

The homepage and the two practice pages now state that focus in visible copy, titles, descriptions, and links. The expressive homepage headline is retained; the descriptive specialism remains visible in its running head, introduction, and practice heading.

| Destination | Primary query intent | Supporting terms | Page purpose |
| --- | --- | --- | --- |
| `/` | Next.js developer | front-end developer, React developer, technical SEO | Identity, niche, capabilities, and project evidence |
| `/front-end` | Next.js front-end developer | React front-end development, responsive web design, TypeScript | Interface/design practice and concrete implementation examples |
| `/seo` | technical SEO for Next.js | Next.js SEO, JavaScript SEO, rendering and crawlability | Overview of the search specialty and implementation approach |
| `/services/nextjs-developer` | hire a Next.js developer | Next.js development services, existing-codebase work | Engagement scope, deliverables, and fit |
| `/services/technical-seo` | Next.js SEO audit | technical SEO audit and implementation | Diagnostic/implementation engagement; distinct from the practice overview |
| `/services/programmatic-seo` | programmatic SEO implementation | generated pages, data quality, internal linking | Data-backed template and publishing systems |
| `/services/core-web-vitals` | Core Web Vitals optimization | LCP, INP, CLS, Next.js performance | Performance diagnosis and implementation |
| `/writing/*` | implementation/checklist questions | Next.js SEO checklist, programmatic SEO quality gates | Substantial educational references linking to relevant work/services |

These are target query intents, not verified monthly search volumes or ranking claims. Live result sampling showed both hiring/service intent and educational intent for the relevant Next.js/SEO queries. The research tools did not provide keyword volumes, keyword difficulty, or this site's Search Console data. A direct fetch of the deployed homepage was unavailable in the research tool, so production indexing/rankings cannot be inferred from it.

Before assigning volume-based priority, compare the query families in Google Ads Keyword Planner using English/India and any intended international client markets separately. After deployment, review Search Console query/page/country data for impressions, clicks, and actual ranking trends. Do not substitute search-result counts or a Lighthouse score for search-volume or ranking evidence.

## Public work checked

- [Brownsmith Dynamics](https://brownsmithdynamics.com): existing portfolio record for service/product/guide/article pages and internal navigation. This audit did not independently establish traffic or ranking outcomes.
- [ELZA case study](https://github.com/apnatvar/apnatvar/blob/main/Elza%20Case%20Study.pdf): retained as a client case study, not presented as a public source repository or a measured SEO growth claim.
- [Forme](https://github.com/apnatvar/open-workout): public Next.js/React/TypeScript product with IndexedDB storage and validated import/export. The portfolio now includes those inspectable implementation details.
- [Web Development and Online Marketing Skills](https://github.com/apnatvar/web-development-and-online-marketing-skills): added as a public workflow/documentation library covering Next.js builds, optimization, website analysis, and SEO guardrails. It is not described as a client website or a ranking result.
- [Chattybot profile notes](https://github.com/apnatvar): supporting example of a self-hosted, multi-tenant website widget. The owner confirmed the repository has moved to private access; its public URL returned 404 during review. The portfolio now links to the public profile notes instead. No unverified framework or public source availability is attributed to it.

The GitHub profile and selected repository pages were accessible; the chronological repositories tab was not, so this is a reviewed selection rather than a claim to list every latest repository.

## Technical SEO changes

- Narrowed homepage and practice-page titles/descriptions; removed duplicate homepage brand wording and stale social-image text.
- Added the new practice pages to the sitemap/discovery paths and kept their self-canonicals distinct.
- Added breadcrumb and Service JSON-LD to the two practice pages, tied to the existing Person identity.
- Linked practice overviews to scoped service pages, examples, guides, and tools; kept the pages' informational and hiring roles distinct.
- Updated machine-readable summaries to the current front-end/SEO identity and the public workflow library.
- Kept important copy in server output. Moved static practice/notebook text out of the animation client boundary.
- Preloaded the principal Italianno heading font, removed the unused Manufacturing Consent font, and matched browser theme color to the parchment design.

## Code, assets, and dependencies

- Removed confirmed-unreferenced UI/legacy components and the obsolete engineering homepage body; retained the navigation export still used by writing pages.
- Removed unused direct dependencies, including 3D/shader libraries, old scrolling packages, theme/glitch libraries, and the Radix umbrella package. Dialogs now import the direct Radix dialog package.
- Removed the unused SVG webpack rule that referenced an undeclared loader.
- Consolidated the stylesheet cascade and removed obsolete mode, form, menu, and layout selectors while retaining live service/portable/writing styles. The CSS audit snapshot fell from 72,903 to 61,889 source bytes before subsequent small integration changes; this is source size, not a compressed transfer-size benchmark.
- Replaced shared cursor/menu GSAP usage with native requestAnimationFrame/Web Animations so that scroll-animation dependencies remain in routes that need them.
- Replaced Lenis on About/Hire with GSAP ScrollSmoother, keeping native touch/reduced-motion behavior. Fixed navigation is portalled outside transformed smooth content; cleanup runs when leaving those routes.
- Contact notifications use only server-side Telegram credentials. Browser checks mock delivery. At the owner's subsequent explicit request, one labelled test enquiry was sent through the production contact API; Telegram accepted it and the API returned HTTP 200.
- Applied compatible dependency updates and a targeted Next.js PostCSS override. The production-only npm audit reports zero advisories. The full dependency tree still reports 29 development-tool advisories (primarily Lighthouse's transitive tooling); no forced major tool/framework upgrade was applied.

## Verification

- Production build, including lint/types: passed.
- Tool logic: 15 tests passed.
- Rendered SEO: 25 canonical pages passed metadata, JSON-LD syntax, sitemap, internal link/fragment, discovery, robots, and 404 checks.
- Phone/tablet review: 16 combinations across `/`, `/front-end`, `/seo`, and `/hire-ap` at 320/390/768/1024 pixels; no horizontal overflow; the message/email controls fit. Representative screenshots were inspected.
- Live contact verification: one explicitly authorized labelled Telegram test was accepted (HTTP 200).
- Final link review: 94 distinct destinations, comprising 55 internal, 35 external HTTP(S), and 4 non-HTTP contact/app links. No broken or unverified HTTP destinations remain. The reported deployed `/writing/nextjs-performance-workflow` returned HTTP 200. The private Chattybot repository link was replaced with public profile notes. The earlier transient Telegram-profile fetch failure resolved on the final check. A repeatable `npm run qa:links` command now records the link inventory.
- Build bundle report: homepage 168 kB first-load JavaScript, Hire 108 kB, compared with 177 kB each in the previous committed build. This is a build-report comparison, not a real-user performance claim.
- Full browser suite: all 41 tests passed after correcting navigation accessible names, card text contrast, and the test selectors affected by the global message bar. No keyword-volume or ranking outcome is asserted by these checks.

## Primary references

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google: helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Ads: Keyword Planner metrics](https://support.google.com/google-ads/answer/3022575?hl=en)
- [Google: Search Console monitoring](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [Next.js: Metadata and Open Graph images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [GSAP: ScrollSmoother, including fixed positioning and touch behavior](https://gsap.com/docs/v3/Plugins/ScrollSmoother/)
- [Telegram Bot API](https://core.telegram.org/bots/api#sendmessage)
