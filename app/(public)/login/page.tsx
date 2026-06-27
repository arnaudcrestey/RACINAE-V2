import Link from "next/link"

import { signInAction } from "@/app/(public)/auth-actions"
import { AuthForm } from "@/components/forms/auth-form"

export default function LoginPage() {
  return (
    <main className="min-h-dvh bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-4xl items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-border/70 bg-card/82 px-6 py-10 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgb(154_118_87_/_10%),transparent_26rem)]" />

          <div className="relative mx-auto max-w-xl">
            <Link
              href="/"
              className="mb-8 block text-center font-heading text-2xl font-semibold tracking-[0.2em] text-foreground sm:mb-10 sm:text-3xl"
            >
              RACINAE
            </Link>

            <div className="mb-8 text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-primary/80">
                Connexion
              </p>

              <h1 className="font-heading text-4xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-5xl">
                Retrouver mon livre
              </h1>

              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Connectez-vous pour poursuivre les souvenirs, les pages et les
                courriers qui composeront son histoire.
              </p>
            </div>

            <AuthForm mode="login" action={signInAction} />
          </div>
        </div>
      </section>
    </main>
  )
}