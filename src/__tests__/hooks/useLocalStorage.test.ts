// src/__tests__/hooks/useLocalStorage.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => window.localStorage.clear())

  it('初期値は保存がない場合に使われる', () => {
    const { result } = renderHook(() => useLocalStorage('k', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('保存済みの値を読み込む', () => {
    window.localStorage.setItem('k', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('k', 'default'))
    expect(result.current[0]).toBe('stored')
  })

  it('値を設定するとLocalStorageに保存される', () => {
    const { result } = renderHook(() => useLocalStorage('k', 0))
    act(() => result.current[1](5))
    expect(result.current[0]).toBe(5)
    expect(window.localStorage.getItem('k')).toBe('5')
  })

  it('関数形式の更新が使える', () => {
    const { result } = renderHook(() => useLocalStorage<number>('k', 1))
    act(() => result.current[1]((p) => p + 10))
    expect(result.current[0]).toBe(11)
  })

  it('破損JSON時は初期値へフォールバック', () => {
    window.localStorage.setItem('k', '{bad json')
    const { result } = renderHook(() => useLocalStorage('k', 'fallback'))
    expect(result.current[0]).toBe('fallback')
  })
})
