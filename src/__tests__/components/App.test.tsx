// src/__tests__/components/App.test.tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('App (統合)', () => {
  beforeEach(() => window.localStorage.clear())

  it('初期描画でホーム画面（TopMenu + Header）が表示される', () => {
    render(<App />)

    // Header: タイトル
    expect(screen.getByText('九九19')).toBeInTheDocument()

    // Header: スコア表示（combo / bestCombo / accuracy）
    expect(screen.getByLabelText('現在のコンボ')).toHaveTextContent('🔥 0')
    expect(screen.getByLabelText('最高コンボ')).toHaveTextContent('👑 0')
    expect(screen.getByLabelText('直近10問の正答率')).toHaveTextContent('直近 0%')

    // TopMenu: 見出しと2つのナビゲーションボタン
    expect(screen.getByText('11×11 〜 19×19')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '練習を始める' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '九九表を見る' })).toBeInTheDocument()

    // クイズ・九九表の内容は初期状態では非表示
    expect(screen.queryByLabelText('答えの入力欄')).not.toBeInTheDocument()
    expect(screen.queryByText('九九表（11〜19）')).not.toBeInTheDocument()
  })

  it('TopMenu「練習を始める」でクイズ画面に遷移する', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '練習を始める' }))

    // クイズ画面: 問題 a × b と答えの入力欄
    expect(screen.getByText(/×/)).toBeInTheDocument()
    expect(screen.getByLabelText('答えの入力欄')).toBeInTheDocument()

    // ホーム画面の TopMenu 見出しは消える
    expect(screen.queryByText('11×11 〜 19×19')).not.toBeInTheDocument()
  })

  it('TopMenu「九九表を見る」で九九表画面に遷移する', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '九九表を見る' }))

    // TableView: 見出しと代表セル
    expect(screen.getByText('九九表（11〜19）')).toBeInTheDocument()
    expect(screen.getByText('121')).toBeInTheDocument()
    expect(screen.getByText('361')).toBeInTheDocument()
  })

  it('NavBar の各ボタンで画面が切り替わる', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nav = screen.getByRole('navigation')

    // 初期: ホームが active
    expect(within(nav).getByRole('button', { name: 'ホーム' })).toHaveAttribute('aria-current', 'page')
    expect(within(nav).getByRole('button', { name: '練習' })).not.toHaveAttribute('aria-current', 'page')

    // 練習へ
    await user.click(within(nav).getByRole('button', { name: '練習' }))
    expect(screen.getByLabelText('答えの入力欄')).toBeInTheDocument()
    expect(within(nav).getByRole('button', { name: '練習' })).toHaveAttribute('aria-current', 'page')
    expect(within(nav).getByRole('button', { name: 'ホーム' })).not.toHaveAttribute('aria-current', 'page')

    // 九九表へ
    await user.click(within(nav).getByRole('button', { name: '九九表' }))
    expect(screen.getByText('九九表（11〜19）')).toBeInTheDocument()
    expect(within(nav).getByRole('button', { name: '九九表' })).toHaveAttribute('aria-current', 'page')

    // ホームへ戻る
    await user.click(within(nav).getByRole('button', { name: 'ホーム' }))
    expect(screen.getByText('11×11 〜 19×19')).toBeInTheDocument()
    expect(within(nav).getByRole('button', { name: 'ホーム' })).toHaveAttribute('aria-current', 'page')
  })

  it('NavBar 経由でクイズ→正解でスコア(コンボ)が更新され Header に反映される', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nav = screen.getByRole('navigation')
    await user.click(within(nav).getByRole('button', { name: '練習' }))

    // 問題文 a × b から a,b を抽出し正解を入力
    const problemText = screen.getByText(/×/).textContent as string
    const [a, b] = problemText.match(/\d+/g)!.map(Number)
    const answer = a * b

    const input = screen.getByLabelText('答えの入力欄')
    await user.type(input, String(answer))
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(await screen.findByText('正解! 🎉')).toBeInTheDocument()
    // Header のコンボが 0 → 1 に更新される
    expect(screen.getByLabelText('現在のコンボ')).toHaveTextContent('🔥 1')
  })

  it('Keypad のテンキー操作で回答入力・クリア・送信できる', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '練習を始める' }))

    const problemText = screen.getByText(/×/).textContent as string
    const [a, b] = problemText.match(/\d+/g)!.map(Number)
    const answer = String(a * b)

    const input = screen.getByLabelText('答えの入力欄')

    // 数字ボタンで入力
    for (const digit of answer) {
      await user.click(screen.getByRole('button', { name: digit }))
    }
    expect(input).toHaveValue(answer)

    // C ボタンでクリア
    await user.click(screen.getByRole('button', { name: 'C' }))
    expect(input).toHaveValue('')

    // 再入力して ✓ ボタンで送信
    for (const digit of answer) {
      await user.click(screen.getByRole('button', { name: digit }))
    }
    await user.click(screen.getByRole('button', { name: '✓' }))

    expect(await screen.findByText('正解! 🎉')).toBeInTheDocument()
  })
})
