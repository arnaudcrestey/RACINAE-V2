import Link from "next/link"
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
  media_url?: string | null
  media_type?: string | null
  chapter?: string | null
  importance?: string | null
  created_at: string | null
}

type BookPagePhotoRightProps = {
  memory?: Memory
  pageNumber: number
  side: "left" | "right"
  formatMemoryDate: (date: string | null) => string
}

export function BookPagePhotoRight({
  memory,
  pageNumber,
  side,
  formatMemoryDate,
}: BookPagePhotoRightProps) {
  return (
    <section
      className={`relative min-h-[460px] w-1/2 shrink-0 bg-[#fffdf8] px-7 py-8 sm:min-h-[640px] sm:flex-1 sm:px-12 sm:py-12 ${
        side === "left" ? "rounded-l-[24px]" : "rounded-r-[24px]"
      }`}
    >
      {memory ? (
        <article className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#a07758]">
    {formatMemoryDate(memory.memory_date)}
  </p>

  <Link
  href={`/app/journal/${memory.id}/edit`}
  aria-label="Modifier ce souvenir"
  className="flex h-8 w-8 items-center justify-center rounded-full text-[#b49779] opacity-70 transition hover:bg-[#f8f2ea] hover:text-[#8b684c] hover:opacity-100"
>
  ✎
</Link>
</div>

          <h2 className="mt-4 max-w-[18rem] font-heading text-[1.62rem] leading-[1.08] text-[#2d2926] sm:text-[1.95rem]">
            {memory.ai_title || memory.title}
          </h2>

          {memory.ai_subtitle ? (
            <p className="mt-3 max-w-[20rem] text-[0.78rem] italic leading-6 text-[#7a746d]">
              {memory.ai_subtitle}
            </p>
          ) : null}

          <div className="mt-5 overflow-hidden rounded-[14px] border border-[#efe3d4] bg-white p-[3px] shadow-[0_6px_14px_rgba(80,58,32,.04)]">
            <div className="h-[190px] overflow-hidden rounded-[12px] sm:h-[235px]">
              {memory.media_url ? (
                <img
                  src={memory.media_url}
                  alt={memory.ai_title || memory.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center border border-dashed border-[#d4b27a] bg-[#f8f1e5] text-[0.58rem] uppercase tracking-[0.34em] text-[#a07758]">
                  Photo
                </div>
              )}
            </div>
          </div>

          <p className="mt-5 max-w-[22rem] whitespace-pre-line text-justify text-[0.9rem] leading-8 text-[#56514c]">
            {memory.ai_text || memory.content}
          </p>
        </article>
      ) : null}

      <p
        className={`absolute bottom-7 text-[12px] tracking-[0.18em] text-[#b7b0a7] ${
          side === "left" ? "left-8 sm:left-12" : "right-8 sm:right-12"
        }`}
      >
        {pageNumber}
      </p>
    </section>
  )
}