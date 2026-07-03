// src/components/layout/NavBar.tsx
import type { View } from '../../types'

type Props = {
  view: View
  onChange: (view: View) => void
}

const items: ReadonlyArray<{ key: View; label: string }> = [
  { key: 'home', label: 'ホーム' },
  { key: 'quiz', label: '練習' },
  { key: 'table', label: '九九表' },
]

export const NavBar = ({ view, onChange }: Props) => (
  <nav className="flex border-t border-slate-200 bg-white">
    {items.map((item) => {
      const active = view === item.key
      return (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`flex-1 py-3 text-sm font-medium transition ${
            active ? 'text-[var(--color-accent)]' : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-current={active ? 'page' : undefined}
        >
          {item.label}
        </button>
      )
    })}
  </nav>
)
