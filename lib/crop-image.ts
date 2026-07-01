export type PixelCrop = {
  x: number
  y: number
  width: number
  height: number
}

export async function getCroppedImage(
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<Blob> {
  const image = await createImage(imageSrc)

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("Impossible de préparer le recadrage.")
  }

  canvas.width = Math.round(pixelCrop.width)
  canvas.height = Math.round(pixelCrop.height)

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  ctx.drawImage(
    image,
    Math.round(pixelCrop.x),
    Math.round(pixelCrop.y),
    Math.round(pixelCrop.width),
    Math.round(pixelCrop.height),
    0,
    0,
    canvas.width,
    canvas.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Impossible de créer l’image recadrée."))
          return
        }

        resolve(blob)
      },
      "image/jpeg",
      0.94
    )
  })
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Impossible de charger l’image."))

    image.src = url
  })
}