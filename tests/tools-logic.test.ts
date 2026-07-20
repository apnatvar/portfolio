import assert from "node:assert/strict";
import test from "node:test";
import { calculateDecision, DEFAULT_FACTORS } from "../src/lib/tools/decision-confidence/scoring";
import { generateSchedule, validatePlanner } from "../src/lib/tools/focus-planner/scheduler";
import type { DecisionInput, FactorScores } from "../src/lib/tools/decision-confidence/types";
import type { PlannerTask, PlanningStyle, WorkdaySettings } from "../src/lib/tools/focus-planner/types";

const workday = (style: PlanningStyle = "balanced"): WorkdaySettings => ({
  startTime: "09:00",
  endTime: "17:00",
  lunchDuration: style === "pomodoro" ? 20 : 45,
  style,
});

const task = (id: string, patch: Partial<PlannerTask> = {}): PlannerTask => ({
  id,
  name: `Task ${id}`,
  type: "feature-development",
  duration: 60,
  priority: "medium",
  intensity: "moderate",
  splittable: true,
  fixedTime: false,
  ...patch,
});

test("focus planner: standard balanced day includes all work and breaks", () => {
  const result = generateSchedule(workday(), [task("a", { duration: 100 }), task("b", { duration: 50 })]);
  assert.equal(result.summary.focusMinutes, 150);
  assert.equal(result.unscheduled.length, 0);
  assert.ok(result.blocks.some((block) => block.kind === "short-break"));
});

test("focus planner: Pomodoro uses 25-minute-or-shorter valid chunks", () => {
  const result = generateSchedule(workday("pomodoro"), [task("a", { duration: 60 })]);
  const durations = result.blocks.filter((block) => block.kind === "task").map((block) => block.duration);
  assert.deepEqual(durations, [25, 20, 15]);
  assert.ok(result.blocks.filter((block) => block.kind === "short-break").every((block) => block.duration === 5));
});

test("focus planner: deep-work ordering favors heavy work at equal priority", () => {
  const result = generateSchedule(workday("deep-work"), [
    task("light", { name: "Admin", type: "administration", intensity: "light" }),
    task("heavy", { name: "Architecture", type: "architecture", intensity: "heavy" }),
  ]);
  assert.equal(result.blocks.find((block) => block.kind === "task")?.taskId, "heavy");
});

test("focus planner: work exceeding the day remains visible", () => {
  const result = generateSchedule({ ...workday(), endTime: "10:00" }, [task("large", { duration: 180 })]);
  assert.equal(result.unscheduled.length, 1);
  assert.equal(result.summary.focusMinutes + result.unscheduled[0].remainingMinutes, 180);
});

test("focus planner: splittable work fits gaps while non-splittable work does not", () => {
  const settings = { ...workday(), endTime: "11:00" };
  const fixed = task("meeting", { type: "meeting", duration: 30, fixedTime: true, fixedStart: "10:00" });
  const split = generateSchedule(settings, [fixed, task("split", { duration: 90, splittable: true })]);
  const whole = generateSchedule(settings, [fixed, task("whole", { duration: 90, splittable: false })]);
  assert.ok(split.summary.focusMinutes > fixed.duration);
  assert.equal(whole.unscheduled[0].remainingMinutes, 90);
});

test("focus planner: fixed-time conflicts fail validation", () => {
  const tasks = [
    task("one", { fixedTime: true, fixedStart: "10:00" }),
    task("two", { fixedTime: true, fixedStart: "10:30" }),
  ];
  assert.equal(validatePlanner(workday(), tasks).valid, false);
});

test("focus planner: a short break separates demanding blocks", () => {
  const result = generateSchedule(workday(), [
    task("one", { duration: 50, intensity: "heavy" }),
    task("two", { duration: 50, intensity: "heavy" }),
  ]);
  assert.deepEqual(result.blocks.slice(0, 3).map((block) => block.kind), ["task", "short-break", "task"]);
});

test("focus planner: an empty task list creates an empty result", () => {
  const result = generateSchedule(workday(), []);
  assert.equal(result.blocks.length, 0);
  assert.equal(result.summary.focusMinutes, 0);
  assert.equal(result.unscheduled.length, 0);
});

const decision = (patch: Partial<FactorScores>): DecisionInput => ({
  title: "Test decision",
  category: "technical",
  factors: { ...DEFAULT_FACTORS, ...patch },
});

test("decision calculator: high-readiness reversible decision can be made now", () => {
  const result = calculateDecision(decision({ reversibility: 5, informationQuality: 5, assumptionConfidence: 5, costOfDelay: 5, potentialUpside: 5, longTermAlignment: 5, emotionalPressure: 1, costOfWrong: 2 }));
  assert.equal(result.recommendation, "decide-now");
  assert.equal(result.bands.readiness, "High");
});

test("decision calculator: low information recommends gathering information", () => {
  const result = calculateDecision(decision({ informationQuality: 1, assumptionConfidence: 1, testability: 2 }));
  assert.equal(result.recommendation, "gather-information");
});

test("decision calculator: high-risk irreversible low-upside choice is rejected", () => {
  const result = calculateDecision(decision({ reversibility: 1, costOfWrong: 5, potentialUpside: 1, longTermAlignment: 2 }));
  assert.equal(result.recommendation, "avoid-reject");
  assert.equal(result.bands.risk, "High");
});

test("decision calculator: testable consequential choice recommends a test", () => {
  const result = calculateDecision(decision({ testability: 5, costOfWrong: 4, informationQuality: 3 }));
  assert.equal(result.recommendation, "run-test");
});

test("decision calculator: very low alignment and upside recommends rejection", () => {
  const result = calculateDecision(decision({ longTermAlignment: 1, potentialUpside: 1 }));
  assert.equal(result.recommendation, "avoid-reject");
});

test("decision calculator: conflicting factors return a deterministic recommendation", () => {
  const input = decision({ informationQuality: 2, costOfDelay: 5, testability: 5, costOfWrong: 5 });
  assert.equal(calculateDecision(input).recommendation, calculateDecision(input).recommendation);
  assert.equal(calculateDecision(input).recommendation, "run-test");
});

test("decision calculator: score boundaries stay within zero and one hundred", () => {
  for (const value of [1, 5]) {
    const factors = Object.fromEntries(Object.keys(DEFAULT_FACTORS).map((key) => [key, value])) as FactorScores;
    const result = calculateDecision(decision(factors));
    Object.values(result.scores).forEach((score) => assert.ok(score >= 0 && score <= 100));
  }
});
