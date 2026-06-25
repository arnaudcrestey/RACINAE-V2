import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { AuthForm } from "@/components/forms/auth-form"
import { signInAction } from "@/app/(public)/auth-actions"

export default function LoginPage() {
  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="Connexion"
        title="Retrouver votre espace"
        description="Connectez-vous pour retrouver votre journal de vie."
      />
      <AuthForm mode="login" action={signInAction} />
    </PageShell>
  )
}
