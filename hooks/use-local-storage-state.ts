"use client"

import { useCallback, useSyncExternalStore, type SetStateAction } from "react"

function getStorageValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue
  }

  const rawValue = window.localStorage.getItem(key)
  return rawValue ? (JSON.parse(rawValue) as T) : initialValue
}

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      function handleStorage(event: StorageEvent) {
        if (event.key === key) {
          onStoreChange()
        }
      }

      window.addEventListener("storage", handleStorage)
      window.addEventListener(`racinae-storage:${key}`, onStoreChange)

      return () => {
        window.removeEventListener("storage", handleStorage)
        window.removeEventListener(`racinae-storage:${key}`, onStoreChange)
      }
    },
    [key]
  )

  const getSnapshot = useCallback(
    () => JSON.stringify(getStorageValue(key, initialValue)),
    [initialValue, key]
  )
  const getServerSnapshot = useCallback(
    () => JSON.stringify(initialValue),
    [initialValue]
  )

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const value = JSON.parse(snapshot) as T

  const setValue = useCallback(
    (nextValue: SetStateAction<T>) => {
      const currentValue = getStorageValue(key, initialValue)
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (current: T) => T)(currentValue)
          : nextValue

      window.localStorage.setItem(key, JSON.stringify(resolvedValue))
      window.dispatchEvent(new Event(`racinae-storage:${key}`))
    },
    [initialValue, key]
  )

  return [value, setValue, true] as const
}
