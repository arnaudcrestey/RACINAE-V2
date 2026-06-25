import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      status: "placeholder",
      message:
        "La generation de Mon Histoire est preparee mais non finalisee dans cette ossature.",
    },
    { status: 202 }
  )
}
