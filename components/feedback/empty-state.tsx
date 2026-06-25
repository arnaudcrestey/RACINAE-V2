import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type EmptyStateProps = {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border/80 bg-card p-6 text-card-foreground shadow-[var(--shadow-subtle)]",
        className
      )}
    >
      <div className="max-w-md space-y-3">
        <h2 className="font-heading text-2xl font-semibold">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
        {action ? <div className="pt-2">{action}</div> : null}
      </div>
    </section>
  )
}
