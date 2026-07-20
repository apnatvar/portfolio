import { formatGeneratedDate } from "@/lib/tools/date-format";
import type { DecisionResult } from "./types";

function linesFor(result: DecisionResult) {
  return [
    "Decision Confidence Result",
    `Decision: ${result.input.title?.trim() || "Untitled decision"}`,
    `Category: ${result.input.category}`,
    `Generated: ${formatGeneratedDate(new Date(result.generatedAt))}`,
    "",
    `Recommendation: ${result.recommendationLabel}`,
    `Readiness: ${result.bands.readiness} (${result.scores.readiness}/100)`,
    `Risk: ${result.bands.risk} (${result.scores.risk}/100)`,
    `Urgency: ${result.bands.urgency} (${result.scores.urgency}/100)`,
    `Evidence: ${result.bands.evidence} (${result.scores.evidence}/100)`,
    `Reversibility: ${result.bands.reversibility} (${result.scores.reversibility}/100)`,
    "",
    "Supporting factors",
    ...result.supportingFactors.map((item) => `- ${item}`),
    "",
    "Concerns",
    ...result.concerns.map((item) => `- ${item}`),
    "",
    "Suggested next step",
    result.nextStep,
    ...(result.input.category === "financial"
      ? ["", "This decision framework is not financial advice."]
      : []),
  ];
}

export function decisionAsPlainText(result: DecisionResult) {
  return linesFor(result).join("\n");
}

export function decisionAsMarkdown(result: DecisionResult) {
  return `${decisionAsPlainText(result)
    .replace("Decision Confidence Result", "# Decision Confidence Result")
    .replace("\nSupporting factors\n", "\n## Supporting factors\n")
    .replace("\nConcerns\n", "\n## Concerns\n")
    .replace("\nSuggested next step\n", "\n## Suggested next step\n")}
`;
}

export function decisionAsJson(result: DecisionResult) {
  return JSON.stringify(result, null, 2);
}
