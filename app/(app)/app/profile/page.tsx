import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { ProfileForm } from "@/components/profile/profile-form"

export default function ProfilePage() {
  return (
    <PageShell className="space-y-8">
      <SectionHeader
        eyebrow="Profil"
        title="Mon espace"
        description="Personnalisez l’identité du livre, les courriers du temps et les préférences de transmission."
      />
      <ProfileForm />
    </PageShell>
  )
}