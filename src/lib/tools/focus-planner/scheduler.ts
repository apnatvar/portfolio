import {
  getFocusBlockMinutes,
  getShortBreakMinutes,
  PLANNING_STYLES,
} from "./config";
import type {
  PlannerResult,
  PlannerTask,
  PlannerValidation,
  ScheduleBlock,
  WorkdaySettings,
} from "./types";

const MIN_BLOCK = 15;
const FIVE_MINUTES = 5;
const priorityWeight = { low: 1, medium: 2, high: 3, critical: 4 } as const;
const intensityWeight = { light: 1, moderate: 2, heavy: 3 } as const;
const deepWorkTypes = new Set(["architecture", "feature-development", "research", "debugging"]);

export function parseTime(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return Number.NaN;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return Number.NaN;
  return hours * 60 + minutes;
}

export function formatTime(minutes: number) {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${String(mins).padStart(2, "0")} ${suffix}`;
}

function roundToFive(value: number) {
  return Math.round(value / FIVE_MINUTES) * FIVE_MINUTES;
}

type Anchor = ScheduleBlock;

function getAnchors(settings: WorkdaySettings, tasks: PlannerTask[]) {
  const anchors: Anchor[] = tasks
    .filter((task) => task.fixedTime && task.fixedStart)
    .map((task) => {
      const start = parseTime(task.fixedStart!);
      const duration = roundToFive(task.duration);
      return {
        id: `fixed-${task.id}`,
        kind: "task" as const,
        label: task.name.trim(),
        start,
        end: start + duration,
        duration,
        taskId: task.id,
        taskType: task.type,
        intensity: task.intensity,
        fixed: true,
      };
    });

  if (settings.fixedBreakStart) {
    const start = parseTime(settings.fixedBreakStart);
    anchors.push({
      id: "fixed-long-break",
      kind: "long-break",
      label: "Long break",
      start,
      end: start + roundToFive(settings.lunchDuration),
      duration: roundToFive(settings.lunchDuration),
      fixed: true,
    });
  }

  return anchors.sort((a, b) => a.start - b.start || a.end - b.end);
}

export function validatePlanner(settings: WorkdaySettings, tasks: PlannerTask[]): PlannerValidation {
  const errors: string[] = [];
  const start = parseTime(settings.startTime);
  const end = parseTime(settings.endTime);

  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    errors.push("End time must be later than start time.");
  }
  if (!Number.isFinite(settings.lunchDuration) || settings.lunchDuration < MIN_BLOCK) {
    errors.push("Long break must be at least 15 minutes.");
  }

  tasks.forEach((task, index) => {
    const label = task.name.trim() || `Task ${index + 1}`;
    if (!task.name.trim()) errors.push(`Task ${index + 1} needs a name.`);
    if (!Number.isFinite(task.duration) || task.duration < MIN_BLOCK) {
      errors.push(`${label} must be at least 15 minutes.`);
    }
    if (task.fixedTime && !task.fixedStart) errors.push(`${label} needs a fixed start time.`);
  });

  if (Number.isFinite(start) && Number.isFinite(end)) {
    const anchors = getAnchors(settings, tasks);
    anchors.forEach((anchor) => {
      if (!Number.isFinite(anchor.start) || anchor.start < start || anchor.end > end) {
        errors.push(`${anchor.label} does not fit inside the workday.`);
      }
    });
    for (let index = 1; index < anchors.length; index += 1) {
      if (anchors[index].start < anchors[index - 1].end) {
        errors.push(`${anchors[index].label} conflicts with ${anchors[index - 1].label}.`);
      }
    }
  }

  return { valid: errors.length === 0, errors: [...new Set(errors)] };
}

type QueueItem = { task: PlannerTask; remaining: number; order: number };

function compareTasks(a: QueueItem, b: QueueItem, style: WorkdaySettings["style"]) {
  const priorityDifference = priorityWeight[b.task.priority] - priorityWeight[a.task.priority];
  if (priorityDifference) return priorityDifference;
  const intensityDifference = intensityWeight[b.task.intensity] - intensityWeight[a.task.intensity];
  if (intensityDifference) return intensityDifference;
  if (style === "deep-work") {
    const deepDifference = Number(deepWorkTypes.has(b.task.type)) - Number(deepWorkTypes.has(a.task.type));
    if (deepDifference) return deepDifference;
  }
  return a.order - b.order;
}

export function generateSchedule(
  settings: WorkdaySettings,
  tasks: PlannerTask[],
  generatedAt: Date = new Date(),
): PlannerResult {
  const validation = validatePlanner(settings, tasks);
  if (!validation.valid) throw new Error(validation.errors.join(" "));

  const dayStart = parseTime(settings.startTime);
  const dayEnd = parseTime(settings.endTime);
  const anchors = getAnchors(settings, tasks);
  const fixedIds = new Set(anchors.flatMap((anchor) => (anchor.taskId ? [anchor.taskId] : [])));
  const queue: QueueItem[] = tasks
    .filter((task) => !fixedIds.has(task.id))
    .map((task, order) => ({ task, remaining: roundToFive(task.duration), order }))
    .sort((a, b) => compareTasks(a, b, settings.style));

  const blocks: ScheduleBlock[] = [];
  let cursor = dayStart;
  let workBlocksSinceLongBreak = 0;
  let needsShortBreak = false;
  let lastIntensity: PlannerTask["intensity"] | undefined;
  let longBreakPlaced = anchors.some((anchor) => anchor.kind === "long-break");
  const styleConfig = PLANNING_STYLES[settings.style];

  function addBreak(kind: "short-break" | "long-break", duration: number) {
    const block: ScheduleBlock = {
      id: `${kind}-${blocks.length}`,
      kind,
      label: kind === "long-break" ? "Long break" : "Short break",
      start: cursor,
      end: cursor + duration,
      duration,
    };
    blocks.push(block);
    cursor = block.end;
    needsShortBreak = false;
    lastIntensity = undefined;
    if (kind === "long-break") {
      workBlocksSinceLongBreak = 0;
      longBreakPlaced = true;
    }
  }

  function scheduleGap(gapEnd: number) {
    while (cursor + MIN_BLOCK <= gapEnd && queue.some((item) => item.remaining > 0)) {
      const available = gapEnd - cursor;
      const longBreakDue = !longBreakPlaced && workBlocksSinceLongBreak >= styleConfig.longBreakAfter;
      if (longBreakDue && available >= settings.lunchDuration + MIN_BLOCK) {
        addBreak("long-break", roundToFive(settings.lunchDuration));
        continue;
      }

      const nextCandidate = queue.find((item) => {
        if (item.remaining < MIN_BLOCK) return false;
        if (!item.task.splittable && item.remaining > available) return false;
        return true;
      });
      if (!nextCandidate) break;

      const mustRestHeavy = lastIntensity === "heavy" && nextCandidate.task.intensity === "heavy";
      if ((needsShortBreak || mustRestHeavy) && available >= MIN_BLOCK + FIVE_MINUTES) {
        const breakMinutes = getShortBreakMinutes(settings.style, lastIntensity ?? nextCandidate.task.intensity);
        if (available >= breakMinutes + MIN_BLOCK) {
          addBreak("short-break", breakMinutes);
          continue;
        }
      }

      const target = nextCandidate.task.splittable
        ? Math.min(
            nextCandidate.remaining,
            getFocusBlockMinutes(settings.style, nextCandidate.task.type, nextCandidate.task.intensity),
            gapEnd - cursor,
          )
        : nextCandidate.remaining;
      let duration = Math.floor(target / FIVE_MINUTES) * FIVE_MINUTES;
      const remainderAfterBlock = nextCandidate.remaining - duration;
      if (remainderAfterBlock > 0 && remainderAfterBlock < MIN_BLOCK) {
        duration -= MIN_BLOCK - remainderAfterBlock;
      }
      if (duration < MIN_BLOCK) break;

      const block: ScheduleBlock = {
        id: `task-${nextCandidate.task.id}-${blocks.length}`,
        kind: "task",
        label: nextCandidate.task.name.trim(),
        start: cursor,
        end: cursor + duration,
        duration,
        taskId: nextCandidate.task.id,
        taskType: nextCandidate.task.type,
        intensity: nextCandidate.task.intensity,
      };
      blocks.push(block);
      cursor = block.end;
      nextCandidate.remaining -= duration;
      workBlocksSinceLongBreak += 1;
      needsShortBreak = true;
      lastIntensity = nextCandidate.task.intensity;
    }
  }

  anchors.forEach((anchor) => {
    scheduleGap(anchor.start);
    cursor = anchor.start;
    blocks.push(anchor);
    cursor = anchor.end;
    needsShortBreak = false;
    lastIntensity = anchor.intensity;
    if (anchor.kind === "long-break") {
      workBlocksSinceLongBreak = 0;
      longBreakPlaced = true;
    } else {
      workBlocksSinceLongBreak += 1;
    }
  });
  scheduleGap(dayEnd);

  const unscheduled = queue
    .filter((item) => item.remaining > 0)
    .map((item) => ({
      task: item.task,
      remainingMinutes: item.remaining,
      reason: item.task.splittable
        ? "Not enough open time remains in the workday."
        : "No open interval is long enough for this non-splittable task.",
    }));

  const chronological = blocks.sort((a, b) => a.start - b.start || a.end - b.end);
  const taskBlocks = chronological.filter((block) => block.kind === "task");
  const contextSwitches = taskBlocks.reduce((count, block, index) => {
    if (index === 0) return 0;
    return count + Number(taskBlocks[index - 1].taskId !== block.taskId);
  }, 0);
  const focusMinutes = taskBlocks.reduce((total, block) => total + block.duration, 0);
  const breakMinutes = chronological
    .filter((block) => block.kind !== "task")
    .reduce((total, block) => total + block.duration, 0);

  return {
    blocks: chronological,
    unscheduled,
    summary: {
      focusMinutes,
      breakMinutes,
      contextSwitches,
      allocatedPercentage: Math.round(((focusMinutes + breakMinutes) / (dayEnd - dayStart)) * 100),
    },
    style: settings.style,
    generatedAt: generatedAt.toISOString(),
  };
}
