"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Surface } from "@/components/ui/surface"
import { defaultJournalEntries, moodLabels, type DemoJournalEntry } from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

type JournalEntryDetailProps = {
  entryId: string
}

export function JournalEntryDetail({ entryId }: JournalEntryDetailProps) {
  const router = useRouter()
  const [entries, setEntries] = useLocalStorageState<DemoJournalEntry[]>(
    "racinae-journal",
    defaultJournalEntries
  )
  const entry = entries.find((item) => item.id === entryId)

  if (!entry) {
    return (
      <Surface>
        <p className="text-muted-foreground">
          Ce souvenir n&apos;existe pas encore.
        </p>
      </Surface>
    )
  }

  return (
    <article className="space-y-5">
      <Surface>
        <p className="text-sm text-muted-foreground">
          {entry.entry_date}
          {entry.mood ? ` - ${moodLabels[entry.mood]}` : ""}
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold">
          {entry.title || "Souvenir sans titre"}
        </h2>
        <p className="mt-5 whitespace-pre-wrap leading-8 text-foreground/85">
          {entry.content}
        </p>
      </Surface>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={`/app/journal/${entry.id}/edit`}>Modifier</Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setEntries((current) => current.filter((item) => item.id !== entry.id))
            router.push("/app/journal")
          }}
        >
          Supprimer
        </Button>
      </div>
    </article>
  )
}
