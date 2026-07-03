// src/components/table/MultiplicationTable.tsx
import { useState } from 'react'
import { MIN_FACTOR, MAX_FACTOR } from '../../domain/multiplication'
import { IndianMethodExplain } from '../quiz/IndianMethodExplain'

const factors = Array.from({ length: MAX_FACTOR - MIN_FACTOR + 1 }, (_, i) => MIN_FACTOR + i)

export const MultiplicationTable = () => {
  const [selected, setSelected] = useState<{ a: number; b: number } | null>(null)

  return (
    <div className="px-2 py-4">
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="p-2" aria-label="掛け算の表" />
              {factors.map((b) => (
                <th key={b} className="p-2 text-sm font-bold text-slate-500">
                  {b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {factors.map((a) => (
              <tr key={a}>
                <th className="p-2 text-sm font-bold text-slate-500">{a}</th>
                {factors.map((b) => {
                  const active =
                    selected !== null &&
                    (selected.a === a || selected.b === b || (selected.a === b && selected.b === a))
                  const exact = selected?.a === a && selected?.b === b
                  return (
                    <td key={b}>
                      <button
                        onClick={() => setSelected({ a, b })}
                        className={`h-12 w-14 rounded-lg text-sm font-medium transition ${
                          exact
                            ? 'bg-[var(--color-accent)] text-white'
                            : active
                              ? 'bg-indigo-100 text-slate-800'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {a * b}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
          <p className="text-lg font-bold text-slate-800">
            {selected.a} × {selected.b} = {selected.a * selected.b}
          </p>
          <IndianMethodExplain a={selected.a} b={selected.b} />
        </div>
      )}
    </div>
  )
}
