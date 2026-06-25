import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PageShellProps = {
  children: ReactNode
  className?: string
  size?: "default" | "narrow" | "wide"
}

const sizeClassName = {
  default: "max-w-5xl",
  narrow: "max-w-2xl",
  wide: "max-w-6xl",
}

export function PageShell({
  children,
  className,
  size = "default",
}: PageShellProps) {
  return (
    <main
      className={cn(
        "page-x mx-auto w-full py-6 sm:py-8 md:py-12",
        sizeClassName[size],
        className
      )}
    >
      {children}
    </main>
  )
}
