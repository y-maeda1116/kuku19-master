// src/__tests__/domain/scoring.test.ts
import { describe, it, expect } from 'vitest'
import { INITIAL_SCORE, MAX_RECENT, recordAnswer, accuracy } from '../../domain/scoring'

describe('scoring domain', () => {
  it('INITIAL_SCORE は空のスコア', () => {
    expect(INITIAL_SCORE).toEqual({ recent: [], combo: 0, bestCombo: 0 })
  })

  it('正解で combo が増え recent に追加される', () => {
    const s1 = recordAnswer(INITIAL_SCORE, true)
    expect(s1.combo).toBe(1)
    expect(s1.bestCombo).toBe(1)
    expect(s1.recent).toEqual([true])
  })

  it('不正解で combo がリセットされる（bestCombo は保持）', () => {
    const s1 = recordAnswer(INITIAL_SCORE, true)
    const s2 = recordAnswer(s1, true)
    const s3 = recordAnswer(s2, false)
    expect(s3.combo).toBe(0)
    expect(s3.bestCombo).toBe(2)
    expect(s3.recent).toEqual([true, true, false])
  })

  it('bestCombo は combo が超えた時だけ更新される', () => {
    const s = recordAnswer({ recent: [], combo: 0, bestCombo: 5 }, true)
    expect(s.bestCombo).toBe(5)
    const s2 = recordAnswer({ ...s, combo: 5 }, true)
    expect(s2.bestCombo).toBe(6)
  })

  it('recent は MAX_RECENT(10) 件で FIFO 切り捨て', () => {
    let s = INITIAL_SCORE
    for (let i = 0; i < 12; i++) s = recordAnswer(s, true)
    expect(s.recent.length).toBe(MAX_RECENT)
    expect(s.recent.every(Boolean)).toBe(true)
  })

  it('accuracy は直近の正答率(%)を返す', () => {
    let s = INITIAL_SCORE
    s = recordAnswer(s, true)
    s = recordAnswer(s, true)
    s = recordAnswer(s, false)
    expect(accuracy(s)).toBe(67) // 2/3 = 66.66 -> 67
  })

  it('accuracy は recent 空なら 0', () => {
    expect(accuracy(INITIAL_SCORE)).toBe(0)
  })

  it('recordAnswer は元の状態を変更しない（immutability）', () => {
    const before = INITIAL_SCORE
    const after = recordAnswer(before, true)
    expect(before.recent).toEqual([])
    expect(after.recent).not.toBe(before.recent)
  })
})
