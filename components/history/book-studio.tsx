"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  Image,
  Mic,
  PenLine,
  Sparkles,
  Video,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Surface } from "@/components/ui/surface"

const totalPages = 538

const studioTools = [
  { icon: Image, label: "Ajouter une photo" },
  { icon: Video, label: "Ajouter une vidéo" },
  { icon: Mic, label: "Ajouter un audio" },
  { icon: PenLine, label: "Annotations" },
  { icon: Sparkles, label: "Décorations" },
]

export function BookStudio() {
  const [isAtelierOpen, setIsAtelierOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInput, setPageInput] = useState("1")

  const leftPage = currentPage
  const rightPage = currentPage + 1 <= totalPages ? currentPage + 1 : null

  function goTo(page: number) {
    const safePage = Math.min(Math.max(page, 1), totalPages)
    const spreadStart = safePage % 2 === 0 ? safePage - 1 : safePage

    setCurrentPage(spreadStart)
    setPageInput(String(safePage))
  }

  function openInputPage() {
    const page = Number(pageInput)
    if (!Number.isFinite(page)) return
    goTo(page)
  }

  return (
    <div className="space-y-6">
      <Surface className="overflow-hidden p-0">
        <header className="border-b px-5 py-6 text-center sm:px-8 sm:py-8">
          <Badge tone="life">Studio d&apos;édition</Badge>

          <h1 className="mt-4 font-heading text-3xl sm:text-5xl">
            Le livre de l&apos;enfance
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Chaque page préserve un souvenir. Chaque souvenir construit son
            histoire.
          </p>
        </header>

        <main className="bg-[#f6f1e9] px-0 py-6 sm:px-8 sm:py-10">
          <section className="mx-4 mb-8 overflow-hidden rounded-[24px] border bg-[#fbfaf7] shadow-sm sm:mx-auto sm:max-w-6xl">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Atelier
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enrichir le livre
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAtelierOpen((value) => !value)}
                className="inline-flex shrink-0 touch-manipulation items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm"
              >
                {isAtelierOpen ? "Fermer" : "Ouvrir"}
                {isAtelierOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>

            {isAtelierOpen && (
              <div className="border-t px-5 py-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {studioTools.map((tool) => (
                      <button
                        key={tool.label}
                        type="button"
                        className="flex shrink-0 touch-manipulation items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm"
                      >
                        <tool.icon className="h-4 w-4" />
                        {tool.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="inline-flex shrink-0 touch-manipulation items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                  >
                    <Download className="h-4 w-4" />
                    Télécharger le livre
                  </button>
                </div>
              </div>
            )}
          </section>

          <div className="w-full overflow-x-auto px-4 pb-4 sm:overflow-visible sm:px-0">
            <div className="mx-auto min-w-[620px] max-w-5xl sm:min-w-0">
              <div className="flex rounded-[30px] bg-[#d2bd96] p-3 shadow-[0_28px_70px_rgba(67,49,28,.26)]">
                <section className="relative min-h-[460px] flex-1 rounded-l-[24px] bg-[#fffdf8] sm:min-h-[640px]">
                  <div className="flex h-full min-h-[460px] items-center justify-center sm:min-h-[640px]">
                    <p className="text-sm text-neutral-300">Page vierge</p>
                  </div>

                  <p className="absolute bottom-8 left-10 text-sm text-neutral-400">
                    {leftPage}
                  </p>
                </section>

                <div className="w-[6px] bg-gradient-to-r from-[#b99f75] via-[#6f5536] to-[#d8c49c]" />

                <section className="relative min-h-[460px] flex-1 rounded-r-[24px] bg-[#fffdf8] sm:min-h-[640px]">
                  <div className="flex h-full min-h-[460px] items-center justify-center sm:min-h-[640px]">
                    <p className="text-sm text-neutral-300">Page vierge</p>
                  </div>

                                    {rightPage && (
                    <p className="absolute bottom-8 right-10 text-sm text-neutral-400">
                      {rightPage}
                    </p>
                  )}
                </section>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 px-4 sm:flex-row">
            <button
              type="button"
              onClick={() => goTo(currentPage - 2)}
              disabled={currentPage <= 1}
              className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Page précédente
            </button>

            <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-2">
              <span className="text-sm text-muted-foreground">
                Aller à la page
              </span>

              <input
                value={pageInput}
                onChange={(event) => setPageInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") openInputPage()
                }}
                className="w-16 bg-transparent text-center text-sm outline-none"
                inputMode="numeric"
              />

              <button
                type="button"
                onClick={openInputPage}
                className="rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground"
              >
                Ouvrir
              </button>
            </div>

            <button
              type="button"
              onClick={() => goTo(currentPage + 2)}
              disabled={currentPage >= totalPages}
              className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Page suivante
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Pages {leftPage}
            {rightPage ? `-${rightPage}` : ""} sur {totalPages}
          </p>
        </main>
      </Surface>
    </div>
  )
}
