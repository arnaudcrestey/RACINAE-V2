"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { defaultCapsules, type DemoCapsule } from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

type Memory = {
  id: string
  title: string | null
  content: string
  emotion: string | null
  memory_date: string | null
  ai_title: string | null
  ai_text: string | null
  created_at: string | null
}

const actions = [
  {
    title: "Écrire une page",
    text: "Ajouter un souvenir, une phrase, une étape ou une émotion.",
    href: "/app/journal/new",
    cta: "Ajouter un souvenir",
    primary: true,
  },
  {
    title: "Les Courriers du temps",
    text: "Préparer une lettre à ouvrir dans plusieurs années.",
    href: "/app/capsules/new",
    cta: "Écrire un courrier",
  },
  {
    title: "Le livre",
    text: "Voir les chapitres qui prennent forme au fil du temps.",
    href: "/app/history",
    cta: "Ouvrir",
  },
]

function getMemoryDate(memory: Memory) {
  return memory.memory_date || memory.created_at || null
}

function getCurrentMonthCalendar(documentedDays: number[]) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const monthName = today.toLocaleDateString("fr-FR", { month: "long" })
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1

  return {
    monthName,
    todayDate: today.getDate(),
    days: [
      ...Array.from({ length: offset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ],
    documentedDays,
  }
}

function getPeriodLabel(memories: Memory[]) {
  const dates = memories
    .map(getMemoryDate)
    .filter(Boolean)
    .map((value) => new Date(value as string))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime())

  if (!dates.length) return "Aucune période"

  const first = dates[0]
  const last = dates[dates.length - 1]

  const months =
    (last.getFullYear() - first.getFullYear()) * 12 +
    (last.getMonth() - first.getMonth()) +
    1

  if (months <= 1) return "1 mois raconté"
  if (months < 12) return `${months} mois racontés`

  const years = Math.floor(months / 12)
  return years === 1 ? "1 année racontée" : `${years} années racontées`
}

export default function DashboardPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [capsules] = useLocalStorageState<DemoCapsule[]>(
    "racinae-capsules",
    defaultCapsules
  )

  useEffect(() => {
    async function loadMemories() {
      setIsLoading(true)

      try {
        const response = await fetch("/api/memories", {
          method: "GET",
        })

        const result = await response.json()

        if (response.ok) {
          setMemories(result.memories ?? [])
        } else {
          setMemories([])
        }
      } catch {
        setMemories([])
      } finally {
        setIsLoading(false)
      }
    }

    loadMemories()
  }, [])

  const today = new Date()

  const currentMonthMemories = useMemo(() => {
    return memories.filter((memory) => {
      const value = getMemoryDate(memory)
      if (!value) return false

      const date = new Date(value)

      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth()
      )
    })
  }, [memories, today])

  const documentedDays = useMemo(() => {
    return Array.from(
      new Set(
        currentMonthMemories
          .map((memory) => {
            const value = getMemoryDate(memory)
            if (!value) return null

            const date = new Date(value)
            return Number.isNaN(date.getTime()) ? null : date.getDate()
          })
          .filter((day): day is number => Boolean(day))
      )
    )
  }, [currentMonthMemories])

  const latestMemory = useMemo(() => {
    return [...memories].sort((a, b) => {
      const dateA = new Date(getMemoryDate(a) ?? 0).getTime()
      const dateB = new Date(getMemoryDate(b) ?? 0).getTime()

      return dateB - dateA
    })[0]
  }, [memories])

  const todayMemoriesCount = useMemo(() => {
    return memories.filter((memory) => {
      const value = getMemoryDate(memory)
      if (!value) return false

      const date = new Date(value)

      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      )
    }).length
  }, [memories, today])

  const pagesCount = memories.length
  const bookProgress = Math.min(100, Math.max(8, pagesCount * 3))
  const calendar = getCurrentMonthCalendar(documentedDays)

  const stats = [
    {
      label: "Pages en cours",
      value: String(pagesCount),
      text:
        pagesCount > 0
          ? "Des souvenirs déjà prêts à rejoindre le livre."
          : "Aucune page pour le moment.",
    },
    {
      label: "Courriers du temps",
      value: String(capsules.length),
      text:
        capsules.length > 0
          ? "Une lettre écrite pour être découverte plus tard."
          : "Aucun courrier scellé pour le moment.",
    },
    {
      label: "Souvenir du jour",
      value: String(todayMemoriesCount),
      text:
        todayMemoriesCount > 0
          ? "Un instant simple peut devenir une page précieuse."
          : "Aucun souvenir ajouté aujourd’hui.",
    },
  ]

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-4 py-5 text-[#2E2923] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col py-2 sm:py-6 lg:min-h-[calc(100dvh-2.5rem)] lg:justify-center">
        <div className="mb-6 sm:mb-8">
          <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-[#9B7658]">
            Le livre de l’enfance
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-[2.35rem] leading-[0.95] tracking-[-0.04em] text-[#2A241F] sm:text-5xl lg:text-6xl">
                Chaque souvenir compte
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#6E6860] sm:text-base sm:leading-7">
                Écrivez quelques lignes, gardez les petits instants et préparez
                peu à peu un livre unique à transmettre.
              </p>
            </div>

            <Link
              href="/app/journal/new"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#8B684C] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(82,58,40,0.18)] transition hover:bg-[#76583F]"
            >
              Ajouter un souvenir
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_70px_rgba(69,53,36,0.1)] backdrop-blur sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(143,165,143,0.18),transparent_14rem)]" />

            <div className="relative z-10">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-[#9B7658]">
                Livre en création
              </p>

              <div className="mt-3 flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-serif text-3xl tracking-[-0.03em]">
                    {pagesCount > 0 ? "Premiers chapitres" : "Livre à commencer"}
                  </h2>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#706A62]">
                    {pagesCount > 0
                      ? "Chaque souvenir ajouté devient une matière précieuse pour composer, un jour, le livre de son enfance."
                      : "Ajoutez un premier souvenir pour commencer à construire le livre de son enfance."}
                  </p>
                </div>

                <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#F2E9DD] sm:flex">
                  <div className="relative h-16 w-16">
                    <div className="absolute left-1/2 top-7 h-9 w-1 -translate-x-1/2 rounded-full bg-[#8B684C]" />
                    <div className="absolute left-1/2 top-7 h-7 w-1 origin-top -rotate-45 rounded-full bg-[#8B684C]" />
                    <div className="absolute left-1/2 top-7 h-7 w-1 origin-top rotate-45 rounded-full bg-[#8B684C]" />
                    <div className="absolute left-2 top-2 h-5 w-8 rotate-[24deg] rounded-full rounded-br-none bg-[#8FA58F]" />
                    <div className="absolute right-2 top-1 h-5 w-8 -rotate-[24deg] rounded-full rounded-bl-none bg-[#8FA58F]" />
                    <div className="absolute bottom-1 left-1/2 h-3 w-10 -translate-x-1/2 rounded-[50%] border-t border-[#BFA88F]" />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between text-xs text-[#706A62]">
                  <span>Avancement du livre</span>
                  <span>{pagesCount} pages</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#EFE6DA]">
                  <div
                    className="h-full rounded-full bg-[#8FA58F]"
                    style={{ width: `${bookProgress}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E9DED0] bg-[#FBF8F3]/80 p-4">
                  <p className="text-xs text-[#8B684C]">Dernière page</p>
                  <p className="mt-2 font-serif text-xl">
                    {latestMemory
                      ? latestMemory.ai_title ||
                        latestMemory.title ||
                        "Souvenir sans titre"
                      : isLoading
                        ? "Chargement..."
                        : "Aucune page ajoutée."}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E9DED0] bg-[#FBF8F3]/80 p-4">
                  <p className="text-xs text-[#8B684C]">Période racontée</p>
                  <p className="mt-2 font-serif text-xl">
                    {getPeriodLabel(memories)}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_24px_70px_rgba(69,53,36,0.09)] backdrop-blur sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl tracking-[-0.03em]">
                Souvenirs du mois
              </h2>

              <span className="text-xs capitalize text-[#867D73]">
                {calendar.monthName}
              </span>
            </div>

            <div className="grid max-w-[22rem] grid-cols-7 gap-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#9B9288] sm:gap-3">
              {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
                <span key={index}>{day}</span>
              ))}
            </div>

            <div className="mt-3 grid max-w-[22rem] grid-cols-7 gap-2 sm:gap-3">
              {calendar.days.map((day, index) =>
                day === null ? (
                  <span key={index} />
                ) : (
                  <span
                    key={index}
                    className={[
                      "flex aspect-square items-center justify-center rounded-full border text-xs transition",
                      calendar.documentedDays.includes(day)
                        ? "border-[#A7B9A4] bg-[#A7B9A4] text-white"
                        : "border-[#E7DED2] bg-[#F7F2EC] text-[#8A8178]",
                      day === calendar.todayDate
                        ? "ring-2 ring-[#8B684C]/35 ring-offset-2 ring-offset-white"
                        : "",
                    ].join(" ")}
                  >
                    {day}
                  </span>
                )
              )}
            </div>

            <p className="mt-5 text-xs leading-5 text-[#706A62] sm:text-sm">
              Chaque journée documentée pourra devenir une page du livre.
            </p>
          </article>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[1.5rem] border border-white/80 bg-white/75 p-5 shadow-[0_18px_50px_rgba(69,53,36,0.07)]"
            >
              <p className="text-xs text-[#7B746C]">{stat.label}</p>
              <p className="mt-4 font-serif text-2xl">{stat.value}</p>
              <p className="mt-3 text-xs leading-5 text-[#706A62]">
                {stat.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {actions.map((action) => (
            <article
              key={action.title}
              className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-[0_18px_50px_rgba(69,53,36,0.07)]"
            >
              <h3 className="font-serif text-2xl tracking-[-0.03em]">
                {action.title}
              </h3>

              <p className="mt-2 min-h-10 text-xs leading-5 text-[#706A62]">
                {action.text}
              </p>

              <Link
                href={action.href}
                className={[
                  "mt-4 inline-flex rounded-full px-4 py-2 text-xs font-semibold transition",
                  action.primary
                    ? "bg-[#8B684C] text-white hover:bg-[#76583F]"
                    : "border border-[#E5DCD0] bg-white text-[#2E2923] hover:bg-[#F7F2EC]",
                ].join(" ")}
              >
                {action.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}