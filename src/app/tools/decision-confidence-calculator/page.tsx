import { DecisionConfidenceCalculator } from "@/components/tools/decision-confidence-calculator";
import { ToolPageHeader } from "@/components/tools/tool-page-header";

export default function DecisionConfidenceCalculatorPage() {
  return (
    <main className="tool-page mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <ToolPageHeader
        title="Decision Confidence Calculator"
        description="Evaluate readiness, risk, evidence and reversibility with a transparent, deterministic decision framework."
      />
      <DecisionConfidenceCalculator />
    </main>
  );
}
