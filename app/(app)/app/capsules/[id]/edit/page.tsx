import { CapsuleForm } from "@/components/capsules/capsule-form"
import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"

export default async function EditCapsulePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="Capsules"
        title="Modifier la capsule"
        description="Ajustez le message ou sa date d'ouverture."
      />
      <CapsuleForm capsuleId={id} />
    </PageShell>
  )
}
