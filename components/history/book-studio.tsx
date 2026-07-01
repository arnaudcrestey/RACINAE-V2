"use client"


import { BookPageText } from "./book-page-text"
import { BookPagePhotoRight } from "./book-page-photo-right"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
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
import { moodLabels } from "@/lib/demo-data"
import type { Mood } from "@/types/database"

const studioTools = [
  { icon: Image, label: "Ajouter une photo" },
  { icon: Video, label: "Ajouter une vidéo" },
  { icon: Mic, label: "Ajouter un audio" },
  { icon: PenLine, label: "Annotations" },
  { icon: Sparkles, label: "Décorations" },
]

type Memory = {
  id: string
  title: string
  content: string
  emotion: Mood | string | null
  memory_date: string | null
  ai_title: string | null
  ai_subtitle?: string | null
  ai_text: string | null
  layout?: string | null
  media_url?: string | null
  media_type?: string | null
  chapter?: string | null
  importance?: string | null
  created_at: string | null
}

function formatMemoryDate(date: string | null) {
  if (!date) return "Souvenir"

  const value = new Date(`${date}T12:00:00`)

  if (Number.isNaN(value.getTime())) return date

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value)
}

function BookPage({
  memory,
  pageNumber,
  side,
}: {
  memory?: Memory
  pageNumber: number
  side: "left" | "right"
}) {
  const label =
    memory?.emotion && memory.emotion in moodLabels
      ? moodLabels[memory.emotion as Mood]
      : memory?.emotion

  const layout = memory?.layout ?? "text_only"

  if (layout === "photo_right") {
    return (
      <BookPagePhotoRight
        memory={memory}
        pageNumber={pageNumber}
        side={side}
        formatMemoryDate={formatMemoryDate}
      />
    )
  }

  return (
    <BookPageText
      memory={memory}
      pageNumber={pageNumber}
      side={side}
      label={label}
      formatMemoryDate={formatMemoryDate}
    />
  )
}

export function BookStudio() {
  const [isAtelierOpen, setIsAtelierOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInput, setPageInput] = useState("1")
  const [searchQuery, setSearchQuery] = useState("")
  const [memories, setMemories] = useState<Memory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function loadMemories() {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/memories")
      const result = await response.json()

      if (!response.ok) {
        setError(result?.error ?? "Impossible de charger le livre.")
        setMemories([])
      } else {
        setMemories(result.memories ?? [])
      }

      setIsLoading(false)
    }

    loadMemories()
  }, [])

      useEffect(() => {
  const targetMemoryId = searchParams.get("memory")

  if (!targetMemoryId || !memories.length) return

  const targetIndex = memories.findIndex(
    (memory) => memory.id === targetMemoryId
  )

  if (targetIndex === -1) return

  goTo(targetIndex + 1)
}, [memories, searchParams])

  const totalPages = Math.max(memories.length, 1)
  const leftMemory = memories[currentPage - 1]
  const rightMemory = memories[currentPage]
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

  const pageLabel = useMemo(() => {
    if (!memories.length) return "Aucune page"
    return `Pages ${currentPage}${rightPage ? `-${rightPage}` : ""} sur ${totalPages}`
  }, [currentPage, memories.length, rightPage, totalPages])

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
                  Création
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
                <div className="mb-5">
  <input
    type="text"
    value={searchQuery}
    onChange={(event) => setSearchQuery(event.target.value)}
    placeholder="Rechercher un souvenir, une date ou un mot-clé..."
    className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
  />
</div>
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

          {error ? (
            <p className="px-4 text-center text-sm text-red-600">{error}</p>
          ) : null}

          <div className="w-full overflow-x-auto px-4 pb-4 sm:overflow-visible sm:px-0">
            <div className="mx-auto min-w-[620px] max-w-5xl sm:min-w-0">
              <div className="flex w-[620px] rounded-[30px] bg-[#d2bd96] p-3 shadow-[0_28px_70px_rgba(67,49,28,.26)] sm:w-full">
                {isLoading ? (
                  <>
                    <BookPage pageNumber={currentPage} side="left" />

                    <div className="w-[6px] shrink-0 bg-gradient-to-r from-[#b99f75] via-[#6f5536] to-[#d8c49c]" />

                    <BookPage pageNumber={currentPage + 1} side="right" />
                  </>
                ) : (
                  <>
                    <BookPage
                      memory={leftMemory}
                      pageNumber={currentPage}
                      side="left"
                    />

                    <div className="w-[6px] shrink-0 bg-gradient-to-r from-[#b99f75] via-[#6f5536] to-[#d8c49c]" />

                    <BookPage
                      memory={rightMemory}
                      pageNumber={currentPage + 1}
                      side="right"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 px-4 sm:flex-row">
            <button
              type="button"
              onClick={() => goTo(currentPage - 2)}
              disabled={currentPage <= 1 || isLoading}
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
                disabled={isLoading}
                className="rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground disabled:opacity-40"
              >
                Ouvrir
              </button>
            </div>

            <button
              type="button"
              onClick={() => goTo(currentPage + 2)}
              disabled={currentPage + 2 > totalPages || isLoading}
              className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Page suivante
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            {pageLabel}
          </p>
        </main>
      </Surface>
    </div>
  )
}
