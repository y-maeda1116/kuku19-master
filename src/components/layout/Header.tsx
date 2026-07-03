// src/components/layout/Header.tsx
import type { ScoreState } from '../../domain/scoring'
import { accuracy } from '../../domain/scoring'

type Props = { score: ScoreState }

export const Header = ({ score }: Props) => (
  <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
    <h1 className="text-lg font-bold tracking-tight text-slate-800">九九19</h1>
    <div className="flex items-center gap-4 text-sm">
      <span aria-label="現在のコンボ" className="font-semibold text-[var(--color-accent)]">
        🔥 {score.combo}
      </span>
      <span aria-label="最高コンボ">👑 {score.bestCombo}</span>
      <span aria-label="直近10問の正答率">直近 {accuracy(score)}%</span>
    </div>
  </header>
)
