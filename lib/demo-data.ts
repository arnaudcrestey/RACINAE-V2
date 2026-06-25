import type { Capsule, CapsuleRecipientKind, JournalEntry, Mood } from "@/types/database"

export type DemoProfile = {
  fullName: string
  birthdate: string
  intention: string
}

export type DemoJournalEntry = Omit<JournalEntry, "user_id">

export type DemoCapsule = Omit<Capsule, "user_id">

const now = new Date().toISOString()

export const defaultJournalEntries: DemoJournalEntry[] = [
  {
    id: "first-memory",
    title: "Un premier souvenir",
    content:
      "Aujourd'hui, je commence a garder une trace de ce qui compte vraiment.",
    mood: "good",
    entry_date: new Date().toISOString().slice(0, 10),
    created_at: now,
    updated_at: now,
  },
]

export const defaultCapsules: DemoCapsule[] = [
  {
    id: "future-self",
    title: "A moi dans un an",
    message: "J'espere que tu te souviendras de ce que tu voulais construire.",
    recipient_kind: "self",
    recipient_label: "Moi-meme",
    open_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    status: "scheduled",
    created_at: now,
    updated_at: now,
  },
]

export const defaultProfile: DemoProfile = {
  fullName: "Votre nom",
  birthdate: "",
  intention: "Conserver les moments importants.",
}

export const moodLabels: Record<Mood, string> = {
  very_good: "Tres belle journee",
  good: "Bonne journee",
  normal: "Journee normale",
  hard: "Journee difficile",
  complicated: "Journee compliquee",
}

export const recipientKindLabels: Record<CapsuleRecipientKind, string> = {
  self: "Moi-meme",
  person: "Une personne",
  people: "Plusieurs personnes",
}
