import type { ReactNode } from "react"

import { AppTopBar } from "@/components/navigation/app-top-bar"
import { BottomNavigation } from "@/components/navigation/bottom-navigation"

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AppTopBar />
      <div className="mx-auto flex min-h-dvh w-full max-w-[var(--app-shell-max)] flex-col pb-24 pt-[3.75rem] md:pb-8">
        {children}
      </div>
      <BottomNavigation />
    </div>
  )
}
