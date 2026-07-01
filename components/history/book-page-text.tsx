import type { Mood } from "@/types/database"

type Memory = {
  id: string
  title: string
  content: string
  emotion: Mood | string | null
  memory_date: string | null
  ai_title: string | null
  ai_subtitle?: string | null
  ai_text: string | null
  layout?: string | null
  chapter?: string | null
  importance?: string | null
  created_at: string | null
}

type BookPageTextProps = {
  memory?: Memory
  pageNumber: number
  side: "left" | "right"
  label?: string | null
  formatMemoryDate: (date: string | null) => string
}

export function BookPageText({
  memory,
  pageNumber,
  side,
  label,
  formatMemoryDate,
}: BookPageTextProps) {
  return (
    <section
      className={`relative min-h-[460px] w-1/2 shrink-0 bg-[#fffdf8] px-8 py-9 sm:min-h-[640px] sm:flex-1 sm:px-16 sm:py-14 ${
        side === "left" ? "rounded-l-[24px]" : "rounded-r-[24px]"
      }`}
    >
      {memory ? (
        <article className="flex h-full flex-col">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#a07758]">
            {formatMemoryDate(memory.memory_date)}
          </p>

          <h2 className="mt-5 max-w-[25rem] font-heading text-[2.15rem] font-medium leading-[1.08] tracking-[-0.02em] text-[#2d2926] sm:text-[2.3rem]">
            {memory.ai_title || memory.title || "Souvenir sans titre"}
          </h2>

          {memory.ai_subtitle ? (
            <p className="mt-4 max-w-[23rem] text-[0.98rem] italic leading-7 text-[#7a746d]">
              {memory.ai_subtitle}
            </p>
          ) : label ? (
            <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-6 text-[#7a746d]">
              {label}
            </p>
          ) : null}

          <div className="mt-8 h-[2px] w-20 rounded-full bg-[#d5bf97]" />

          <p className="mt-7 max-w-[25rem] whitespace-pre-line text-[1rem] leading-[1.85rem] tracking-[-0.01em] text-[#56514c]">
            {memory.ai_text || memory.content}
          </p>
        </article>
      ) : (
        <div className="flex h-full min-h-[380px] items-center justify-center sm:min-h-[560px]">
          <p className="text-sm text-neutral-300">Page en attente</p>
        </div>
      )}

      <p
        className={`absolute bottom-8 text-[13px] tracking-[0.18em] text-[#b7b0a7] ${
          side === "left" ? "left-10 sm:left-16" : "right-10 sm:right-16"
        }`}
      >
        {pageNumber}
      </p>
    </section>
  )
}