"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, Clock, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MediaUploaderPlaceholder } from "@/components/media/media-uploader-placeholder"
import { defaultCapsules, type DemoCapsule } from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

type CapsuleFormProps = {
  capsuleId?: string
}

type DatePreset = "1y" | "5y" | "10y" | "18y" | "25y" | "custom"

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 31 }, (_, index) => currentYear + index)
const months = Array.from({ length: 12 }, (_, index) => index + 1)
const days = Array.from({ length: 31 }, (_, index) => index + 1)

const presets: { value: DatePreset; label: string }[] = [
  { value: "1y", label: "Dans 1 an" },
  { value: "5y", label: "Dans 5 ans" },
  { value: "10y", label: "Dans 10 ans" },
  { value: "18y", label: "Pour ses 18 ans" },
  { value: "25y", label: "Pour ses 25 ans" },
  { value: "custom", label: "Date précise" },
]

function pad(value: number) {
  return String(value).padStart(2, "0")
}

function getDateParts(value?: string) {
  const date = value ? new Date(value) : new Date(currentYear + 1, 0, 1)

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
}

function getPresetDate(preset: DatePreset) {
  const today = new Date()

  if (preset === "1y") return new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
  if (preset === "5y") return new Date(today.getFullYear() + 5, today.getMonth(), today.getDate())
  if (preset === "10y") return new Date(today.getFullYear() + 10, today.getMonth(), today.getDate())
  if (preset === "18y") return new Date(today.getFullYear() + 18, today.getMonth(), today.getDate())
  if (preset === "25y") return new Date(today.getFullYear() + 25, today.getMonth(), today.getDate())

  return new Date(currentYear + 1, 0, 1)
}

export function CapsuleForm({ capsuleId }: CapsuleFormProps) {
  const router = useRouter()
  const [isSealing, setIsSealing] = useState(false)
  const [sealedDate, setSealedDate] = useState<string | null>(null)
  const [datePreset, setDatePreset] = useState<DatePreset>("1y")

  const [capsules, setCapsules] = useLocalStorageState<DemoCapsule[]>(
    "racinae-capsules",
    defaultCapsules
  )

  const capsule = capsules.find((item) => item.id === capsuleId)
  const dateParts = getDateParts(capsule?.open_at)

  function handleSubmit(formData: FormData) {
    const id = capsule?.id ?? crypto.randomUUID()
    const updatedAt = new Date().toISOString()

    let openDate: Date

    if (datePreset === "custom" || capsule) {
      const day = Number(formData.get("open_day") ?? 1)
      const month = Number(formData.get("open_month") ?? 1)
      const year = Number(formData.get("open_year") ?? currentYear + 1)
      openDate = new Date(year, month - 1, day)
    } else {
      openDate = getPresetDate(datePreset)
    }

    const nextCapsule: DemoCapsule = {
      id,
      title: String(formData.get("title") ?? ""),
      message: String(formData.get("message") ?? ""),
      recipient_kind: "person",
      recipient_label: String(formData.get("recipient_label") ?? ""),
      sender_label: String(formData.get("sender_label") ?? ""),
      open_at: openDate.toISOString(),
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

    if (capsule) {
      router.push(`/app/capsules/${id}`)
      return
    }

    setSealedDate(openDate.toLocaleDateString("fr-FR"))
    setIsSealing(true)

    window.setTimeout(() => {
      router.push("/app/capsules")
    }, 3200)
  }

  if (isSealing) {
    return (
      <div className="flex min-h-[520px] items-center justify-center">
        <div className="mx-auto max-w-md text-center">
          <div className="relative mx-auto flex size-28 items-center justify-center rounded-[2rem] border bg-card shadow-xl">
            <Mail className="size-12 text-muted-foreground" aria-hidden="true" />
            <div className="absolute -bottom-3 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Lock className="size-5" aria-hidden="true" />
            </div>
          </div>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Courrier scellé
          </p>

          <h2 className="mt-4 font-heading text-4xl font-semibold">
            Votre courrier est désormais scellé.
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Nous le conservons précieusement.
            <br />
            Il restera fermé jusqu&apos;au{" "}
            <span className="font-medium text-foreground">{sealedDate}</span>.
          </p>

          <p className="mt-8 text-sm text-muted-foreground">
            Dépôt dans les Courriers du Temps...
          </p>
        </div>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="rounded-[2.5rem] border bg-gradient-to-br from-card via-card to-muted/50 p-8 shadow-sm sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-[1.6rem] border bg-background shadow-sm">
            <Mail className="size-9 text-muted-foreground" aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            Les Courriers du Temps
          </p>

          <h2 className="mt-4 font-heading text-4xl font-semibold sm:text-5xl">
            Le temps gardera vos mots.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
            Les mots écrits aujourd&apos;hui seront conservés jusqu&apos;au
            moment choisi.
          </p>
        </div>
      </div>

      <div className="rounded-[2.5rem] border bg-card p-6 shadow-sm sm:p-9">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Mail className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <p className="text-sm font-medium">Enveloppe</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Objet</Label>
            <Input
              id="title"
              name="title"
              defaultValue={capsule?.title ?? ""}
              placeholder="Ex. Pour tes 18 ans"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sender_label">De</Label>
              <Input
                id="sender_label"
                name="sender_label"
                defaultValue={capsule?.sender_label ?? ""}
                placeholder="Votre prénom"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient_label">À</Label>
              <Input
                id="recipient_label"
                name="recipient_label"
                defaultValue={capsule?.recipient_label ?? ""}
                placeholder="Prénom du destinataire"
                required
              />
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-dashed bg-muted/30 p-5">
            <div className="flex items-center gap-3">
              <CalendarDays className="size-5 text-muted-foreground" />
              <Label>Quand souhaitez-vous l&apos;ouvrir ?</Label>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setDatePreset(preset.value)}
                  className={`rounded-2xl border px-4 py-3 text-sm transition ${
                    datePreset === preset.value
                      ? "border-foreground bg-foreground text-background"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {(datePreset === "custom" || capsule) ? (
              <div className="grid grid-cols-3 gap-3 pt-2">
                <select
                  name="open_day"
                  defaultValue={dateParts.day}
                  className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {pad(day)}
                    </option>
                  ))}
                </select>

                <select
                  name="open_month"
                  defaultValue={dateParts.month}
                  className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {pad(month)}
                    </option>
                  ))}
                </select>

                <select
                  name="open_year"
                  defaultValue={dateParts.year}
                  className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            <p className="flex items-start gap-2 text-xs leading-6 text-muted-foreground">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              Une fois scellé, ce courrier restera fermé jusqu&apos;à la date
              choisie.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[2.5rem] border bg-[#fffaf0] p-6 shadow-sm sm:p-10">
        <div className="mx-auto max-w-2xl">
          <Label htmlFor="message" className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Votre lettre
          </Label>

          <Textarea
            id="message"
            name="message"
            defaultValue={capsule?.message ?? ""}
            placeholder="Écrivez ici ce que vous souhaitez confier au temps..."
            className="mt-5 min-h-[320px] resize-y border-0 bg-transparent px-0 font-serif text-lg leading-9 shadow-none focus-visible:ring-0"
            required
          />

          <div className="mt-6 border-t pt-6">
            <MediaUploaderPlaceholder />
          </div>
        </div>
      </div>

      <div className="rounded-[2.5rem] border bg-card p-6 text-center shadow-sm sm:p-8">
        <Lock className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
          À partir du moment où vous scellerez ce courrier, il restera fermé
          jusqu&apos;à la date choisie.
        </p>

        <Button size="lg" className="mt-6 px-10">
          {capsule ? "Enregistrer les modifications" : "Sceller ce courrier"}
        </Button>
      </div>
    </form>
  )
}