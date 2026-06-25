import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { SettingsPanel } from "@/components/settings/settings-panel"

export default function SettingsPage() {
  return (
    <PageShell className="space-y-8">
      <SectionHeader
        eyebrow="Parametres"
        title="Parametres"
        description="Configuration de base, session et confidentialite."
      />
      <SettingsPanel />
    </PageShell>
  )
}
