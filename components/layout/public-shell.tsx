import type { ReactNode } from "react"

import { PublicFooter } from "@/components/navigation/public-footer"
import { PublicNavigation } from "@/components/navigation/public-navigation"

type PublicShellProps = {
  children: ReactNode
}

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-dvh bg-background pt-20 text-foreground">
      <PublicNavigation />
      {children}
      <PublicFooter />
    </div>
  )
}
