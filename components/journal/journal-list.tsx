"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { EmptyState } from "@/components/feedback/empty-state"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  defaultJournalEntries,
  moodLabels,
  type DemoJournalEntry,
} from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

export function JournalList() {
  const [entries] = useLocalStorageState<DemoJournalEntry[]>(
    "racinae-journal",
    defaultJournalEntries
  )

  const [search, setSearch] = useState("")

  const filteredEntries = useMemo(() => {
    if (!search.trim()) return entries

    const query = search.toLowerCase()

    return entries.filter((entry) => {
      return (
        (entry.title ?? "").toLowerCase().includes(query) ||
        (entry.content ?? "").toLowerCase().includes(query) ||
        (entry.entry_date ?? "").includes(query)
      )
    })
  }, [entries, search])

  if (!entries.length) {
    return (
      <EmptyState
        title="Aucune page pour le moment"
        description="Commencez par un souvenir simple. Le livre se construira avec le temps."
        action={
          <Button asChild>
            <Link href="/app/journal/new">Écrire un souvenir</Link>
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
          {filteredEntries.map((entry) => (
            <Link key={entry.id} href={`/app/journal/${entry.id}`}>
              <Card className="transition-transform duration-300 hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle>{entry.title || "Souvenir sans titre"}</CardTitle>

                  <CardDescription>
                    {entry.entry_date}
                    {entry.mood ? ` · ${moodLabels[entry.mood]}` : ""}
                  </CardDescription>
                </CardHeader>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {entry.content}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}