import Link from "next/link"
import { UserRound } from "lucide-react"

import { RacinaeWordmark } from "@/components/brand/racinae-wordmark"
import { Button } from "@/components/ui/button"
import { appRoutes } from "@/config/routes"

export function AppTopBar() {
  return (
    <header className="safe-pt fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/82 backdrop-blur-2xl">
      <div className="page-x mx-auto flex h-[3.75rem] max-w-[var(--app-shell-max)] items-center justify-between gap-4">
        <Link href={appRoutes.home} aria-label="RACINAE - espace personnel">
          <RacinaeWordmark className="text-[1.35rem]" />
        </Link>
        <Button asChild variant="ghost" size="icon" aria-label="Profil">
          <Link href={appRoutes.profile}>
            <UserRound aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </header>
  )
}
