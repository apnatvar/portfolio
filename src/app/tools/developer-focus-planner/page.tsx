import { FocusPlanner } from "@/components/tools/focus-planner";
import { ToolPageHeader } from "@/components/tools/tool-page-header";

export default function DeveloperFocusPlannerPage() {
  return (
    <main className="tool-page mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <ToolPageHeader
        title="Developer Focus Planner"
        description="Shape tasks, meetings and breaks into a realistic workday using balanced, deep-work, Pomodoro or flexible blocks."
      />
      <FocusPlanner />
    </main>
  );
}
