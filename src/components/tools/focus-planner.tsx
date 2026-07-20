"use client";

import { ResultCard } from "@/components/tools/result-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DURATION_PRESETS,
  PLANNING_STYLES,
  TASK_TYPE_LABELS,
} from "@/lib/tools/focus-planner/config";
import {
  formatTime,
  generateSchedule,
  validatePlanner,
} from "@/lib/tools/focus-planner/scheduler";
import type {
  CognitiveIntensity,
  PlannerResult,
  PlannerTask,
  PlanningStyle,
  Priority,
  TaskType,
  WorkdaySettings,
} from "@/lib/tools/focus-planner/types";
import { ArrowDown, ArrowUp, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";

const initialSettings: WorkdaySettings = {
  startTime: "09:00",
  endTime: "17:30",
  lunchDuration: 45,
  style: "balanced",
};

const initialTasks: PlannerTask[] = [
  {
    id: "feature",
    name: "Build core feature",
    type: "feature-development",
    duration: 120,
    priority: "high",
    intensity: "heavy",
    splittable: true,
    fixedTime: false,
  },
  {
    id: "review",
    name: "Review pull requests",
    type: "code-review",
    duration: 45,
    priority: "medium",
    intensity: "moderate",
    splittable: false,
    fixedTime: false,
  },
  {
    id: "standup",
    name: "Team stand-up",
    type: "meeting",
    duration: 30,
    priority: "medium",
    intensity: "light",
    splittable: false,
    fixedTime: true,
    fixedStart: "11:30",
  },
];

const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50";

function minutesLabel(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return `${remainder}m`;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}

function makeTask(): PlannerTask {
  return {
    id: crypto.randomUUID(),
    name: "",
    type: "feature-development",
    duration: 60,
    priority: "medium",
    intensity: "moderate",
    splittable: true,
    fixedTime: false,
  };
}

export function FocusPlanner() {
  const [settings, setSettings] = useState<WorkdaySettings>(initialSettings);
  const [tasks, setTasks] = useState<PlannerTask[]>(initialTasks);
  const [result, setResult] = useState<PlannerResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  function updateTask(id: string, patch: Partial<PlannerTask>) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...patch } : task)));
    setResult(null);
  }

  function moveTask(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= tasks.length) return;
    setTasks((current) => {
      const copy = [...current];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      return copy;
    });
    setResult(null);
  }

  function buildSchedule() {
    const validation = validatePlanner(settings, tasks);
    setErrors(validation.errors);
    if (!validation.valid) {
      setResult(null);
      return;
    }
    setResult(generateSchedule(settings, tasks));
  }

  function reset() {
    setSettings(initialSettings);
    setTasks(initialTasks);
    setErrors([]);
    setResult(null);
  }

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
      <form
        className="tool-controls space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          buildSchedule();
        }}
        noValidate
      >
        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6" aria-labelledby="workday-title">
          <h2 id="workday-title" className="text-xl font-medium">Workday</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="day-start">Start time</Label>
              <Input id="day-start" type="time" step="300" value={settings.startTime} onChange={(event) => { setSettings({ ...settings, startTime: event.target.value }); setResult(null); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="day-end">End time</Label>
              <Input id="day-end" type="time" step="300" value={settings.endTime} onChange={(event) => { setSettings({ ...settings, endTime: event.target.value }); setResult(null); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lunch-duration">Long break (minutes)</Label>
              <Input id="lunch-duration" type="number" min={15} step={5} value={settings.lunchDuration} onChange={(event) => { setSettings({ ...settings, lunchDuration: Number(event.target.value) }); setResult(null); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="planning-style">Planning style</Label>
              <select id="planning-style" className={selectClass} value={settings.style} onChange={(event) => { setSettings({ ...settings, style: event.target.value as PlanningStyle }); setResult(null); }}>
                {Object.entries(PLANNING_STYLES).map(([value, config]) => <option key={value} value={value}>{config.label}</option>)}
              </select>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{PLANNING_STYLES[settings.style].description}</p>
          <details className="mt-4 rounded-xl border p-4">
            <summary className="cursor-pointer text-sm font-medium">Advanced break timing</summary>
            <div className="mt-4 max-w-xs space-y-2">
              <Label htmlFor="fixed-break">Optional fixed long-break start</Label>
              <Input id="fixed-break" type="time" step="300" value={settings.fixedBreakStart ?? ""} onChange={(event) => { setSettings({ ...settings, fixedBreakStart: event.target.value || undefined }); setResult(null); }} />
            </div>
          </details>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6" aria-labelledby="tasks-title">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 id="tasks-title" className="text-xl font-medium">Tasks</h2>
              <p className="mt-1 text-sm text-muted-foreground">Add work in the order you would normally consider it.</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => { setTasks((current) => [...current, makeTask()]); setResult(null); }}>
              <Plus aria-hidden="true" /> Add task
            </Button>
          </div>

          <div className="mt-5 space-y-4">
            {tasks.length === 0 ? (
              <p className="rounded-xl border border-dashed p-5 text-sm text-muted-foreground">No tasks yet. Add one to build a schedule.</p>
            ) : null}
            {tasks.map((task, index) => (
              <fieldset key={task.id} className="rounded-xl border p-4">
                <legend className="px-1 text-sm font-medium">Task {index + 1}</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`${task.id}-name`}>Task name</Label>
                    <Input id={`${task.id}-name`} value={task.name} placeholder="e.g. Diagnose checkout bug" onChange={(event) => updateTask(task.id, { name: event.target.value })} aria-invalid={!task.name.trim()} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${task.id}-type`}>Type</Label>
                    <select id={`${task.id}-type`} className={selectClass} value={task.type} onChange={(event) => updateTask(task.id, { type: event.target.value as TaskType })}>
                      {Object.entries(TASK_TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${task.id}-duration`}>Estimated minutes</Label>
                    <Input id={`${task.id}-duration`} type="number" list="duration-presets" min={15} step={5} value={task.duration} onChange={(event) => updateTask(task.id, { duration: Number(event.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${task.id}-priority`}>Priority</Label>
                    <select id={`${task.id}-priority`} className={selectClass} value={task.priority} onChange={(event) => updateTask(task.id, { priority: event.target.value as Priority })}>
                      <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${task.id}-intensity`}>Cognitive intensity</Label>
                    <select id={`${task.id}-intensity`} className={selectClass} value={task.intensity} onChange={(event) => updateTask(task.id, { intensity: event.target.value as CognitiveIntensity })}>
                      <option value="light">Light</option><option value="moderate">Moderate</option><option value="heavy">Heavy</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                  <label className="flex items-center gap-2"><input type="checkbox" checked={task.splittable} onChange={(event) => updateTask(task.id, { splittable: event.target.checked })} className="size-4 accent-primary" /> May split across blocks</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={task.fixedTime} onChange={(event) => updateTask(task.id, { fixedTime: event.target.checked, fixedStart: event.target.checked ? task.fixedStart ?? settings.startTime : undefined })} className="size-4 accent-primary" /> Fixed start time</label>
                </div>
                {task.fixedTime ? (
                  <div className="mt-4 max-w-xs space-y-2">
                    <Label htmlFor={`${task.id}-fixed-start`}>Fixed start</Label>
                    <Input id={`${task.id}-fixed-start`} type="time" step="300" value={task.fixedStart ?? ""} onChange={(event) => updateTask(task.id, { fixedStart: event.target.value })} />
                  </div>
                ) : null}
                <div className="mt-4 flex justify-end gap-2">
                  <Button type="button" size="icon-sm" variant="ghost" onClick={() => moveTask(index, -1)} disabled={index === 0} aria-label={`Move ${task.name || `task ${index + 1}`} up`}><ArrowUp /></Button>
                  <Button type="button" size="icon-sm" variant="ghost" onClick={() => moveTask(index, 1)} disabled={index === tasks.length - 1} aria-label={`Move ${task.name || `task ${index + 1}`} down`}><ArrowDown /></Button>
                  <Button type="button" size="icon-sm" variant="ghost" onClick={() => { setTasks((current) => current.filter((item) => item.id !== task.id)); setResult(null); }} aria-label={`Remove ${task.name || `task ${index + 1}`}`}><Trash2 /></Button>
                </div>
              </fieldset>
            ))}
          </div>
          <datalist id="duration-presets">{DURATION_PRESETS.map((duration) => <option key={duration} value={duration} />)}</datalist>
        </section>

        {errors.length ? (
          <div className="rounded-xl border border-destructive/50 bg-destructive/5 p-4 text-sm" role="alert">
            <p className="font-medium">Check these details:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">{errors.map((error) => <li key={error}>{error}</li>)}</ul>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Build my schedule</Button>
          <Button type="button" variant="outline" onClick={reset}><RotateCcw aria-hidden="true" /> Reset</Button>
        </div>
      </form>

      <ResultCard id="planner-result" title="Schedule preview" description="A practical recommendation—not a claim of scientific optimality." className="lg:sticky lg:top-6">
        {!result ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground" aria-live="polite">
            Configure your day and select “Build my schedule” to see the timeline.
          </div>
        ) : (
          <div aria-live="polite" aria-atomic="true">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Schedule summary">
              <SummaryStat label="Focus" value={minutesLabel(result.summary.focusMinutes)} />
              <SummaryStat label="Breaks" value={minutesLabel(result.summary.breakMinutes)} />
              <SummaryStat label="Switches" value={String(result.summary.contextSwitches)} />
              <SummaryStat label="Allocated" value={`${result.summary.allocatedPercentage}%`} />
            </div>

            <div className="mt-5 space-y-2 md:hidden">
              {result.blocks.map((block) => <TimelineCard key={block.id} block={block} />)}
            </div>
            <div className="mt-5 hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">Generated workday schedule</caption>
                <thead><tr className="border-b"><th scope="col" className="py-2 pr-3 font-medium">Time</th><th scope="col" className="py-2 pr-3 font-medium">Block</th><th scope="col" className="py-2 text-right font-medium">Length</th></tr></thead>
                <tbody>{result.blocks.map((block) => <tr key={block.id} className="border-b border-border/60 last:border-0"><td className="whitespace-nowrap py-3 pr-3 text-muted-foreground">{formatTime(block.start)}–{formatTime(block.end)}</td><td className="py-3 pr-3"><span className="font-medium">{block.label}</span><span className="block text-xs capitalize text-muted-foreground">{block.kind.replace("-", " ")}{block.fixed ? " · fixed" : ""}</span></td><td className="py-3 text-right text-muted-foreground">{minutesLabel(block.duration)}</td></tr>)}</tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl border p-4">
              <h3 className="font-medium">Unscheduled work</h3>
              {result.unscheduled.length ? (
                <ul className="mt-3 space-y-3 text-sm">{result.unscheduled.map(({ task, remainingMinutes, reason }) => <li key={task.id}><span className="font-medium">{task.name}</span> · {minutesLabel(remainingMinutes)} remaining<span className="block text-muted-foreground">{reason}</span></li>)}</ul>
              ) : <p className="mt-2 text-sm text-muted-foreground">Everything fits in the available day.</p>}
            </div>
          </div>
        )}
      </ResultCard>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-muted p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-lg font-medium">{value}</p></div>;
}

function TimelineCard({ block }: { block: PlannerResult["blocks"][number] }) {
  return <article className="rounded-xl border p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-medium">{block.label}</h3><p className="mt-1 text-xs capitalize text-muted-foreground">{block.kind.replace("-", " ")}{block.fixed ? " · fixed" : ""}</p></div><span className="text-xs text-muted-foreground">{minutesLabel(block.duration)}</span></div><p className="mt-3 text-sm">{formatTime(block.start)}–{formatTime(block.end)}</p></article>;
}
