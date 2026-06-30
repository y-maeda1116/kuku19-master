// src/hooks/useScore.ts
import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { INITIAL_SCORE, recordAnswer, type ScoreState } from '../domain/scoring'

const STORAGE_KEY = 'kuku19:score'

export const useScore = () => {
  const [score, setScore] = useLocalStorage<ScoreState>(STORAGE_KEY, INITIAL_SCORE)

  const record = useCallback(
    (isCorrect: boolean) => {
      setScore((prev) => recordAnswer(prev, isCorrect))
    },
    [setScore],
  )

  return { score, record } as const
}
