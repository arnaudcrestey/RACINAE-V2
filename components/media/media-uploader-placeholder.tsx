"use client"

import { useCallback, useRef, useState } from "react"
import Cropper from "react-easy-crop"
import type { Area } from "react-easy-crop"
import { ImagePlus, Loader2, Mic, Video, X } from "lucide-react"

import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { getCroppedImage } from "@/lib/crop-image"

type MediaUploaderPlaceholderProps = {
  onPhotoUploaded?: (url: string) => void
}

export function MediaUploaderPlaceholder({
  onPhotoUploaded,
}: MediaUploaderPlaceholderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [isUploading, setIsUploading] = useState(false)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [sourceImage, setSourceImage] = useState<string | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectRatio, setAspectRatio] = useState(3 / 4)
  const [formatLabel, setFormatLabel] = useState("portrait")

  const [error, setError] = useState<string | null>(null)

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)

    const imageUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      const isLandscape = image.width > image.height
      const isPortrait = image.height > image.width

      if (isLandscape) {
        setAspectRatio(4 / 3)
        setFormatLabel("paysage")
      } else if (isPortrait) {
        setAspectRatio(3 / 4)
        setFormatLabel("portrait")
      } else {
        setAspectRatio(1)
        setFormatLabel("carré")
      }

      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCroppedAreaPixels(null)
      setSourceImage(imageUrl)
    }

    image.onerror = () => {
      setError("Impossible de lire cette image.")
      URL.revokeObjectURL(imageUrl)
    }

    image.src = imageUrl

    event.target.value = ""
  }

  function closeCropper() {
    if (sourceImage) {
      URL.revokeObjectURL(sourceImage)
    }

    setSourceImage(null)
    setCroppedAreaPixels(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }

  const handleCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  async function uploadCroppedPhoto() {
    if (!sourceImage || !croppedAreaPixels) return

    setIsUploading(true)
    setError(null)

    try {
      const croppedBlob = await getCroppedImage(sourceImage, croppedAreaPixels)

      const supabase = createSupabaseBrowserClient()
      const fileName = `${crypto.randomUUID()}.jpg`
      const filePath = `photos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("memories")
        .upload(filePath, croppedBlob, {
          contentType: "image/jpeg",
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("memories").getPublicUrl(filePath)

      setPhotoUrl(data.publicUrl)
      onPhotoUploaded?.(data.publicUrl)
      closeCropper()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Impossible d’ajouter la photo."
      )
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-4">
      <p className="text-sm font-medium text-foreground">
        Photos, sons et vidéos
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        Ajoutez une photo pour enrichir cette page du livre.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoChange}
      />

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-sm transition hover:bg-background disabled:opacity-60"
        >
          {isUploading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ImagePlus className="size-4" aria-hidden="true" />
          )}
          {isUploading ? "Ajout..." : photoUrl ? "Changer la photo" : "Photo"}
        </button>

        <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1.5 opacity-50">
          <Mic className="size-4" aria-hidden="true" />
          Audio
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1.5 opacity-50">
          <Video className="size-4" aria-hidden="true" />
          Vidéo
        </span>
      </div>

      {photoUrl ? (
        <div className="mt-4 overflow-hidden rounded-2xl border bg-card shadow-sm">
          <img
            src={photoUrl}
            alt="Photo ajoutée au souvenir"
            className="h-44 w-full object-cover sm:h-52"
          />
        </div>
      ) : null}

      {sourceImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-3 py-4 backdrop-blur-sm sm:px-6">
          <div className="flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-background shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
              <div>
                <p className="text-sm font-semibold">Ajuster la photo</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Format détecté : {formatLabel}. Déplacez ou zoomez l’image si
                  nécessaire.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCropper}
                className="rounded-full border bg-background p-2 transition hover:bg-muted"
                aria-label="Fermer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="relative h-[52dvh] min-h-[320px] bg-black sm:h-[460px]">
              <Cropper
                image={sourceImage}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                objectFit="contain"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>

            <div className="space-y-4 px-5 py-5">
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">
                    Zoom
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(zoom * 100)} %
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  className="mt-3 w-full"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeCropper}
                  className="rounded-full border px-5 py-2.5 text-sm transition hover:bg-muted"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={uploadCroppedPhoto}
                  disabled={isUploading}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition disabled:opacity-60"
                >
                  {isUploading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  {isUploading ? "Préparation..." : "Utiliser cette photo"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </div>
  )
}