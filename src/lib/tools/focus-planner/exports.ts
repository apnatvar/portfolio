import { formatGeneratedDate } from "@/lib/tools/date-format";
import { PLANNING_STYLES } from "./config";
import { formatTime } from "./scheduler";
import type { PlannerResult } from "./types";

function minutesLabel(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return `${remainder} minutes`;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}

export function plannerAsPlainText(result: PlannerResult) {
  const lines = [
    "Developer Focus Plan",
    `Generated: ${formatGeneratedDate(new Date(result.generatedAt))}`,
    `Style: ${PLANNING_STYLES[result.style].label}`,
    "",
    "Schedule",
    ...result.blocks.map(
      (block) =>
        `${formatTime(block.start)}–${formatTime(block.end)} | ${block.label} | ${minutesLabel(block.duration)}${block.fixed ? " | Fixed" : ""}`,
    ),
    "",
    "Summary",
    `Focus time: ${minutesLabel(result.summary.focusMinutes)}`,
    `Break time: ${minutesLabel(result.summary.breakMinutes)}`,
    `Context switches: ${result.summary.contextSwitches}`,
    `Workday allocated: ${result.summary.allocatedPercentage}%`,
    "",
    "Unscheduled work",
    ...(result.unscheduled.length
      ? result.unscheduled.map(
          ({ task, remainingMinutes, reason }) =>
            `${task.name} — ${minutesLabel(remainingMinutes)} remaining. ${reason}`,
        )
      : ["None"]),
  ];
  return lines.join("\n");
}

export function plannerAsMarkdown(result: PlannerResult) {
  return `${plannerAsPlainText(result)
    .replace("Developer Focus Plan", "# Developer Focus Plan")
    .replace("\nSchedule\n", "\n## Schedule\n")
    .replace("\nSummary\n", "\n## Summary\n")
    .replace("\nUnscheduled work\n", "\n## Unscheduled work\n")}
`;
}

export function plannerAsJson(result: PlannerResult) {
  return JSON.stringify(
    {
      ...result,
      styleLabel: PLANNING_STYLES[result.style].label,
      blocks: result.blocks.map((block) => ({
        ...block,
        startTime: formatTime(block.start),
        endTime: formatTime(block.end),
      })),
    },
    null,
    2,
  );
}
