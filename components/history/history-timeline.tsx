import { Badge } from "@/components/ui/badge"
import { Surface } from "@/components/ui/surface"

export function HistoryTimeline() {
  return (
    <div className="grid gap-4">
      <Surface>
        <Badge tone="life">2026</Badge>
        <h2 className="mt-4 font-heading text-3xl font-semibold">
          Le debut d&apos;une histoire
        </h2>
        <p className="mt-3 text-muted-foreground">
          Les souvenirs crees dans le Journal viendront former cette chronologie.
        </p>
      </Surface>
      <Surface tone="muted">
        <h2 className="font-heading text-2xl font-semibold">Bilan IA</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Emplacement reserve pour les bilans mensuels et annuels.
        </p>
      </Surface>
    </div>
  )
}
