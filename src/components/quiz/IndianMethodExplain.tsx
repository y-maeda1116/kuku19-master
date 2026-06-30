// src/components/quiz/IndianMethodExplain.tsx
import { explainIndianMethod } from '../../domain/indianMethod'

type Props = { a: number; b: number }

export const IndianMethodExplain = ({ a, b }: Props) => {
  const m = explainIndianMethod(a, b)
  return (
    <div className="mt-3 rounded-xl bg-slate-50 p-4 text-left text-sm text-slate-700">
      <p className="mb-2 font-semibold text-slate-800">インド式（縦・交差法）</p>
      <ol className="space-y-1">
        {m.steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  )
}
