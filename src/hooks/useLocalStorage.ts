// src/hooks/useLocalStorage.ts
import { useCallback, useEffect, useState } from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): readonly [T, (value: T | ((prev: T) => T)) => void] => {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored))
    } catch {
      // 書き込み失敗（クォータ/プライベートモード）は無視
    }
  }, [key, stored])

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStored((prev) => (value instanceof Function ? value(prev) : value))
  }, [])

  return [stored, setValue] as const
}
