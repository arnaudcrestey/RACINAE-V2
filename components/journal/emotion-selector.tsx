import { moodLabels } from "@/lib/demo-data"
import type { Mood } from "@/types/database"

type EmotionSelectorProps = {
  defaultValue?: Mood | null
}

export function EmotionSelector({ defaultValue = "normal" }: EmotionSelectorProps) {
  return (
    <select
      id="mood"
      name="mood"
      defaultValue={defaultValue ?? "normal"}
      className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
    >
      {Object.entries(moodLabels).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}
