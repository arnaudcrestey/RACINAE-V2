"use client"

import Link from "next/link"
import { CalendarDays, ChevronRight, Lock, Mail } from "lucide-react"

import { EmptyState } from "@/components/feedback/empty-state"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { defaultCapsules, type DemoCapsule } from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

export function CapsuleList() {
  const [capsules] = useLocalStorageState<DemoCapsule[]>(
    "racinae-capsules",
    defaultCapsules
  )

  if (!capsules.length) {
    return (
      <EmptyState
        title="Aucun courrier"
        description="Confiez un message au temps. Il restera scellé jusqu'à sa date d'ouverture."
        action={
          <Button asChild>
            <Link href="/app/capsules/new">Nouveau courrier</Link>
          </Button>
        }
      />
    )
  }

  return (
    <div className="grid gap-7">
      {capsules.map((capsule) => {
        const openingDate = new Date(capsule.open_at).toLocaleDateString(
          "fr-FR",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )

        return (
          <Link
            key={capsule.id}
            href={`/app/capsules/${capsule.id}`}
            className="group block"
          >
            <Card className="relative overflow-hidden rounded-[2.25rem] border border-[#d8c4a8]/45 bg-[#fffaf0] p-0 shadow-[0_24px_70px_rgba(80,60,35,0.08)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_90px_rgba(80,60,35,0.13)]">
              <div className="absolute -right-10 top-0 h-56 w-56 rounded-full bg-[#A8B8A3]/30 blur-3xl" />
              <div className="absolute -left-12 bottom-0 h-52 w-52 rounded-full bg-[#D8B889]/24 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/55 to-transparent" />

              <div className="relative p-7 sm:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-[#d7c7ae] bg-[#f5efe6] shadow-sm">
                      <Mail
                        className="size-5 text-[#7D947E]"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="rounded-full border border-[#D6E2D3] bg-[#EEF5EE] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6F866F] shadow-sm">
                      Scellé
                    </span>
                  </div>

                  <div className="hidden items-center gap-2 rounded-full bg-white/55 px-3 py-1.5 text-sm text-muted-foreground shadow-sm sm:flex">
                    <CalendarDays
                      className="size-4 text-[#9A7A59]"
                      aria-hidden="true"
                    />
                    <span>{openingDate}</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#d8c4a8]/35 pt-8">
                  <h2 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                    {capsule.title}
                  </h2>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/40 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8A765E]">
                        De
                      </p>
                      <p className="mt-2 text-base text-foreground/90">
                        {capsule.sender_label || "Non renseigné"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/40 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8A765E]">
                        À
                      </p>
                      <p className="mt-2 text-base text-foreground/90">
                        {capsule.recipient_label || "Non renseigné"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-dashed border-[#d8c4a8]/60 bg-white/45 p-5">
                  <div className="flex items-start gap-3">
                    <Lock
                      className="mt-0.5 size-4 shrink-0 text-[#7D947E]"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-7 text-muted-foreground">
                      Ce courrier est conservé par RACINAE. Son contenu restera
                      inaccessible jusqu&apos;à la date d&apos;ouverture.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground sm:hidden">
                    <CalendarDays
                      className="size-4 text-[#9A7A59]"
                      aria-hidden="true"
                    />
                    {openingDate}
                  </span>

                  <span className="ml-auto inline-flex items-center gap-2 font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1">
                    Consulter
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}