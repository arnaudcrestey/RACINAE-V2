import type { MetadataRoute } from "next"

import { appConfig } from "@/config/app"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appConfig.fullName,
    short_name: appConfig.name,
    description: appConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: appConfig.backgroundColor,
    theme_color: appConfig.themeColor,
    orientation: "portrait-primary",
    categories: ["lifestyle", "books"],
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  }
}
