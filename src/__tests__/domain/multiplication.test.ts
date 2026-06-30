// src/__tests__/domain/multiplication.test.ts
import { describe, it, expect } from 'vitest'
import { MIN_FACTOR, MAX_FACTOR, generateProblem, createProblem } from '../../domain/multiplication'

describe('multiplication domain', () => {
  it('範囲定数は11〜19', () => {
    expect(MIN_FACTOR).toBe(11)
    expect(MAX_FACTOR).toBe(19)
  })

  it('createProblem は a*b の答えを持つ', () => {
    expect(createProblem(12, 13)).toEqual({ a: 12, b: 13, answer: 156 })
  })

  it('generateProblem は範囲内の因子を生成する', () => {
    let seed = 0
    const rng = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648
      return seed / 2147483648
    }
    for (let i = 0; i < 50; i++) {
      const p = generateProblem(rng)
      expect(p.a).toBeGreaterThanOrEqual(MIN_FACTOR)
      expect(p.a).toBeLessThanOrEqual(MAX_FACTOR)
      expect(p.b).toBeGreaterThanOrEqual(MIN_FACTOR)
      expect(p.b).toBeLessThanOrEqual(MAX_FACTOR)
      expect(p.answer).toBe(p.a * p.b)
    }
  })

  it('generateProblem は乱数非依存なら固定値を返す（デフォルトrng以外）', () => {
    const fixed = () => 0.5
    const p = generateProblem(fixed)
    // 0.5 -> floor(0.5*9)+11 = 4+11 = 15
    expect(p.a).toBe(15)
    expect(p.b).toBe(15)
  })
})
