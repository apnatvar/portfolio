"use client";

import { ResultCard } from "@/components/tools/result-card";
import { ExportActions } from "@/components/tools/export-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  calculateDecision,
  DEFAULT_FACTORS,
  FACTOR_DEFINITIONS,
} from "@/lib/tools/decision-confidence/scoring";
import {
  decisionAsJson,
  decisionAsMarkdown,
  decisionAsPlainText,
} from "@/lib/tools/decision-confidence/exports";
import { formatGeneratedDate } from "@/lib/tools/date-format";
import type {
  DecisionCategory,
  DecisionInput,
  DecisionResult,
  FactorKey,
} from "@/lib/tools/decision-confidence/types";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

const categoryLabels: Record<DecisionCategory, string> = {
  career: "Career",
  business: "Business",
  product: "Product",
  financial: "Financial",
  technical: "Technical",
  personal: "Personal",
  purchase: "Purchase",
  other: "Other",
};

const initialInput: DecisionInput = {
  title: "",
  category: "technical",
  factors: DEFAULT_FACTORS,
};

const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50";

function scaleValueLabel(value: number, low: string, high: string) {
  if (value === 1) return low;
  if (value === 5) return high;
  if (value === 2) return "Leans low";
  if (value === 4) return "Leans high";
  return "Middle";
}

export function DecisionConfidenceCalculator() {
  const [input, setInput] = useState<DecisionInput>(initialInput);
  const [result, setResult] = useState<DecisionResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  function updateFactor(key: FactorKey, value: number) {
    setInput((current) => ({ ...current, factors: { ...current.factors, [key]: value } }));
    setResult(null);
  }

  function calculate() {
    try {
      setResult(calculateDecision(input));
      setErrors([]);
    } catch (error) {
      setResult(null);
      setErrors([error instanceof Error ? error.message : "Check the factor scores."]);
    }
  }

  function reset() {
    setInput({ ...initialInput, factors: { ...DEFAULT_FACTORS } });
    setResult(null);
    setErrors([]);
  }

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
      <form
        className="tool-controls space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          calculate();
        }}
        noValidate
      >
        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6" aria-labelledby="decision-details-title">
          <h2 id="decision-details-title" className="text-xl font-medium">Decision details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="decision-title">Decision title <span className="font-normal text-muted-foreground">(optional)</span></Label>
              <Input id="decision-title" value={input.title ?? ""} placeholder="e.g. Adopt a new framework" onChange={(event) => { setInput({ ...input, title: event.target.value }); setResult(null); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decision-category">Category</Label>
              <select id="decision-category" className={selectClass} value={input.category} onChange={(event) => { setInput({ ...input, category: event.target.value as DecisionCategory }); setResult(null); }}>
                {Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
          </div>
          {input.category === "financial" ? (
            <p className="mt-4 rounded-xl border p-3 text-sm text-muted-foreground">
              This is a general decision framework, not financial advice.
            </p>
          ) : null}
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6" aria-labelledby="decision-factors-title">
          <h2 id="decision-factors-title" className="text-xl font-medium">Factors</h2>
          <p className="mt-1 text-sm text-muted-foreground">Use the five-point scales. A middle score is a reasonable neutral starting point.</p>
          <div className="mt-6 divide-y divide-border">
            {FACTOR_DEFINITIONS.map((factor) => {
              const value = input.factors[factor.key];
              return (
                <div key={factor.key} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Label htmlFor={`factor-${factor.key}`} className="text-base">{factor.label}</Label>
                      <p id={`factor-${factor.key}-help`} className="mt-1 text-sm leading-6 text-muted-foreground">{factor.helper}</p>
                    </div>
                    <output htmlFor={`factor-${factor.key}`} className="shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium">
                      {value}/5 · {scaleValueLabel(value, factor.lowLabel, factor.highLabel)}
                    </output>
                  </div>
                  <input
                    id={`factor-${factor.key}`}
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={value}
                    onChange={(event) => updateFactor(factor.key, Number(event.target.value))}
                    aria-describedby={`factor-${factor.key}-help factor-${factor.key}-ends`}
                    className="mt-4 h-2 w-full cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <div id={`factor-${factor.key}-ends`} className="mt-2 flex justify-between gap-4 text-xs text-muted-foreground">
                    <span>1 — {factor.lowLabel}</span><span className="text-right">5 — {factor.highLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {errors.length ? <div role="alert" className="rounded-xl border border-destructive/50 bg-destructive/5 p-4 text-sm">{errors.join(" ")}</div> : null}
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Calculate readiness</Button>
          <Button type="button" variant="outline" onClick={reset}><RotateCcw aria-hidden="true" /> Reset</Button>
        </div>
      </form>

      <ResultCard id="decision-result" title="Decision preview" description="A structured readiness check, not open-ended or professional advice." className="lg:sticky lg:top-6">
        {!result ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground" aria-live="polite">
            Score each factor and select “Calculate readiness” to see the result.
          </div>
        ) : (
          <div aria-live="polite" aria-atomic="true">
            <p className="mb-4 text-xs text-muted-foreground">
              Generated {formatGeneratedDate(new Date(result.generatedAt))} · {categoryLabels[result.input.category]}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Recommendation</p>
            <h3 className="mt-2 text-3xl font-medium tracking-tight">{result.recommendationLabel}</h3>
            <p className="mt-2 text-sm text-muted-foreground">For: {result.input.title?.trim() || "Untitled decision"}</p>

            <div className="mt-6 space-y-4">
              <ScoreRow label="Decision readiness" score={result.scores.readiness} band={result.bands.readiness} />
              <ScoreRow label="Risk level" score={result.scores.risk} band={result.bands.risk} />
              <ScoreRow label="Evidence quality" score={result.scores.evidence} band={result.bands.evidence} />
              <ScoreRow label="Reversibility" score={result.scores.reversibility} band={result.bands.reversibility} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <FactorList title="Supporting factors" items={result.supportingFactors} />
              <FactorList title="Concerns" items={result.concerns} />
            </div>

            <div className="mt-5 rounded-xl bg-muted p-4">
              <h3 className="font-medium">Suggested next step</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{result.nextStep}</p>
            </div>

            <details className="mt-5 rounded-xl border p-4">
              <summary className="cursor-pointer font-medium">How this result is calculated</summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Readiness combines evidence, reversibility, urgency, upside, long-term alignment and emotional calm. Risk emphasizes the cost of error and difficulty of reversing course. Explicit rules then select the recommendation.
              </p>
              <p className="mt-3 text-sm"><span className="font-medium">Key influences:</span> {result.keyInfluences.join(", ")}.</p>
              <p className="mt-2 text-sm"><span className="font-medium">Urgency:</span> {result.bands.urgency} ({result.scores.urgency}/100).</p>
            </details>
            {result.input.category === "financial" ? <p className="mt-5 text-xs text-muted-foreground">This framework is not financial advice.</p> : null}
            <div className="mt-5 border-t pt-5">
              <ExportActions
                filename="decision-confidence-result"
                markdown={decisionAsMarkdown(result)}
                json={decisionAsJson(result)}
                plainText={decisionAsPlainText(result)}
              />
            </div>
          </div>
        )}
      </ResultCard>
    </div>
  );
}

function ScoreRow({ label, score, band }: { label: string; score: number; band: string }) {
  return <div><div className="mb-2 flex items-center justify-between gap-3 text-sm"><span>{label}</span><span className="font-medium">{band} · {score}/100</span></div><Progress value={score} aria-label={`${label}: ${band}, ${score} out of 100`} /></div>;
}

function FactorList({ title, items }: { title: string; items: string[] }) {
  return <section className="rounded-xl border p-4"><h3 className="font-medium">{title}</h3><ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-5 text-muted-foreground">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}
