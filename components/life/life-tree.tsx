import { cn } from "@/lib/utils"

type LifeTreeStage = "seed" | "sprout" | "young" | "tree"

type LifeTreeProps = {
  memoriesCount: number
  monthsCovered?: number
  className?: string
}

function getStage(memoriesCount: number): LifeTreeStage {
  if (memoriesCount <= 0) return "seed"
  if (memoriesCount < 8) return "sprout"
  if (memoriesCount < 30) return "young"
  return "tree"
}

const stageLabels: Record<LifeTreeStage, string> = {
  seed: "Graine",
  sprout: "Pousse",
  young: "Jeune arbre",
  tree: "Arbre",
}

export function LifeTree({ memoriesCount, monthsCovered = 1, className }: LifeTreeProps) {
  const stage = getStage(memoriesCount)

  return (
    <section
      className={cn(
        "rounded-2xl border border-border/75 bg-card p-5 shadow-[var(--shadow-subtle)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Arbre de Vie
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">
            {stageLabels[stage]}
          </h2>
        </div>
        <div className="relative size-24 shrink-0">
          <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true">
            <circle cx="60" cy="60" r="45" fill="var(--muted)" opacity="0.7" />
            <path
              d="M60 92V48"
              stroke="var(--primary)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {stage !== "seed" ? (
              <>
                <path
                  d="M60 64C48 52 39 47 28 46"
                  stroke="var(--primary)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M60 58C72 46 82 40 95 39"
                  stroke="var(--primary)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </>
            ) : null}
            {stage === "young" || stage === "tree" ? (
              <>
                <path
                  d="M32 52C21 38 11 34 2 38C9 52 19 58 32 52Z"
                  fill="var(--life)"
                />
                <path
                  d="M85 42C96 29 108 25 118 29C111 44 99 51 85 42Z"
                  fill="var(--life)"
                />
              </>
            ) : null}
            {stage === "tree" ? (
              <>
                <path
                  d="M48 38C40 24 29 18 17 19C22 34 32 42 48 38Z"
                  fill="var(--accent)"
                />
                <path
                  d="M73 34C81 19 92 12 105 12C101 29 90 38 73 34Z"
                  fill="var(--accent)"
                />
              </>
            ) : null}
          </svg>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-muted-foreground">
        Votre histoire contient désormais {memoriesCount} souvenir
        {memoriesCount > 1 ? "s" : ""}.
      </p>
      <p className="text-sm leading-6 text-muted-foreground">
        Votre histoire couvre maintenant {monthsCovered} mois de vie.
      </p>
    </section>
  )
}
