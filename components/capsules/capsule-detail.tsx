"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Surface } from "@/components/ui/surface"
import {
  defaultCapsules,
  recipientKindLabels,
  type DemoCapsule,
} from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

type CapsuleDetailProps = {
  capsuleId: string
}

export function CapsuleDetail({ capsuleId }: CapsuleDetailProps) {
  const router = useRouter()
  const [capsules, setCapsules] = useLocalStorageState<DemoCapsule[]>(
    "racinae-capsules",
    defaultCapsules
  )

  const capsule = capsules.find((item) => item.id === capsuleId)

  if (!capsule) {
    return (
      <Surface>
        <p className="text-muted-foreground">
          Ce courrier n&apos;existe pas encore.
        </p>
      </Surface>
    )
  }

  const openingDate = new Date(capsule.open_at).toLocaleDateString("fr-FR")

  return (
    <article className="space-y-6">
      <Surface className="overflow-hidden rounded-3xl">
        <div className="mx-auto flex max-w-xl flex-col items-center py-10 text-center">
          <div className="flex size-20 items-center justify-center rounded-full border bg-background shadow-sm">
            <Lock className="size-8 text-muted-foreground" aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Courrier scellé
          </p>

          <h2 className="mt-4 font-heading text-4xl font-semibold">
            {capsule.title}
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            {recipientKindLabels[capsule.recipient_kind]}
          </p>

          <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/40 p-6">
            <p className="text-base leading-8 text-foreground/80">
              Ce courrier est scellé.
              <br />
              Il restera fermé jusqu&apos;au{" "}
              <span className="font-medium text-foreground">{openingDate}</span>.
            </p>
          </div>
        </div>
      </Surface>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={`/app/capsules/${capsule.id}/edit`}>
            Modifier le courrier
          </Link>
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            setCapsules((current) =>
              current.filter((item) => item.id !== capsule.id)
            )
            router.push("/app/capsules")
          }}
        >
          Supprimer
        </Button>
      </div>
    </article>
  )
}