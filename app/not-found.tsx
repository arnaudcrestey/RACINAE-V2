import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="page-x flex min-h-dvh items-center justify-center bg-background text-foreground">
      <section className="max-w-md space-y-5 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Page introuvable
        </p>
        <h1 className="font-heading text-4xl font-semibold">
          Ce chemin n&apos;existe pas
        </h1>
        <p className="text-muted-foreground">
          Revenez a l&apos;accueil pour poursuivre dans un espace clair.
        </p>
        <Button asChild>
          <Link href="/">Revenir a l&apos;accueil</Link>
        </Button>
      </section>
    </main>
  )
}
