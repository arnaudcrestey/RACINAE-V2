import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { HistoryTimeline } from "@/components/history/history-timeline"

export default function HistoryPage() {
  return (
    <PageShell className="space-y-8">
      <SectionHeader
        eyebrow="Mon Histoire"
        title="Mon Histoire"
        description="La chronologie intelligente est preparee. Les resumes IA viendront ensuite."
      />
      <HistoryTimeline />
    </PageShell>
  )
}
