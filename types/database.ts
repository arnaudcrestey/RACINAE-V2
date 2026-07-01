export type Mood =
  | "very_good"
  | "good"
  | "normal"
  | "hard"
  | "complicated"

export type MediaType = "image" | "audio" | "video"

export type CapsuleRecipientKind = "self" | "person" | "people"

export type CapsuleStatus = "scheduled" | "opened" | "archived"

export type AiSummaryKind = "monthly" | "yearly" | "history"

export type JournalEntry = {
  id: string
  user_id: string
  title: string | null
  content: string
  mood: Mood | null
  entry_date: string
  created_at: string
  updated_at: string
}

export type Capsule = {
  id: string
  user_id: string
  title: string
  message: string
  recipient_kind: CapsuleRecipientKind
  sender_label: string | null
  recipient_label: string | null
  open_at: string
  status: CapsuleStatus
  created_at: string
  updated_at: string
}
