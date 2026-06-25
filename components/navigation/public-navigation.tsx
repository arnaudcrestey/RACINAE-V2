import Link from "next/link"

import { RacinaeWordmark } from "@/components/brand/racinae-wordmark"
import { Button } from "@/components/ui/button"

export function PublicNavigation() {
  return (
    <header className="safe-pt fixed inset-x-0 top-0 z-30">
      <div className="page-x mx-auto flex h-20 max-w-6xl items-center">
        <div className="flex h-[3.35rem] w-full items-center justify-between gap-4 rounded-full border border-border/65 bg-background/76 px-3.5 shadow-[0_16px_50px_rgb(34_34_34_/_7%)] backdrop-blur-2xl sm:px-5">
          <Link href="/" aria-label="RACINAE - accueil" className="rounded-full">
            <RacinaeWordmark className="text-[1.55rem]" />
          </Link>
          <Button asChild variant="outline" size="sm" className="h-9 px-4">
            <Link href="/login">Commencer</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
