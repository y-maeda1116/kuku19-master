// src/hooks/useQuiz.ts
import { useCallback, useState } from 'react'
import { generateProblem, type QuizProblem } from '../domain/multiplication'

export type QuizPhase = 'answering' | 'revealed'

const MAX_DIGITS = 3

export const useQuiz = (onJudged?: (isCorrect: boolean) => void) => {
  const [problem, setProblem] = useState<QuizProblem>(() => generateProblem())
  const [phase, setPhase] = useState<QuizPhase>('answering')
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const inputDigit = useCallback(
    (digit: string) => {
      if (phase !== 'answering') return
      setUserAnswer((prev) => {
        if (prev.length >= MAX_DIGITS) return prev
        return prev === '0' ? digit : prev + digit
      })
    },
    [phase],
  )

  const clearAnswer = useCallback(() => {
    if (phase !== 'answering') return
    setUserAnswer('')
  }, [phase])

  const submit = useCallback(() => {
    if (phase !== 'answering') return
    if (userAnswer === '') return
    const correct = Number(userAnswer) === problem.answer
    setIsCorrect(correct)
    setPhase('revealed')
    onJudged?.(correct)
  }, [phase, userAnswer, problem, onJudged])

  const next = useCallback(() => {
    setProblem(generateProblem())
    setUserAnswer('')
    setIsCorrect(null)
    setPhase('answering')
  }, [])

  return {
    problem,
    phase,
    userAnswer,
    isCorrect,
    inputDigit,
    clearAnswer,
    submit,
    next,
  } as const
}
