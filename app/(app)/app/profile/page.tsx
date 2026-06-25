import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { ProfileForm } from "@/components/profile/profile-form"

export default function ProfilePage() {
  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="Profil"
        title="Profil"
        description="Les informations de base de votre espace personnel."
      />
      <ProfileForm />
    </PageShell>
  )
}
