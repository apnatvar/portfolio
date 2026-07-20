import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ResultCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
};

export function ResultCard({
  title,
  description,
  children,
  className,
  id,
}: ResultCardProps) {
  return (
    <section
      id={id}
      className={cn("rounded-2xl border bg-card p-5 shadow-sm sm:p-6", className)}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="mb-5">
        <h2 id={id ? `${id}-title` : undefined} className="text-xl font-medium">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
