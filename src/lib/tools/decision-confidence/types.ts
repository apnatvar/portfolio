export type DecisionCategory =
  | "career"
  | "business"
  | "product"
  | "financial"
  | "technical"
  | "personal"
  | "purchase"
  | "other";

export type FactorKey =
  | "reversibility"
  | "informationQuality"
  | "assumptionConfidence"
  | "costOfDelay"
  | "costOfWrong"
  | "potentialUpside"
  | "timePressure"
  | "emotionalPressure"
  | "testability"
  | "longTermAlignment";

export type FactorScores = Record<FactorKey, number>;

export type DecisionInput = {
  title?: string;
  category: DecisionCategory;
  factors: FactorScores;
};

export type RecommendationKey =
  | "decide-now"
  | "gather-information"
  | "run-test"
  | "delay-intentionally"
  | "avoid-reject";

export type ScoreBand = "Low" | "Moderate" | "High";

export type DecisionScores = {
  readiness: number;
  risk: number;
  urgency: number;
  evidence: number;
  reversibility: number;
};

export type DecisionResult = {
  input: DecisionInput;
  scores: DecisionScores;
  bands: Record<keyof DecisionScores, ScoreBand>;
  recommendation: RecommendationKey;
  recommendationLabel: string;
  supportingFactors: string[];
  concerns: string[];
  nextStep: string;
  keyInfluences: string[];
  generatedAt: string;
};
