import { PageShell } from "@/components/layout/page-shell"
import { SectionHeader } from "@/components/primitives/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LifeTree } from "@/components/life/life-tree"
import { LivingCalendar } from "@/components/life/living-calendar"
import { StatCard } from "@/components/primitives/stat-card"

export default function AppHomePage() {
  return (
    <PageShell className="space-y-8">
      <SectionHeader
        eyebrow="Aujourd'hui"
        title="Votre espace RACINAE"
        description="Une base navigable pour commencer a ecrire, programmer une capsule et consulter votre histoire."
      />
      <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <LifeTree memoriesCount={12} monthsCovered={2} />
        <LivingCalendar documentedDays={[1, 2, 5, 8, 11, 17, 21, 24]} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Souvenirs"
          value="12"
          description="Votre histoire continue de grandir."
        />
        <StatCard
          label="Capsules programmees"
          value="1"
          description="Un message attend une date future."
        />
        <StatCard
          label="Question du jour"
          value="1"
          description="Que souhaitez-vous retenir de cette journee ?"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Journal</CardTitle>
            <CardDescription>Conserver un souvenir ou une pensee.</CardDescription>
          </CardHeader>
          <Button asChild className="mt-5">
            <Link href="/app/journal/new">Ecrire aujourd&apos;hui</Link>
          </Button>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Capsules</CardTitle>
            <CardDescription>Preparer un message pour plus tard.</CardDescription>
          </CardHeader>
          <Button asChild className="mt-5" variant="outline">
            <Link href="/app/capsules/new">Creer une capsule</Link>
          </Button>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mon Histoire</CardTitle>
            <CardDescription>Voir la structure qui prendra forme.</CardDescription>
          </CardHeader>
          <Button asChild className="mt-5" variant="outline">
            <Link href="/app/history">Ouvrir</Link>
          </Button>
        </Card>
      </div>
    </PageShell>
  )
}
