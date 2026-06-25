"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MediaUploaderPlaceholder } from "@/components/media/media-uploader-placeholder"
import {
  defaultCapsules,
  recipientKindLabels,
  type DemoCapsule,
} from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"
import type { CapsuleRecipientKind } from "@/types/database"

type CapsuleFormProps = {
  capsuleId?: string
}

const fallbackOpenDate = "2027-01-01"

export function CapsuleForm({ capsuleId }: CapsuleFormProps) {
  const router = useRouter()
  const [capsules, setCapsules] = useLocalStorageState<DemoCapsule[]>(
    "racinae-capsules",
    defaultCapsules
  )
  const capsule = capsules.find((item) => item.id === capsuleId)

  function handleSubmit(formData: FormData) {
    const id = capsule?.id ?? crypto.randomUUID()
    const updatedAt = new Date().toISOString()
    const openAt = String(formData.get("open_at") ?? "") || fallbackOpenDate

    const nextCapsule: DemoCapsule = {
      id,
      title: String(formData.get("title") ?? ""),
      message: String(formData.get("message") ?? ""),
      recipient_kind: String(formData.get("recipient_kind") ?? "self") as CapsuleRecipientKind,
      recipient_label: String(formData.get("recipient_label") ?? ""),
      open_at: new Date(openAt).toISOString(),
      status: "scheduled",
      created_at: capsule?.created_at ?? updatedAt,
      updated_at: updatedAt,
    }

    setCapsules((current) => {
      const exists = current.some((item) => item.id === id)
      return exists
        ? current.map((item) => (item.id === id ? nextCapsule : item))
        : [nextCapsule, ...current]
    })

    router.push(`/app/capsules/${id}`)
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input id="title" name="title" defaultValue={capsule?.title ?? ""} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="recipient_kind">Destinataire</Label>
        <select
          id="recipient_kind"
          name="recipient_kind"
          defaultValue={capsule?.recipient_kind ?? "self"}
          className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
        >
          {Object.entries(recipientKindLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="recipient_label">Nom du destinataire</Label>
        <Input
          id="recipient_label"
          name="recipient_label"
          defaultValue={capsule?.recipient_label ?? ""}
          placeholder="Optionnel"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="open_at">Date d&apos;ouverture</Label>
        <Input
          id="open_at"
          name="open_at"
          type="date"
          defaultValue={
            capsule?.open_at
              ? new Date(capsule.open_at).toISOString().slice(0, 10)
              : fallbackOpenDate
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          defaultValue={capsule?.message ?? ""}
          required
        />
      </div>
      <MediaUploaderPlaceholder />
      <Button size="lg">{capsule ? "Enregistrer" : "Creer la capsule"}</Button>
    </form>
  )
}
