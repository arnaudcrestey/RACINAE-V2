"use client"

import Link from "next/link"

import { EmptyState } from "@/components/feedback/empty-state"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  defaultCapsules,
  recipientKindLabels,
  type DemoCapsule,
} from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

export function CapsuleList() {
  const [capsules] = useLocalStorageState<DemoCapsule[]>(
    "racinae-capsules",
    defaultCapsules
  )

  if (!capsules.length) {
    return (
      <EmptyState
        title="Aucune capsule programmee"
        description="Preparez un message pour plus tard, simplement."
        action={
          <Button asChild>
            <Link href="/app/capsules/new">Creer une capsule</Link>
          </Button>
        }
      />
    )
  }

  return (
    <div className="grid gap-4">
      {capsules.map((capsule) => (
        <Link key={capsule.id} href={`/app/capsules/${capsule.id}`}>
          <Card className="transition-transform duration-300 hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>{capsule.title}</CardTitle>
              <CardDescription>
                {recipientKindLabels[capsule.recipient_kind]} -{" "}
                {new Date(capsule.open_at).toLocaleDateString("fr-FR")}
              </CardDescription>
            </CardHeader>
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {capsule.message}
            </p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
