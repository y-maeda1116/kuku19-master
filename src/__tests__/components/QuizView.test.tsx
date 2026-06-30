// src/__tests__/components/QuizView.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuizView } from '../../components/quiz/QuizView'

describe('QuizView', () => {
  beforeEach(() => window.localStorage.clear())

  it('問題が表示され、正解入力で「正解!」が表示される', async () => {
    const onJudged = vi.fn()
    render(<QuizView onJudged={onJudged} />)
    // 問題文 a × b = ? から a, b を抽出
    const problemText = screen.getByText(/×/).textContent as string
    const [a, b] = problemText.match(/\d+/g)!.map(Number)
    const answer = a * b

    const input = screen.getByLabelText('答えの入力欄')
    await userEvent.type(input, String(answer))
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(await screen.findByText('正解! 🎉')).toBeInTheDocument()
    expect(onJudged).toHaveBeenCalledWith(true)
  })

  it('不正解時はインド式解説が表示される', async () => {
    render(<QuizView onJudged={vi.fn()} />)
    const input = screen.getByLabelText('答えの入力欄')
    await userEvent.type(input, '9999'.slice(0, 3)) // 3桁制限で999
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(await screen.findByText(/不正解/)).toBeInTheDocument()
    expect(screen.getByText('インド式（縦・交差法）')).toBeInTheDocument()
  })

  it('「次の問題へ」で新しい問題に切り替わる', async () => {
    render(<QuizView onJudged={vi.fn()} />)
    const input = screen.getByLabelText('答えの入力欄')
    await userEvent.type(input, '999')
    fireEvent.keyDown(input, { key: 'Enter' })
    const nextBtn = await screen.findByText('次の問題へ')
    fireEvent.click(nextBtn)
    expect(screen.getByLabelText('答えの入力欄')).toHaveValue('')
  })
})
