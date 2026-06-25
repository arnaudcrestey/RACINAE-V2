import { BookOpen, Clock3, Home, Leaf, Settings, UserRound } from "lucide-react"

import { appRoutes, publicRoutes } from "@/config/routes"

export const publicNavigation = [
  { label: "Accueil", href: publicRoutes.home },
  { label: "Confidentialite", href: publicRoutes.privacy },
  { label: "Mentions legales", href: publicRoutes.legal },
] as const

export const appNavigation = [
  { label: "Accueil", href: appRoutes.home, icon: Home },
  { label: "Journal", href: appRoutes.journal, icon: BookOpen },
  { label: "Capsules", href: appRoutes.capsules, icon: Clock3 },
  { label: "Mon Histoire", href: appRoutes.history, icon: Leaf },
] as const

export const utilityNavigation = [
  { label: "Profil", href: appRoutes.profile, icon: UserRound },
  { label: "Parametres", href: appRoutes.settings, icon: Settings },
] as const
