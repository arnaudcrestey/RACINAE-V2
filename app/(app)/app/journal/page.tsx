import Link from "next/link"

import { JournalList } from "@/components/journal/journal-list"
import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { Button } from "@/components/ui/button"

export default function JournalPage() {
  return (
    <PageShell className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="PAGES DU LIVRE"
          title="Pages du livre"
          description="Retrouvez les souvenirs déjà écrits et les pages qui composeront le livre de l’enfance."
        />

        <Button asChild>
          <Link href="/app/journal/new">Écrire un souvenir</Link>
        </Button>
      </div>

      <JournalList />
    </PageShell>
  )
}