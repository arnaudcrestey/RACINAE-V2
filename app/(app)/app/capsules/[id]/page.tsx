import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { CapsuleDetail } from "@/components/capsules/capsule-detail"

export default async function CapsulePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <PageShell className="space-y-8" size="narrow">
      <SectionHeader
        eyebrow="Capsules"
        title="Capsule"
        description="Consultez ou modifiez ce message programme."
      />
      <CapsuleDetail capsuleId={id} />
    </PageShell>
  )
}
