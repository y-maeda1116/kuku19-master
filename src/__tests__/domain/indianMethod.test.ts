// src/__tests__/domain/indianMethod.test.ts
import { describe, it, expect } from 'vitest'
import { explainIndianMethod } from '../../domain/indianMethod'
import { MIN_FACTOR, MAX_FACTOR } from '../../domain/multiplication'

describe('indianMethod domain', () => {
  it('12×13 の計算手順が正しい', () => {
    const r = explainIndianMethod(12, 13)
    expect(r.result).toBe(156)
    expect(r.ones).toBe(6)
    expect(r.tens).toBe(5)
    expect(r.hundreds).toBe(1)
    expect(r.steps.length).toBeGreaterThan(0)
  })

  it('15×15 で繰り上がりが正しく処理される', () => {
    const r = explainIndianMethod(15, 15)
    expect(r.result).toBe(225)
    expect(r.ones).toBe(5)
    expect(r.carry1).toBe(2)
    expect(r.tens).toBe(2)
    expect(r.carry2).toBe(1)
    expect(r.hundreds).toBe(2)
  })

  it('11〜19の全81通りで result === a*b となる', () => {
    for (let a = MIN_FACTOR; a <= MAX_FACTOR; a++) {
      for (let b = MIN_FACTOR; b <= MAX_FACTOR; b++) {
        expect(explainIndianMethod(a, b).result).toBe(a * b)
      }
    }
  })
})
