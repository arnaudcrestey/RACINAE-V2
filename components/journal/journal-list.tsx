"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { EmptyState } from "@/components/feedback/empty-state"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { moodLabels } from "@/lib/demo-data"
import type { Mood } from "@/types/database"

type Memory = {
  id: string
  title: string
  content: string
  emotion: Mood | string | null
  memory_date: string | null
  ai_title: string | null
  ai_text: string | null
  created_at: string | null
}

export function JournalList() {
  const [entries, setEntries] = useState<Memory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function loadMemories() {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/memories", {
        method: "GET",
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result?.error ?? "Impossible de charger les pages du livre.")
        setEntries([])
      } else {
        setEntries(result.memories ?? [])
      }

      setIsLoading(false)
    }

    loadMemories()
  }, [])

  const filteredEntries = useMemo(() => {
    if (!search.trim()) return entries

    const query = search.toLowerCase()

    return entries.filter((entry) => {
      return (
        (entry.title ?? "").toLowerCase().includes(query) ||
        (entry.content ?? "").toLowerCase().includes(query) ||
        (entry.ai_title ?? "").toLowerCase().includes(query) ||
        (entry.ai_text ?? "").toLowerCase().includes(query) ||
        (entry.memory_date ?? "").includes(query)
      )
    })
  }, [entries, search])

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">
        Chargement des pages du livre...
      </p>
    )
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>
  }

  if (!entries.length) {
    return (
      <EmptyState
        title="Aucune page pour le moment"
        description="Commencez par un souvenir simple. Le livre se construira avec le temps."
        action={
          <Button asChild>
            <Link href="/app/journal/new">Ajouter un souvenir</Link>
          </Button>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <Input
        type="search"
        placeholder="Rechercher un souvenir, une date ou un mot-clé..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filteredEntries.length === 0 ? (
        <EmptyState
          title="Aucun résultat"
          description="Essayez un autre mot-clé ou une autre date."
        />
      ) : (
        <div className="grid gap-4">
          {filteredEntries.map((entry) => {
            const label =
              entry.emotion && entry.emotion in moodLabels
                ? moodLabels[entry.emotion as Mood]
                : entry.emotion

            return (
              <Link key={entry.id} href={`/app/journal/${entry.id}`}>
                <Card className="transition-transform duration-300 hover:-translate-y-0.5">
                  <CardHeader>
                    <CardTitle>
                      {entry.ai_title || entry.title || "Souvenir sans titre"}
                    </CardTitle>

                    <CardDescription>
                      {entry.memory_date}
                      {label ? ` · ${label}` : ""}
                    </CardDescription>
                  </CardHeader>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {entry.ai_text || entry.content}
                  </p>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}