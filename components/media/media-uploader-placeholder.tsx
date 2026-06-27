import { ImagePlus, Mic, Video } from "lucide-react"

export function MediaUploaderPlaceholder() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/45 p-4">
      <p className="text-sm font-medium text-foreground">
        Photos, sons et vidéos
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        Ajoutez des médias pour enrichir cette page du livre.
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1">
          <ImagePlus className="size-4" aria-hidden="true" />
          Photo
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1">
          <Mic className="size-4" aria-hidden="true" />
          Audio
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1">
          <Video className="size-4" aria-hidden="true" />
          Vidéo
        </span>
      </div>
    </div>
  )
}