"use client"

import Link from "next/link"

import { EmptyState } from "@/components/feedback/empty-state"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { defaultJournalEntries, moodLabels, type DemoJournalEntry } from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

export function JournalList() {
  const [entries] = useLocalStorageState<DemoJournalEntry[]>(
    "racinae-journal",
    defaultJournalEntries
  )

  if (!entries.length) {
    return (
      <EmptyState
        title="Aucun souvenir pour le moment"
        description="Commencez par une pensee simple. Le reste viendra avec le temps."
        action={
          <Button asChild>
            <Link href="/app/journal/new">Ecrire aujourd&apos;hui</Link>
          </Button>
        }
      />
    )
  }

  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <Link key={entry.id} href={`/app/journal/${entry.id}`}>
          <Card className="transition-transform duration-300 hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>{entry.title || "Souvenir sans titre"}</CardTitle>
              <CardDescription>
                {entry.entry_date}
                {entry.mood ? ` - ${moodLabels[entry.mood]}` : ""}
              </CardDescription>
            </CardHeader>
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {entry.content}
            </p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
