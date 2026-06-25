import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { CapsuleForm } from "@/components/capsules/capsule-form"

export default function NewCapsulePage() {
  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="Capsules"
        title="Nouvelle capsule"
        description="Preparez un message pour demain, dans un an ou plus tard."
      />
      <CapsuleForm />
    </PageShell>
  )
}
