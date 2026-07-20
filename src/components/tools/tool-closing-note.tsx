import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

type ToolClosingNoteProps = {
  title: string;
  action: string;
  href: string;
  children: ReactNode;
};

export function ToolClosingNote({
  title,
  action,
  href,
  children,
}: ToolClosingNoteProps) {
  return (
    <section className="tool-closing-note mt-12 rounded-3xl bg-foreground px-6 py-8 text-background sm:px-8 sm:py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">
        A clearer next step
      </p>
      <h2 className="mt-3 max-w-4xl font-italianno text-5xl leading-none transition-all duration-500 hover:tracking-wide sm:text-7xl">
        {title}
      </h2>
      <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-background/75 sm:text-base">
        {children}
      </div>
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-2xl items-start gap-3 rounded-2xl border border-background/20 p-4 text-sm leading-6 text-background/80">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p>
            Your entries are never shared with the server. Everything is calculated in this browser tab, so you can use the tool freely without exposing private tasks or decisions.
          </p>
        </div>
        <a
          href={href}
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
        >
          {action}
        </a>
      </div>
    </section>
  );
}
