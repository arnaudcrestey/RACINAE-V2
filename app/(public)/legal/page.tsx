import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"

export default function LegalPage() {
  return (
    <PageShell size="narrow">
      <SectionHeader
        eyebrow="Mentions legales"
        title="Informations legales"
        description="Cette page accueillera les mentions legales validees."
      />
    </PageShell>
  )
}
