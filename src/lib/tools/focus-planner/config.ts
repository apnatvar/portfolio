import type { CognitiveIntensity, PlanningStyle, TaskType } from "./types";

export type StyleConfig = {
  label: string;
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakAfter: number;
  description: string;
};

export const PLANNING_STYLES: Record<PlanningStyle, StyleConfig> = {
  balanced: {
    label: "Balanced",
    focusMinutes: 50,
    shortBreakMinutes: 10,
    longBreakAfter: 3,
    description: "50-minute focus blocks with regular 10-minute breaks.",
  },
  "deep-work": {
    label: "Deep work",
    focusMinutes: 90,
    shortBreakMinutes: 20,
    longBreakAfter: 2,
    description: "Longer sessions, with demanding technical work placed early.",
  },
  pomodoro: {
    label: "Pomodoro",
    focusMinutes: 25,
    shortBreakMinutes: 5,
    longBreakAfter: 4,
    description: "25-minute focus blocks and a long break after four sessions.",
  },
  flexible: {
    label: "Flexible",
    focusMinutes: 60,
    shortBreakMinutes: 10,
    longBreakAfter: 3,
    description: "30–90 minute blocks adapted to task type and intensity.",
  },
};

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  "feature-development": "Feature development",
  debugging: "Debugging",
  architecture: "Architecture",
  "code-review": "Code review",
  documentation: "Documentation",
  testing: "Testing",
  research: "Research",
  administration: "Administration",
  meeting: "Meeting",
  custom: "Custom",
};

export const DURATION_PRESETS = [25, 30, 45, 50, 60, 90, 120, 180];

const flexibleTypeMinutes: Record<TaskType, number> = {
  "feature-development": 75,
  debugging: 60,
  architecture: 90,
  "code-review": 45,
  documentation: 45,
  testing: 50,
  research: 75,
  administration: 30,
  meeting: 45,
  custom: 50,
};

const intensityAdjustment: Record<CognitiveIntensity, number> = {
  light: -10,
  moderate: 0,
  heavy: 15,
};

export function getFocusBlockMinutes(
  style: PlanningStyle,
  type: TaskType,
  intensity: CognitiveIntensity,
) {
  if (style !== "flexible") return PLANNING_STYLES[style].focusMinutes;
  return Math.min(90, Math.max(30, flexibleTypeMinutes[type] + intensityAdjustment[intensity]));
}

export function getShortBreakMinutes(style: PlanningStyle, intensity: CognitiveIntensity) {
  if (style !== "flexible") return PLANNING_STYLES[style].shortBreakMinutes;
  return intensity === "heavy" ? 20 : intensity === "moderate" ? 15 : 10;
}
