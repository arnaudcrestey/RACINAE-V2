import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { JournalEntryForm } from "@/components/journal/journal-entry-form"

export default function NewJournalEntryPage() {
  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="Journal"
        title="Nouvelle entree"
        description="Ecrivez simplement ce que vous souhaitez retenir."
      />
      <JournalEntryForm />
    </PageShell>
  )
}
