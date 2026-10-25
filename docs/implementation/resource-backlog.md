# Resource backlog (unpublished proposals)

This is an editorial and implementation roadmap only. None of the resources below is currently published, downloadable, installed, or offered as a working product. Do not link to fictitious files or describe a proposal as available. Recheck source documentation and dependency versions before implementation.

## 1. Technical SEO release gate for Next.js App Router

**Proposed format:** A repository skill that guides a developer through a read-only audit and produces a reviewable report. It should not change application files or deploy anything.

- **Inputs:** Repository root; target base URL; route inventory or explicit route globs; intended indexable/private route policy; selected Next.js major/minor version; optional production URL samples. Secrets and authenticated route content are out of scope.
- **Outputs:** Markdown findings grouped by route and severity; checked route list; evidence snippets (file/line or HTTP result); explicit unknowns; proposed remediation notes. No automated fixes in the initial version.
- **Stack:** Node.js LTS, TypeScript, Next.js metadata conventions, standard `fetch`; optionally Playwright for rendered HTML only after the audit can run safely without it. No new dependency until the native implementation is evaluated.
- **Install/source/version:** Not implemented. Proposed as a versioned Codex skill under `skills/nextjs-technical-seo-audit/`; source would be this repository plus official Next.js documentation at the selected version and current Google Search Central docs. Pin the skill release and record audited documentation URLs and access date at publication.
- **Limitations:** Static repository inspection cannot prove deployed response behavior, Googlebot rendering, indexing, canonical selection, rankings, or rich result eligibility. Authenticated pages and production behavior require explicitly supplied access and separate authorization. Reports must distinguish observed facts from inference.
- **Acceptance criteria:** On a fixture project, identify missing/duplicate metadata, mismatched canonicals, route/sitemap inconsistencies, and unsafe robots rules with file or URL evidence; do not report a pass when no evidence was collected; do not modify files; label dynamic or inaccessible cases as unknown; document supported Next.js versions; link only to official primary documentation.

## 2. Programmatic SEO quality-review skill

**Proposed format:** A Codex skill that inspects a sample of generated pages and prepares a human editorial review worksheet before publication. Content usefulness cannot be reduced to a token or word-count score.

- **Inputs:** CSV or JSONL records; declared required/optional fields and validation rules; renderer or page URL list; canonical/indexing policy; intended user task; optional source provenance and freshness fields; sample strategy and reviewer notes.
- **Outputs:** Schema/required-field errors; duplicate normalized URL and canonical candidates; deterministic sample manifest; rendered-page review worksheet; findings report distinguishing mechanical checks from editorial judgments. No bulk publish or auto-index decision.
- **Stack:** Skill instructions and review templates only for the first release; use available local file tools for CSV/JSON and HTML inspection. Do not require a database, hosted service, or extra package. If later tooling is proposed, it needs a separate scope and dependency review.
- **Install/source/version:** Not implemented. Proposed skill source `skills/programmatic-seo-quality-review/SKILL.md`, with versioned templates under that skill. Installation would follow the supported Codex skill mechanism; no installable package currently exists. Guidance sources: official Google Search Central helpful content and spam policies, plus the target framework's route documentation; capture versions/access dates in the eventual changelog.
- **Limitations:** Duplicate detection is heuristic; similarity does not establish duplicate intent. A valid record or mechanically unique page is not proof of people-first value, accuracy, demand, or indexing eligibility. Search Console and user outcome data are outside a local file-only run.
- **Acceptance criteria:** Fixtures cover missing fields, stale dates, invalid identifiers, duplicate URLs, Unicode, punctuation, and optional-field combinations; output is deterministic for the same inputs; invalid required data cannot silently become a publishable record; the report asks a human to verify user-specific value and evidence; no generated page count or word count is presented as a quality score.

## 3. Core Web Vitals investigation skill

**Proposed format:** A Codex skill that guides a developer through a reproducible field-and-lab investigation and produces an evidence notebook. It should help teams compare one route group and release at a time, not promise a target score.

- **Inputs:** Route/template cohort; release identifier and dates; device/browser conditions; lab trace or Lighthouse JSON (optional); available field report export (optional); observed LCP, INP, CLS evidence; issue hypothesis; user task and regression checks.
- **Outputs:** Markdown/CSV baseline and follow-up record; comparison notes with sample sizes and collection windows when supplied; likely bottleneck hypotheses clearly separated from measurements; rollout decision checklist. Missing field data remains “not available,” never inferred from lab results.
- **Stack:** Skill instructions and Markdown notebook template only at first; local tools can inspect user-supplied traces or reports. No hosted analytics backend or additional dependency is required. Potential integrations must use official exports/APIs and respect access scopes.
- **Install/source/version:** Not implemented. Proposed skill source `skills/cwv-investigation/SKILL.md`, with a versioned evidence template beside it. Installation would follow the supported Codex skill mechanism; no installable package or template download currently exists. Reference official web.dev Web Vitals, Chrome DevTools documentation, Next.js versioned docs, PageSpeed Insights, and the current Search Console report documentation. Recheck all UI paths and metric definitions before release.
- **Limitations:** Lab data is a controlled sample, field data is aggregated and may be unavailable or delayed, and cohorts can hide user differences. Correlation does not establish the code change caused a field change. Performance metrics alone do not prove business impact or ranking movement.
- **Acceptance criteria:** Example entries distinguish field from lab evidence; units, URL cohort, collection conditions and release are required metadata; before/after claims require comparable conditions or are labeled incomparable; insufficient samples remain explicit; the worksheet includes correctness, accessibility, and freshness regression checks; no score or outcome guarantee appears in the copy.

## Publication checklist for any proposal

Before publishing a resource, assign an owner, review the official sources and version claims, run the stated acceptance criteria once in a documented environment, inspect accessibility and security, and obtain editorial approval. Add a dated changelog and support boundary. Only then may a real source file or download be linked; until that work is completed these entries remain proposals.
