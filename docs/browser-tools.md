# Browser tools maintenance guide

The `/tools` collection contains two static, client-side utilities. Both use local React state and lose all input when the tab closes. They do not call APIs, persist data, or require an account.

## Developer Focus Planner

The source is split by responsibility:

- `src/lib/tools/focus-planner/config.ts` contains style durations, break cadence, type labels, and flexible-block rules.
- `src/lib/tools/focus-planner/scheduler.ts` contains parsing, validation, anchor handling, sorting, block generation, and summaries.
- `src/lib/tools/focus-planner/exports.ts` serializes an existing result without recalculating it.
- `src/components/tools/focus-planner.tsx` owns temporary form state and accessible rendering.

Scheduling uses five-minute precision and never creates a task block shorter than 15 minutes. Fixed meetings and an optional fixed long break are validated and placed first. Remaining tasks are ordered by priority, then cognitive demand, with deep-work-friendly types receiving a tie-breaker in Deep work mode. Heavy blocks are separated by a break when space permits. Non-splittable work is placed only when a complete gap exists; every remaining minute is reported as unscheduled.

Style defaults:

- Balanced: 50 minutes focus, 10 minutes rest, long break after about three blocks.
- Deep work: 90 minutes focus, 20 minutes rest, long break after about two blocks.
- Pomodoro: 25 minutes focus, 5 minutes rest, long break after four blocks.
- Flexible: 30–90 minute blocks derived from task type and intensity, then 10–20 minute rests.

## Decision Confidence Calculator

The source is similarly separated:

- `src/lib/tools/decision-confidence/scoring.ts` contains factor definitions, validation, weights, composite scores, bands, and influence ranking.
- `src/lib/tools/decision-confidence/recommendations.ts` contains ordered rules and fixed next-step templates.
- `src/lib/tools/decision-confidence/exports.ts` serializes a completed result.
- `src/components/tools/decision-confidence-calculator.tsx` owns temporary form state and rendering.

Composite weights are documented directly above the calculation. Evidence is 60% information quality and 40% assumption confidence. Urgency is 60% cost of delay and 40% time pressure. Risk is 45% cost of error, 25% irreversibility, 15% emotional pressure, and 15% weak information. Readiness combines evidence (25%), reversibility (15%), urgency (15%), upside (15%), long-term alignment (20%), and emotional calm (10%).

Recommendation precedence is intentional: strong reject signals, a safe small-test opportunity, evidence gaps, intentional delay, high readiness, then deterministic fallbacks. Change rule order only with matching boundary tests.

## Exports and print

Both tools provide browser-native print/PDF, Markdown, JSON, and clipboard text. Downloads use object URLs that are revoked immediately. Print CSS removes the form, footer, export controls, support copy, and navigation link while retaining the title, generation date, inputs needed to identify the result, result summary, and overflow/concern details.

## Verification

Run:

```sh
npm run test:tools
npm run typecheck
npm run lint
npm run build
```

The native suite covers the requested scheduling styles, overflow, split rules, fixed conflicts, breaks, empty input, decision archetypes, conflicting inputs, and score boundaries without a third-party test framework.

Manual release checks:

1. Generate each default result at desktop and mobile widths.
2. Confirm planner tables become stacked cards below the medium breakpoint.
3. Open print preview and confirm controls and the global footer are absent.
4. Download one Markdown and one JSON file from each tool and open them.
5. Copy each text export and confirm the live “Copied” announcement.
6. Select Financial in the calculator and confirm the disclaimer appears on screen, in print, and in text exports.
