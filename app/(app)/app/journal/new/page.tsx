import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { JournalEntryForm } from "@/components/journal/journal-entry-form"

export default function NewJournalEntryPage() {
  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="SOUVENIR"
        title="Écrire un souvenir"
        description="Notez un moment, une phrase, une étape ou une émotion à conserver pour le livre de l’enfance."
      />

      <JournalEntryForm />
    </PageShell>
  )
}