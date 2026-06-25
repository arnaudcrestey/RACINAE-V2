import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { JournalEntryDetail } from "@/components/journal/journal-entry-detail"

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="Journal"
        title="Entree"
        description="Consultez ou modifiez ce souvenir."
      />
      <JournalEntryDetail entryId={id} />
    </PageShell>
  )
}
