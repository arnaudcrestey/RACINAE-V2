import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { CapsuleList } from "@/components/capsules/capsule-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CapsulesPage() {
  return (
    <PageShell className="space-y-8">
      <SectionHeader
        eyebrow="Capsules"
        title="Les courriers du Temps"
        description="Des messages prepares pour une date future."
      />
      <Button asChild>
        <Link href="/app/capsules/new">Nouveau courrier</Link>
      </Button>
      <CapsuleList />
    </PageShell>
  )
}
