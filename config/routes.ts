export const publicRoutes = {
  home: "/",
  login: "/login",
  register: "/register",
  privacy: "/privacy",
  legal: "/legal",
} as const

export const appRoutes = {
  home: "/app",
  journal: "/app/journal",
  journalNew: "/app/journal/new",
  capsules: "/app/capsules",
  capsulesNew: "/app/capsules/new",
  history: "/app/history",
  profile: "/app/profile",
  settings: "/app/settings",
} as const
