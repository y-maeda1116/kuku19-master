// src/__tests__/hooks/useQuiz.test.ts
import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useQuiz } from '../../hooks/useQuiz'

describe('useQuiz', () => {
  it('初期状態は answering で問題を持つ', () => {
    const { result } = renderHook(() => useQuiz())
    expect(result.current.phase).toBe('answering')
    expect(result.current.userAnswer).toBe('')
    expect(result.current.isCorrect).toBeNull()
    expect(result.current.problem.answer).toBe(result.current.problem.a * result.current.problem.b)
  })

  it('inputDigit で入力が蓄積される', () => {
    const { result } = renderHook(() => useQuiz())
    act(() => result.current.inputDigit('1'))
    act(() => result.current.inputDigit('2'))
    expect(result.current.userAnswer).toBe('12')
  })

  it('clearAnswer で入力が消える', () => {
    const { result } = renderHook(() => useQuiz())
    act(() => result.current.inputDigit('1'))
    act(() => result.current.clearAnswer())
    expect(result.current.userAnswer).toBe('')
  })

  it('submit で判定され revealed に遷移。正解時 isCorrect=true', () => {
    const { result } = renderHook(() => useQuiz())
    const ans = String(result.current.problem.answer)
    for (const d of ans) act(() => result.current.inputDigit(d))
    act(() => result.current.submit())
    expect(result.current.phase).toBe('revealed')
    expect(result.current.isCorrect).toBe(true)
  })

  it('submit で不正解時 isCorrect=false', () => {
    const { result } = renderHook(() => useQuiz())
    const wrong = String(result.current.problem.answer + 1)
    for (const d of wrong) act(() => result.current.inputDigit(d))
    act(() => result.current.submit())
    expect(result.current.isCorrect).toBe(false)
  })

  it('onJudged コールバックが判定結果で呼ばれる', () => {
    const onJudged = vi.fn()
    const { result } = renderHook(() => useQuiz(onJudged))
    const ans = String(result.current.problem.answer)
    for (const d of ans) act(() => result.current.inputDigit(d))
    act(() => result.current.submit())
    expect(onJudged).toHaveBeenCalledWith(true)
  })

  it('空入力では送信できない', () => {
    const onJudged = vi.fn()
    const { result } = renderHook(() => useQuiz(onJudged))
    act(() => result.current.submit())
    expect(result.current.phase).toBe('answering')
    expect(onJudged).not.toHaveBeenCalled()
  })

  it('next で新問題に切り替わり answering に戻る', () => {
    const { result } = renderHook(() => useQuiz())
    // 正答して revealed にしてから next
    const ans = String(result.current.problem.answer)
    for (const d of ans) act(() => result.current.inputDigit(d))
    act(() => result.current.submit())
    expect(result.current.phase).toBe('revealed')
    act(() => result.current.next())
    expect(result.current.phase).toBe('answering')
    expect(result.current.userAnswer).toBe('')
    expect(result.current.isCorrect).toBeNull()
  })
})
