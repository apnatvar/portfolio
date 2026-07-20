import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ToolPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function ToolPageHeader({
  eyebrow = "Free browser tool",
  title,
  description,
}: ToolPageHeaderProps) {
  return (
    <header className="border-b border-border/70 pb-8">
      <Link
        href="/tools"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        All tools
      </Link>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="max-w-5xl font-italianno text-5xl leading-none transition-all duration-500 hover:tracking-wide sm:text-7xl lg:text-8xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
        {description}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Runs locally in your browser. Nothing is uploaded or saved.
      </p>
    </header>
  );
}
