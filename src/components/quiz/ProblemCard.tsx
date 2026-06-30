// src/components/quiz/ProblemCard.tsx
type Props = {
  a: number
  b: number
  userAnswer: string
  borderColor: string
}

export const ProblemCard = ({ a, b, userAnswer, borderColor }: Props) => (
  <div className={`rounded-2xl border-4 bg-white p-8 text-center ${borderColor}`}>
    <p className="text-5xl font-bold tracking-tight text-slate-800">
      {a} × {b} = <span className="text-[var(--color-accent)]">{userAnswer || '?'}</span>
    </p>
  </div>
)
