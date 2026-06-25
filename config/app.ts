export const appConfig = {
  name: "RACINAE",
  fullName: "RACINAE V2",
  description:
    "Un espace personnel, calme et intemporel pour construire votre histoire, un jour a la fois.",
  locale: "fr_FR",
  lang: "fr",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  themeColor: "#faf8f4",
  backgroundColor: "#faf8f4",
} as const
