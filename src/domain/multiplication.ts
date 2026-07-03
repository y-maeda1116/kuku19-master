// src/domain/multiplication.ts
export const MIN_FACTOR = 11
export const MAX_FACTOR = 19

export type QuizProblem = {
  readonly a: number
  readonly b: number
  readonly answer: number
}

export type Rng = () => number

const randomInt = (min: number, max: number, rng: Rng): number =>
  Math.floor(rng() * (max - min + 1)) + min

export const createProblem = (a: number, b: number): QuizProblem => ({
  a,
  b,
  answer: a * b,
})

export const generateProblem = (rng: Rng = Math.random): QuizProblem => {
  const a = randomInt(MIN_FACTOR, MAX_FACTOR, rng)
  const b = randomInt(MIN_FACTOR, MAX_FACTOR, rng)
  return createProblem(a, b)
}
