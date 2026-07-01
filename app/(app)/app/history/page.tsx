import { Suspense } from "react"

import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { HistoryTimeline } from "@/components/history/history-timeline"

export default function HistoryPage() {
  return (
    <PageShell className="space-y-8">
      <SectionHeader
        eyebrow="LE LIVRE"
        title="Studio d'édition"
        description="Prenez le temps de composer un livre unique."
      />

      <Suspense fallback={null}>
        <HistoryTimeline />
      </Suspense>
    </PageShell>
  )
}
