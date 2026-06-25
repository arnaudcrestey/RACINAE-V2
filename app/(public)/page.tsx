import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100dvh-5rem)] overflow-hidden">
      <section className="page-x mx-auto grid min-h-[calc(100dvh-5rem)] w-full max-w-6xl items-center gap-10 pb-12 pt-8 md:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.7fr)] md:gap-14 md:pb-16 md:pt-10">
        <div className="relative z-10 max-w-[43rem] space-y-8 racinae-rise-in">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
              Votre histoire, un jour a la fois
            </p>
            <div className="space-y-5">
              <h1 className="font-heading text-[3.85rem] font-semibold leading-[0.9] text-foreground min-[360px]:text-[4.55rem] sm:text-[6.2rem] md:text-[7.15rem]">
                Gardez ce que la vie efface doucement.
              </h1>
              <p className="max-w-[34rem] text-lg leading-8 text-foreground/82 sm:text-[1.35rem] sm:leading-10">
                Quelques lignes pour retenir un visage, une saison, une voix,
                un moment. Avec le temps, Racinae compose l&apos;histoire que
                vous ne voulez pas oublier.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-14 px-8 text-base">
              <Link href="/login">Ecrire mon premier souvenir</Link>
            </Button>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground sm:pl-2">
              Un espace prive. Aucun bruit. Rien a prouver.
            </p>
          </div>
        </div>

        <div className="relative z-0 mx-auto w-full max-w-[22rem] min-[390px]:max-w-[25rem] md:max-w-[27rem]">
          <FirstMemoryPage />
        </div>
      </section>
    </main>
  )
}

function FirstMemoryPage() {
  return (
    <div
      aria-hidden="true"
      className="racinae-memory-float relative aspect-[0.78] w-full"
    >
      <div className="absolute inset-x-8 bottom-4 h-24 rounded-[100%] bg-primary/12 blur-3xl" />
      <div className="absolute inset-0 rotate-[1.5deg] rounded-[2.25rem] border border-border/70 bg-card/82 shadow-[var(--shadow-soft)] backdrop-blur-2xl" />
      <div className="absolute inset-3 rounded-[1.8rem] border border-border/60 bg-background/92 shadow-[inset_0_1px_0_rgb(255_255_255_/_78%)]" />

      <div className="absolute inset-x-8 top-10 space-y-3">
        <span className="block h-2 w-16 rounded-full bg-primary/25" />
        <span className="block h-2 w-28 rounded-full bg-accent/55" />
      </div>

      <svg
        className="absolute inset-x-0 top-[18%] mx-auto h-[52%] w-[74%]"
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M129 220C129 170 129 134 129 82"
          stroke="var(--primary)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M129 151C102 126 79 112 51 108"
          stroke="var(--primary)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.78"
        />
        <path
          d="M130 132C154 104 181 90 211 86"
          stroke="var(--primary)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.78"
        />
        <path
          d="M72 128C51 101 28 90 6 94C18 122 40 137 72 128Z"
          fill="var(--life)"
          opacity="0.82"
        />
        <path
          d="M108 88C91 60 70 45 45 43C53 74 74 92 108 88Z"
          fill="var(--accent)"
          opacity="0.7"
        />
        <path
          d="M160 84C176 55 198 39 224 36C216 69 194 88 160 84Z"
          fill="var(--life)"
          opacity="0.78"
        />
        <path
          d="M190 120C216 98 239 91 258 99C238 124 214 132 190 120Z"
          fill="var(--accent)"
          opacity="0.68"
        />
        <path
          d="M88 229C107 240 153 240 172 229"
          stroke="var(--accent)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.72"
        />
      </svg>

      <div className="absolute inset-x-8 bottom-10 space-y-3">
        <p className="font-heading text-3xl font-semibold leading-none text-foreground">
          Une premiere page
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Le debut d&apos;une histoire qui grandit avec vous.
        </p>
      </div>
    </div>
  )
}
