import { JournalEntryForm } from "@/components/journal/journal-entry-form"
import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"

export default async function EditJournalEntryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="Journal"
        title="Modifier le souvenir"
        description="Ajustez le texte sans perdre l'intention initiale."
      />
      <JournalEntryForm entryId={id} />
    </PageShell>
  )
}
