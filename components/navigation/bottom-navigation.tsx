"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { appNavigation } from "@/config/navigation"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navigation principale"
      className="safe-pb fixed inset-x-0 bottom-0 z-40 bg-transparent px-3 pb-3 md:hidden"
    >
      <div className="mx-auto grid h-[4.35rem] max-w-md grid-cols-4 rounded-[1.35rem] border border-border/75 bg-card/94 px-2 shadow-[0_-18px_60px_rgb(34_34_34_/_10%)] backdrop-blur-2xl">
        {appNavigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/app" && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-[var(--tap-target)] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[0.7rem] font-medium text-muted-foreground transition-[background,color,transform] duration-300 ease-[var(--ease-racinae)]",
                "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                isActive && "bg-muted/80 text-primary"
              )}
            >
              <Icon aria-hidden="true" className="size-5" />
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
