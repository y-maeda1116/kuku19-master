// src/components/layout/TopMenu.tsx
import { Button } from '../ui/Button'
import type { View } from '../../types'

type Props = { onNavigate: (view: View) => void }

export const TopMenu = ({ onNavigate }: Props) => (
  <div className="flex flex-col items-center gap-6 px-6 py-16 text-center">
    <div>
      <h2 className="text-3xl font-bold text-slate-800">11×11 〜 19×19</h2>
      <p className="mt-2 text-slate-500">インド式かけ算を、九九のように暗記しよう。</p>
    </div>
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <Button variant="primary" onClick={() => onNavigate('quiz')}>練習を始める</Button>
      <Button variant="secondary" onClick={() => onNavigate('table')}>九九表を見る</Button>
    </div>
  </div>
)
