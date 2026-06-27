"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const devNavigationItems = [
  { label: "Dashboard", href: "/app" },
  { label: "Journal", href: "/app/journal" },
  { label: "Nouvelle entree", href: "/app/journal/new" },
  { label: "Capsules", href: "/app/capsules" },
  { label: "Nouvelle capsule", href: "/app/capsules/new" },
  { label: "Mon Histoire", href: "/app/history" },
  { label: "Profil", href: "/app/profile" },
  { label: "Parametres", href: "/app/settings" },
] as const

export function DevAppNavigation() {
  const pathname = usePathname()

  return (
    // Navigation temporaire pour la phase de developpement et de conception.
    <nav
      aria-label="Navigation temporaire de developpement"
      className="page-x border-b border-border/60 bg-background/70 py-2 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[var(--app-shell-max)] gap-2 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {devNavigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/app" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-full border border-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                isActive && "border-border bg-card text-primary"
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
