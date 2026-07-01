import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-racinae-vitrine px-3 py-3 text-foreground sm:px-6 sm:py-4 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100dvh-1.5rem)] w-full max-w-6xl items-center justify-center">
        <div className="premium-vitrine-card relative flex max-h-[calc(100dvh-1.5rem)] w-full overflow-hidden rounded-[1.65rem] px-4 py-5 sm:rounded-[2.5rem] sm:px-10 sm:py-8 lg:px-16 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-racinae-paper" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(to_top,rgb(154_118_87_/_0.10),transparent)]" />
          <div className="pointer-events-none absolute -bottom-28 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full border border-primary/10" />
          <div className="pointer-events-none absolute -bottom-44 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full border border-life/10" />

          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
            <p className="mb-3 text-[0.58rem] font-semibold uppercase tracking-[0.36em] text-primary/80 sm:mb-5 sm:text-xs sm:tracking-[0.5em]">
              Le livre de mon enfance
            </p>

            <h1 className="font-heading text-[2.8rem] font-semibold leading-none tracking-[0.08em] text-foreground min-[380px]:text-[3.45rem] sm:text-[6.5rem] sm:tracking-[0.13em] md:text-[7.7rem]">
              RACINAE
            </h1>

            <div className="my-3 h-px w-20 bg-primary/20 sm:my-5 sm:w-28" />

            <h2 className="max-w-3xl font-heading text-[1.95rem] font-semibold leading-[1.02] tracking-[-0.05em] text-foreground min-[380px]:text-[2.15rem] sm:text-[3rem] md:text-[3.55rem]">
              Le premier livre
              <br />
              qui s&apos;écrit pendant
              <br />
              que votre enfant grandit.
            </h2>

            <p className="mx-auto mt-4 max-w-[21.5rem] text-[0.86rem] leading-6 text-muted-foreground sm:mt-5 sm:max-w-2xl sm:text-base sm:leading-8">
              Quelques minutes suffisent pour préserver les souvenirs, les petits
              instants et les grandes étapes qui composeront, un jour, le livre
              de son enfance.
            </p>

            <Button
              asChild
              size="lg"
              className="mt-5 h-11 rounded-full px-7 text-sm shadow-[0_18px_42px_rgb(154_118_87_/_0.22)] sm:mt-7 sm:h-12 sm:px-8"
            >
              <Link href="/page-pub">Commencer</Link>
            </Button>

            <p className="mt-5 font-heading text-[0.95rem] leading-7 text-foreground/62 sm:mt-7 sm:text-lg sm:leading-8">
              Un souvenir aujourd&apos;hui.
              <br />
              Un trésor pour toute une vie.
            </p>

            <div className="relative mt-3 w-full max-w-[9.5rem] sm:mt-5 sm:max-w-[18rem] md:max-w-[21rem]">
              <LifeTreeMark />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function LifeTreeMark() {
  return (
    <div
      aria-hidden="true"
      className="racinae-memory-float relative aspect-[1.3] w-full opacity-90"
    >
      <div className="absolute inset-x-10 bottom-2 h-24 rounded-[100%] bg-primary/12 blur-3xl" />

      <svg
        className="absolute inset-0 mx-auto h-full w-full"
        viewBox="0 0 360 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M180 240C180 181 180 141 180 80"
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M180 154C146 126 113 109 73 105"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.62"
        />
        <path
          d="M181 138C215 106 251 89 291 84"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.62"
        />
        <path
          d="M180 183C150 164 118 155 82 157"
          stroke="var(--primary)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.42"
        />
        <path
          d="M181 178C214 153 247 143 284 145"
          stroke="var(--primary)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.42"
        />

        <path
          d="M98 128C66 96 34 85 5 94C27 126 58 143 98 128Z"
          fill="var(--life)"
          opacity="0.56"
        />
        <path
          d="M145 84C119 48 88 31 51 34C68 73 99 92 145 84Z"
          fill="var(--accent)"
          opacity="0.46"
        />
        <path
          d="M219 80C244 44 276 25 314 27C299 69 265 91 219 80Z"
          fill="var(--life)"
          opacity="0.58"
        />
        <path
          d="M265 122C302 92 334 84 358 96C330 127 299 139 265 122Z"
          fill="var(--accent)"
          opacity="0.42"
        />
        <path
          d="M101 176C70 155 42 150 17 160C43 184 72 191 101 176Z"
          fill="var(--life)"
          opacity="0.38"
        />
        <path
          d="M257 176C287 154 316 148 342 158C315 184 286 191 257 176Z"
          fill="var(--life)"
          opacity="0.36"
        />

        <path
          d="M126 253C148 269 213 269 235 253"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.52"
        />
        <path
          d="M142 265C162 274 199 274 218 265"
          stroke="var(--life)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.34"
        />
      </svg>
    </div>
  )
}