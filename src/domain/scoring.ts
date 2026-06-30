// src/domain/scoring.ts
export const MAX_RECENT = 10

export type ScoreState = {
  readonly recent: ReadonlyArray<boolean>
  readonly combo: number
  readonly bestCombo: number
}

export const INITIAL_SCORE: ScoreState = {
  recent: [],
  combo: 0,
  bestCombo: 0,
}

export const recordAnswer = (state: ScoreState, isCorrect: boolean): ScoreState => {
  const recent = [...state.recent, isCorrect].slice(-MAX_RECENT)
  const combo = isCorrect ? state.combo + 1 : 0
  const bestCombo = Math.max(state.bestCombo, combo)
  return { recent, combo, bestCombo }
}

export const accuracy = (state: ScoreState): number => {
  if (state.recent.length === 0) return 0
  const correct = state.recent.filter(Boolean).length
  return Math.round((correct / state.recent.length) * 100)
}
