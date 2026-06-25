import { cn } from "@/lib/utils"

type LivingCalendarProps = {
  documentedDays: number[]
  className?: string
}

export function LivingCalendar({ documentedDays, className }: LivingCalendarProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border/75 bg-card p-5 shadow-[var(--shadow-subtle)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold">Calendrier vivant</h2>
        <span className="text-sm text-muted-foreground">Juin</span>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-2">
        {Array.from({ length: 30 }).map((_, index) => {
          const day = index + 1
          const isDocumented = documentedDays.includes(day)

          return (
            <div
              key={day}
              title={`Jour ${day}`}
              className={cn(
                "aspect-square rounded-full border border-border/60",
                isDocumented ? "bg-life/70" : "bg-muted/70"
              )}
            />
          )
        })}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Les jours documentes deviennent visibles, sans pression.
      </p>
    </section>
  )
}
