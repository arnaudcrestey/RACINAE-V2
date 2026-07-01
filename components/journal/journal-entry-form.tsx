"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EmotionSelector } from "@/components/journal/emotion-selector"
import { MediaUploaderPlaceholder } from "@/components/media/media-uploader-placeholder"
import type { Mood } from "@/types/database"

type JournalEntryFormProps = {
  entryId?: string
}

type MemoryFormData = {
  title: string
  content: string
  emotion: Mood | string | null
  memory_date: string | null
  media_url: string | null
}

export function JournalEntryForm({ entryId }: JournalEntryFormProps) {
  const router = useRouter()
  const isEditing = Boolean(entryId)

  const [isLoading, setIsLoading] = useState(Boolean(entryId))
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [initialData, setInitialData] = useState<MemoryFormData | null>(null)

  useEffect(() => {
    if (!entryId) return

    async function loadMemory() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/memories?id=${entryId}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result?.error ?? "Impossible de charger ce souvenir.")
        }

        const memory = result.memory as MemoryFormData
        setInitialData(memory)
        setPhotoUrl(memory.media_url ?? null)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue pendant le chargement."
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadMemory()
  }, [entryId])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSaving(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const payload = {
      id: entryId,
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      emotion: String(formData.get("mood") || "normal") as Mood,
      memory_date: String(
        formData.get("entry_date") ?? new Date().toISOString().slice(0, 10)
      ),
      media_url: photoUrl,
      media_type: photoUrl ? "photo" : null,
    }

    try {
      const response = await fetch("/api/memories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error ?? "Impossible d’enregistrer le souvenir.")
      }

      router.push(`/app/history?memory=${result.memory.id}`)
      router.refresh()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l’enregistrement."
      )
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border bg-card p-5 text-sm text-muted-foreground">
        Chargement du souvenir...
      </div>
    )
  }

  if (isSaving) {
    return (
      <div className="rounded-3xl border bg-card px-6 py-12 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>

        <h2 className="mt-6 font-heading text-2xl">
          {isEditing
            ? "Nous mettons à jour cette page..."
            : "Nous écrivons cette nouvelle page..."}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Ce souvenir va bientôt rejoindre le Livre de mon enfance.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du souvenir</Label>
        <Input
          id="title"
          name="title"
          placeholder="Ex. Sa première rentrée"
          defaultValue={initialData?.title ?? ""}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="entry_date">Date du souvenir</Label>
        <Input
          id="entry_date"
          name="entry_date"
          type="date"
          defaultValue={
            initialData?.memory_date ?? new Date().toISOString().slice(0, 10)
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mood">Émotion associée</Label>
        <EmotionSelector
          defaultValue={(initialData?.emotion as Mood) ?? "normal"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Récit du souvenir</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Racontez simplement ce moment, avec vos mots."
          defaultValue={initialData?.content ?? ""}
          required
        />
      </div>

      {photoUrl ? (
        <div className="overflow-hidden rounded-2xl border bg-card">
          <img
            src={photoUrl}
            alt="Photo associée au souvenir"
            className="h-48 w-full object-cover"
          />
        </div>
      ) : null}

      <MediaUploaderPlaceholder onPhotoUploaded={setPhotoUrl} />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button size="lg" disabled={isSaving} className="w-full">
        {isEditing ? "Enregistrer les modifications" : "Enregistrer le souvenir"}
      </Button>
    </form>
  )
}