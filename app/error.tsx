"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="page-x flex min-h-dvh items-center justify-center bg-background text-foreground">
      <section className="max-w-md space-y-5 text-center">
        <h1 className="font-heading text-4xl font-semibold">Une pause est necessaire</h1>
        <p className="text-muted-foreground">
          Quelque chose a interrompu l&apos;affichage. Vous pouvez reessayer.
        </p>
        <Button onClick={reset}>Reessayer</Button>
      </section>
    </main>
  )
}
