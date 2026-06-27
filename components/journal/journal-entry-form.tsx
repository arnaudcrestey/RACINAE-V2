"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EmotionSelector } from "@/components/journal/emotion-selector"
import { MediaUploaderPlaceholder } from "@/components/media/media-uploader-placeholder"
import {
  defaultJournalEntries,
  type DemoJournalEntry,
} from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"
import type { Mood } from "@/types/database"

type JournalEntryFormProps = {
  entryId?: string
}

export function JournalEntryForm({ entryId }: JournalEntryFormProps) {
  const router = useRouter()
  const [entries, setEntries] = useLocalStorageState<DemoJournalEntry[]>(
    "racinae-journal",
    defaultJournalEntries
  )
  const entry = entries.find((item) => item.id === entryId)

  function handleSubmit(formData: FormData) {
    const id = entry?.id ?? crypto.randomUUID()
    const updatedAt = new Date().toISOString()

    const nextEntry: DemoJournalEntry = {
      id,
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      mood: String(formData.get("mood") || "normal") as Mood,
      entry_date: String(
        formData.get("entry_date") ?? new Date().toISOString().slice(0, 10)
      ),
      created_at: entry?.created_at ?? updatedAt,
      updated_at: updatedAt,
    }

    setEntries((current) => {
      const exists = current.some((item) => item.id === id)

      return exists
        ? current.map((item) => (item.id === id ? nextEntry : item))
        : [nextEntry, ...current]
    })

    router.push(`/app/journal/${id}`)
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du souvenir</Label>
        <Input
          id="title"
          name="title"
          defaultValue={entry?.title ?? ""}
          placeholder="Ex. Sa première rentrée"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="entry_date">Date du souvenir</Label>
        <Input
          id="entry_date"
          name="entry_date"
          type="date"
          defaultValue={
            entry?.entry_date ?? new Date().toISOString().slice(0, 10)
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mood">Émotion associée</Label>
        <EmotionSelector defaultValue={entry?.mood ?? "normal"} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Récit du souvenir</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={entry?.content ?? ""}
          placeholder="Racontez simplement ce moment, avec vos mots."
          required
        />
      </div>

      <MediaUploaderPlaceholder />

      <Button size="lg">
        {entry ? "Enregistrer les modifications" : "Enregistrer le souvenir"}
      </Button>
    </form>
  )
}