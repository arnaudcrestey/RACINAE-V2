import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { AuthForm } from "@/components/forms/auth-form"
import { signUpAction } from "@/app/(public)/auth-actions"

export default function RegisterPage() {
  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="Inscription"
        title="Commencer votre histoire"
        description="Creez votre espace personnel pour commencer a conserver ce qui compte."
      />
      <AuthForm mode="register" action={signUpAction} />
    </PageShell>
  )
}
