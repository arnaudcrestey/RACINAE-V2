import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("space-y-3.5 racinae-fade-in", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3">
        <h1 className="font-heading text-[2.65rem] font-semibold leading-[var(--line-height-title)] text-foreground sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  )
}
