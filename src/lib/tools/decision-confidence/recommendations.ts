import type { DecisionScores, FactorScores, RecommendationKey } from "./types";

export const RECOMMENDATION_LABELS: Record<RecommendationKey, string> = {
  "decide-now": "Decide now",
  "gather-information": "Gather more information",
  "run-test": "Run a small test",
  "delay-intentionally": "Delay intentionally",
  "avoid-reject": "Avoid or reject",
};

export const NEXT_STEPS: Record<RecommendationKey, string> = {
  "decide-now":
    "Write down the choice and its main assumption, then set a near-term review point before committing.",
  "gather-information":
    "Identify the single uncertainty most likely to change the choice and collect one reliable piece of evidence about it.",
  "run-test":
    "Define the smallest reversible test, its success signal and a strict limit on time or money before starting.",
  "delay-intentionally":
    "Choose a specific review date and state what new information you expect to have by then.",
  "avoid-reject":
    "Record the reason for declining and the conditions that would need to change before reconsidering.",
};

// Rules are ordered deliberately. Strong avoid signals take precedence, followed
// by cheap validation opportunities, evidence gaps, intentional delay, and only
// then readiness to commit. Every branch returns fixed, reviewable language.
export function selectRecommendation(scores: DecisionScores, factors: FactorScores): RecommendationKey {
  const avoidSignals = [
    factors.costOfWrong >= 4,
    factors.longTermAlignment <= 2,
    factors.potentialUpside <= 2,
    factors.reversibility <= 2,
  ].filter(Boolean).length;

  if (avoidSignals >= 3 || (factors.longTermAlignment === 1 && factors.potentialUpside <= 2)) {
    return "avoid-reject";
  }
  if (factors.testability >= 4 && factors.costOfWrong >= 3 && (scores.evidence < 75 || scores.risk >= 55)) {
    return "run-test";
  }
  if ((factors.informationQuality <= 2 || factors.assumptionConfidence <= 2) && factors.timePressure <= 4) {
    return "gather-information";
  }
  if (factors.timePressure <= 2 && factors.costOfDelay <= 2 && scores.evidence < 75) {
    return "delay-intentionally";
  }
  if (
    scores.readiness >= 70 &&
    factors.informationQuality >= 3 &&
    (factors.reversibility >= 3 || scores.evidence >= 70) &&
    factors.costOfDelay >= 3
  ) {
    return "decide-now";
  }
  if (factors.testability >= 4 && factors.costOfWrong >= 3) return "run-test";
  if (scores.evidence < 60) return "gather-information";
  if (factors.longTermAlignment <= 2 && factors.potentialUpside <= 2) return "avoid-reject";
  if (scores.urgency < 45) return "delay-intentionally";
  return "decide-now";
}
