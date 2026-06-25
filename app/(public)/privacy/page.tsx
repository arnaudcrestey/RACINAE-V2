import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"

export default function PrivacyPage() {
  return (
    <PageShell size="narrow">
      <SectionHeader
        eyebrow="Confidentialite"
        title="Un espace personnel par nature"
        description="La page de confidentialite est reservee pour les contenus legaux valides."
      />
    </PageShell>
  )
}
