import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "brand" | "life"
}

const toneClassName = {
  neutral: "bg-muted text-muted-foreground",
  brand: "bg-primary/10 text-primary",
  life: "bg-life/15 text-foreground",
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full px-3 text-xs font-medium",
        toneClassName[tone],
        className
      )}
      {...props}
    />
  )
}
