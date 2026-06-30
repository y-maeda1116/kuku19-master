// src/__tests__/hooks/useScore.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScore } from '../../hooks/useScore'

describe('useScore', () => {
  beforeEach(() => window.localStorage.clear())

  it('初回は初期スコア', () => {
    const { result } = renderHook(() => useScore())
    expect(result.current.score.combo).toBe(0)
    expect(result.current.score.bestCombo).toBe(0)
    expect(result.current.score.recent).toEqual([])
  })

  it('record(true) でコンボが増え永続化される', () => {
    const { result } = renderHook(() => useScore())
    act(() => result.current.record(true))
    expect(result.current.score.combo).toBe(1)
    expect(result.current.score.bestCombo).toBe(1)
    const raw = window.localStorage.getItem('kuku19:score')
    expect(raw).toContain('"combo":1')
  })

  it('record(false) でコンボがリセットされる', () => {
    const { result } = renderHook(() => useScore())
    act(() => result.current.record(true))
    act(() => result.current.record(false))
    expect(result.current.score.combo).toBe(0)
  })

  it('永続化された bestCombo を再読込する', () => {
    window.localStorage.setItem(
      'kuku19:score',
      JSON.stringify({ recent: [true, false], combo: 0, bestCombo: 7 }),
    )
    const { result } = renderHook(() => useScore())
    expect(result.current.score.bestCombo).toBe(7)
  })
})
