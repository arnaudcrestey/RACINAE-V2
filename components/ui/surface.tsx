import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "muted" | "transparent"
}

const toneClassName = {
  default: "border-border/80 bg-card text-card-foreground shadow-[var(--shadow-subtle)]",
  muted: "border-border/70 bg-muted text-foreground",
  transparent: "border-transparent bg-transparent text-foreground",
}

export function Surface({
  className,
  tone = "default",
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn("rounded-xl border p-5 sm:p-6", toneClassName[tone], className)}
      {...props}
    />
  )
}
