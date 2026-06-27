"use client"

import { useState } from "react"

export function HistoryTimeline() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-8">
      <button
        type="button"
        onClick={() => setCount((value) => value + 1)}
        className="rounded-full bg-black px-6 py-4 text-white"
      >
        TEST MOBILE : {count}
      </button>
    </div>
  )
}