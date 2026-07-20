import { NEXT_STEPS, RECOMMENDATION_LABELS, selectRecommendation } from "./recommendations";
import type {
  DecisionInput,
  DecisionResult,
  FactorKey,
  FactorScores,
  ScoreBand,
} from "./types";

export type FactorDefinition = {
  key: FactorKey;
  label: string;
  lowLabel: string;
  highLabel: string;
  helper: string;
};

export const FACTOR_DEFINITIONS: FactorDefinition[] = [
  { key: "reversibility", label: "Reversibility", lowLabel: "Hard to undo", highLabel: "Easy to undo", helper: "How easily can you change course after deciding?" },
  { key: "informationQuality", label: "Information quality", lowLabel: "Weak evidence", highLabel: "Strong evidence", helper: "How reliable and relevant is what you know?" },
  { key: "assumptionConfidence", label: "Confidence in assumptions", lowLabel: "Mostly guesses", highLabel: "Well supported", helper: "How well have your key assumptions held up?" },
  { key: "costOfDelay", label: "Cost of delay", lowLabel: "Little cost", highLabel: "Major cost", helper: "What do you lose by waiting?" },
  { key: "costOfWrong", label: "Cost of being wrong", lowLabel: "Minor downside", highLabel: "Serious downside", helper: "How damaging would a poor choice be?" },
  { key: "potentialUpside", label: "Potential upside", lowLabel: "Limited upside", highLabel: "Major upside", helper: "How valuable could a good outcome be?" },
  { key: "timePressure", label: "Time pressure", lowLabel: "No rush", highLabel: "Immediate", helper: "How soon must a choice be made?" },
  { key: "emotionalPressure", label: "Emotional pressure", lowLabel: "Calm", highLabel: "Highly charged", helper: "How much could emotion be narrowing your view?" },
  { key: "testability", label: "Ability to run a small test", lowLabel: "Cannot test", highLabel: "Easy to test", helper: "Can you validate part of the choice before committing?" },
  { key: "longTermAlignment", label: "Alignment with long-term goals", lowLabel: "Poor fit", highLabel: "Strong fit", helper: "Does this move you toward what matters over time?" },
];

export const DEFAULT_FACTORS: FactorScores = {
  reversibility: 3,
  informationQuality: 3,
  assumptionConfidence: 3,
  costOfDelay: 3,
  costOfWrong: 3,
  potentialUpside: 3,
  timePressure: 3,
  emotionalPressure: 3,
  testability: 3,
  longTermAlignment: 3,
};

function normalized(value: number) {
  return (value - 1) * 25;
}

function roundedWeighted(parts: Array<[number, number]>) {
  return Math.round(parts.reduce((total, [value, weight]) => total + normalized(value) * weight, 0));
}

export function scoreBand(score: number): ScoreBand {
  if (score < 40) return "Low";
  if (score < 70) return "Moderate";
  return "High";
}

export function validateDecisionInput(input: DecisionInput) {
  const errors: string[] = [];
  FACTOR_DEFINITIONS.forEach(({ key, label }) => {
    const value = input.factors[key];
    if (!Number.isInteger(value) || value < 1 || value > 5) errors.push(`${label} must be scored from 1 to 5.`);
  });
  return errors;
}

type Influence = { key: FactorKey; positive: number; support: string; concern: string };

function getInfluences(factors: FactorScores): Influence[] {
  return [
    { key: "reversibility", positive: factors.reversibility, support: "The choice is relatively easy to reverse.", concern: "The choice may be difficult to unwind." },
    { key: "informationQuality", positive: factors.informationQuality, support: "The available information is strong.", concern: "The evidence base is limited." },
    { key: "assumptionConfidence", positive: factors.assumptionConfidence, support: "Core assumptions are well supported.", concern: "Important assumptions remain uncertain." },
    { key: "costOfDelay", positive: factors.costOfDelay, support: "Waiting carries a meaningful cost.", concern: "There is little penalty for waiting." },
    { key: "costOfWrong", positive: 6 - factors.costOfWrong, support: "The downside of a mistake is contained.", concern: "A wrong choice could be costly." },
    { key: "potentialUpside", positive: factors.potentialUpside, support: "The potential upside is meaningful.", concern: "The potential upside appears limited." },
    { key: "timePressure", positive: factors.timePressure, support: "A timely choice has practical value.", concern: "External pressure may be forcing the pace." },
    { key: "emotionalPressure", positive: 6 - factors.emotionalPressure, support: "The decision is being considered calmly.", concern: "High emotion may be distorting the assessment." },
    { key: "testability", positive: factors.testability, support: "A small validation test is feasible.", concern: "The choice is difficult to test safely." },
    { key: "longTermAlignment", positive: factors.longTermAlignment, support: "The option aligns with long-term goals.", concern: "The option has weak long-term alignment." },
  ];
}

export function calculateDecision(input: DecisionInput, generatedAt: Date = new Date()): DecisionResult {
  const errors = validateDecisionInput(input);
  if (errors.length) throw new Error(errors.join(" "));
  const f = input.factors;

  // Weighted composite scores (weights total 1.0):
  // evidence = information 60%, assumptions 40%; urgency = delay cost 60%,
  // time pressure 40%; risk = error cost 45%, irreversibility 25%, emotion
  // 15%, weak information 15%; readiness balances evidence 25%, reversibility
  // 15%, urgency 15%, upside 15%, alignment 20%, and emotional calm 10%.
  const evidence = roundedWeighted([[f.informationQuality, 0.6], [f.assumptionConfidence, 0.4]]);
  const reversibility = Math.round(normalized(f.reversibility));
  const urgency = roundedWeighted([[f.costOfDelay, 0.6], [f.timePressure, 0.4]]);
  const risk = roundedWeighted([
    [f.costOfWrong, 0.45],
    [6 - f.reversibility, 0.25],
    [f.emotionalPressure, 0.15],
    [6 - f.informationQuality, 0.15],
  ]);
  const readiness = roundedWeighted([
    [1 + evidence / 25, 0.25],
    [f.reversibility, 0.15],
    [1 + urgency / 25, 0.15],
    [f.potentialUpside, 0.15],
    [f.longTermAlignment, 0.2],
    [6 - f.emotionalPressure, 0.1],
  ]);
  const scores = { readiness, risk, urgency, evidence, reversibility };
  const recommendation = selectRecommendation(scores, f);
  const influences = getInfluences(f);
  const supportingFactors = [...influences]
    .sort((a, b) => b.positive - a.positive)
    .slice(0, 3)
    .map((item) => item.support);
  const concerns = [...influences]
    .sort((a, b) => a.positive - b.positive)
    .slice(0, 3)
    .map((item) => item.concern);
  const definitionByKey = new Map(FACTOR_DEFINITIONS.map((item) => [item.key, item.label]));
  const keyInfluences = [...influences]
    .sort((a, b) => Math.abs(b.positive - 3) - Math.abs(a.positive - 3))
    .slice(0, 4)
    .map((item) => `${definitionByKey.get(item.key)} (${f[item.key]}/5)`);

  return {
    input,
    scores,
    bands: {
      readiness: scoreBand(readiness),
      risk: scoreBand(risk),
      urgency: scoreBand(urgency),
      evidence: scoreBand(evidence),
      reversibility: scoreBand(reversibility),
    },
    recommendation,
    recommendationLabel: RECOMMENDATION_LABELS[recommendation],
    supportingFactors,
    concerns,
    nextStep: NEXT_STEPS[recommendation],
    keyInfluences,
    generatedAt: generatedAt.toISOString(),
  };
}
