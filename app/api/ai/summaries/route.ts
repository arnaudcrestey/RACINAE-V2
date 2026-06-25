import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      status: "placeholder",
      message:
        "L'architecture IA est reservee. Les bilans seront branches dans une phase dediee.",
    },
    { status: 202 }
  )
}
