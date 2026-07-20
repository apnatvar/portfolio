export type PlanningStyle = "balanced" | "deep-work" | "pomodoro" | "flexible";

export type TaskType =
  | "feature-development"
  | "debugging"
  | "architecture"
  | "code-review"
  | "documentation"
  | "testing"
  | "research"
  | "administration"
  | "meeting"
  | "custom";

export type Priority = "low" | "medium" | "high" | "critical";
export type CognitiveIntensity = "light" | "moderate" | "heavy";

export type PlannerTask = {
  id: string;
  name: string;
  type: TaskType;
  duration: number;
  priority: Priority;
  intensity: CognitiveIntensity;
  splittable: boolean;
  fixedTime: boolean;
  fixedStart?: string;
};

export type WorkdaySettings = {
  startTime: string;
  endTime: string;
  lunchDuration: number;
  fixedBreakStart?: string;
  style: PlanningStyle;
};

export type ScheduleBlock = {
  id: string;
  kind: "task" | "short-break" | "long-break";
  label: string;
  start: number;
  end: number;
  duration: number;
  taskId?: string;
  taskType?: TaskType;
  intensity?: CognitiveIntensity;
  fixed?: boolean;
};

export type UnscheduledTask = {
  task: PlannerTask;
  remainingMinutes: number;
  reason: string;
};

export type PlannerSummary = {
  focusMinutes: number;
  breakMinutes: number;
  contextSwitches: number;
  allocatedPercentage: number;
};

export type PlannerResult = {
  blocks: ScheduleBlock[];
  unscheduled: UnscheduledTask[];
  summary: PlannerSummary;
  style: PlanningStyle;
  generatedAt: string;
};

export type PlannerValidation = {
  valid: boolean;
  errors: string[];
};
