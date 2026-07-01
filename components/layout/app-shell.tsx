import Link from "next/link"
import type { ReactNode } from "react"

type AppShellProps = {
  children: ReactNode
}

const navLinks = [
  { href: "/app", label: "A la une" },
  { href: "/app/journal/new", label: "Ajouter un souvenir" },
  { href: "/app/history", label: "Le livre de mon enfance" },
  { href: "/app/capsules/new", label: "Capsule temporelle" },
  { href: "/app/capsules", label: "Les Courriers du Temps" },
  { href: "/app/profile", label: "Profil" },
  { href: "/app/settings", label: "Réglages" },
]

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-[#F7F3EC] text-[#2E2923]">
      <header className="sticky top-0 z-40 border-b border-[#E8DED1] bg-[#FBF8F3]/92 backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pt-7 pb-4 sm:px-6 sm:pt-4 lg:px-8">
          <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
            <Link
              href="/app"
              className="font-serif text-xl font-medium tracking-[0.18em] text-[#2A241F]"
            >
              RACINAE
            </Link>

            <div className="hidden text-center md:block">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#9B7658]">
                Le livre de mon enfance
              </p>
              <p className="mt-1 text-xs text-[#7A7168]">
                Souvenir après souvenir
              </p>
            </div>

            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E1D6C8] bg-white/80 text-sm text-[#8B684C] shadow-sm transition hover:bg-white md:justify-self-end"
              aria-label="Profil"
            >
              ✦
            </Link>
          </div>

          <nav className="mx-auto flex max-w-full gap-2 overflow-x-auto border-t border-[#E8DED1]/70 pt-3 md:justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full border border-transparent px-4 py-2 text-xs font-medium text-[#6E6860] transition hover:border-[#E1D6C8] hover:bg-white/80 hover:text-[#2A241F]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[var(--app-shell-max)]">
        {children}
      </div>

      <footer className="mt-12 border-t border-[#E8DED1] bg-[#FBF8F3]">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-10 text-center sm:px-6 lg:px-8">
          <p className="font-serif text-xl tracking-[0.18em] text-[#2A241F]">
            RACINAE
          </p>

          <div className="my-4 h-px w-20 bg-[#D8C9B8]" />

          <p className="max-w-xl text-xs leading-6 text-[#7A7168] sm:text-sm sm:leading-7">
  Le livre de mon enfance - Les Courriers du Temps
  <br className="hidden sm:block" />
  {" "}Transmettre ce qui compte vraiment.
</p>
        </div>
      </footer>
    </div>
  )
}