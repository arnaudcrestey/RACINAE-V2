import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { JournalList } from "@/components/journal/journal-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function JournalPage() {
  return (
    <PageShell className="space-y-8">
      <SectionHeader
        eyebrow="Journal"
        title="Journal"
        description="Vos souvenirs et moments importants."
      />
      <Button asChild>
        <Link href="/app/journal/new">Nouvelle entree</Link>
      </Button>
      <JournalList />
    </PageShell>
  )
}
