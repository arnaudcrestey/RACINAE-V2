type StatCardProps = {
  label: string
  value: string
  description?: string
}

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border/75 bg-card p-5 shadow-[var(--shadow-subtle)]">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-heading text-3xl font-semibold">{value}</p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
