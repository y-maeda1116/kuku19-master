// src/components/quiz/Feedback.tsx
import { IndianMethodExplain } from './IndianMethodExplain'

type Props = {
  isCorrect: boolean
  answer: number
  a: number
  b: number
}

export const Feedback = ({ isCorrect, answer, a, b }: Props) => (
  <div
    role="status"
    aria-live="polite"
    className={`mt-4 rounded-xl p-4 text-center ${
      isCorrect ? 'bg-green-50 text-[var(--color-correct)]' : 'bg-red-50 text-[var(--color-wrong)]'
    }`}
  >
    <p className="text-xl font-bold">{isCorrect ? '正解! 🎉' : `不正解… 正解は ${answer}`}</p>
    {!isCorrect && <IndianMethodExplain a={a} b={b} />}
  </div>
)
