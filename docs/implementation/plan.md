# Implementation plan — 2026-10-25

## Baseline and decisions
Next.js 15.5.28 / React 19 / TypeScript / Tailwind 4. Existing creative, resume and Swiss display modes, Google Forms proxy, two browser-only planning tools, personal links, notes and prototypes remain supported. Git worktree clean at discovery. Existing SEO includes Metadata API, entity JSON-LD, robots, sitemap and machine summaries, but dominant identity is general full-stack development with local keyword variants. Homepage creative renderer loads decorative graphics and animation; metadata repeats old positioning. No connected Search Console or field performance data.

## Work packages and order
1. Inspect source/routes/dependencies/history, production response and official Next15/Google guidance. Record evidence boundaries and baseline artifacts.
2. Shared identity/profile/project/navigation/contact copy (bounded agent). Services and schema (bounded agent). Writing and local metadata checker (bounded agent). Root integrates architecture, homepage, work index, machine routes, QA and docs.
3. Homepage: server-rendered specialist introduction, four service pillars, technical scope, actual engineering evidence, methodology, tools, guides and international contact. Retain existing display modes for personal profile; pass a server-rendered default homepage through a small client selector so initial indexable HTML does not depend on animation. Preserve warm palette and typographic identity.
4. Consolidate Next.js SEO with technical SEO rather than publish overlapping landing pages. Keep three existing service URLs. Add distinct programmatic SEO, automation and performance pages. Add /work and /writing with shared content and crosslinks. Do not publish fictional skills; private backlog only.
5. Align person/site schema, metadata/social images, sitemap registry, llms summaries and page breadcrumbs. No invented credentials, reviews, results, locations, prices or schema eligibility.
6. Build deterministic HTTP SEO checker and CI using existing tooling. Extend browser checks to new routes and update expectations only for deliberately changed homepage behavior. Add contact abuse controls without new infrastructure.
7. After application implementation: build, types, lint, tool regression, HTTP SEO validation, browser responsive/accessibility/contact/tool regression, and lab performance on production server. Fix observed failures. No commits or deployment.
8. Record measured results versus available baseline, implementation limitations, maintenance guidance and manual account follow-up.

## Acceptance and tradeoffs
Server HTML contains identity and useful internal links; all public indexable routes have distinct titles/descriptions/canonicals and truthful schema; sitemap includes indexable routes and excludes /test. Existing projects/routes/forms/tools remain functional. Avoid speculative SEO case studies, duplicate keyword pages, and unsupported AI citation promises. Existing historic project sources are evidence of reported implementation, not independently verified client outcomes. No dependency additions or unnecessary tracking.
