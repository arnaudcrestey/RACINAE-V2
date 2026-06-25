"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Surface } from "@/components/ui/surface"
import { defaultCapsules, recipientKindLabels, type DemoCapsule } from "@/lib/demo-data"
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
          Cette capsule n&apos;existe pas encore.
        </p>
      </Surface>
    )
  }

  return (
    <article className="space-y-5">
      <Surface>
        <p className="text-sm text-muted-foreground">
          {recipientKindLabels[capsule.recipient_kind]} - ouverture le{" "}
          {new Date(capsule.open_at).toLocaleDateString("fr-FR")}
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold">{capsule.title}</h2>
        <p className="mt-5 whitespace-pre-wrap leading-8 text-foreground/85">
          {capsule.message}
        </p>
      </Surface>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={`/app/capsules/${capsule.id}/edit`}>Modifier</Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setCapsules((current) => current.filter((item) => item.id !== capsule.id))
            router.push("/app/capsules")
          }}
        >
          Supprimer
        </Button>
      </div>
    </article>
  )
}
