import Link from "next/link"

import { publicNavigation } from "@/config/navigation"

export function PublicFooter() {
  return (
    <footer className="page-x mx-auto flex w-full max-w-6xl flex-col gap-4 pb-8 pt-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>Un lieu calme pour ce que vous ne voulez pas perdre.</p>
      <nav aria-label="Liens secondaires" className="flex flex-wrap gap-x-5 gap-y-2">
        {publicNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-colors duration-300 hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}
