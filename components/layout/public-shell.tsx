import type { ReactNode } from "react"

type PublicShellProps = {
  children: ReactNode
}

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      {children}
    </div>
  )
}