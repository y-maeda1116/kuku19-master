// src/components/table/TableView.tsx
import { MultiplicationTable } from './MultiplicationTable'

export const TableView = () => (
  <div className="mx-auto max-w-3xl">
    <h2 className="px-4 pt-4 text-xl font-bold text-slate-800">九九表（11〜19）</h2>
    <p className="px-4 pb-2 text-sm text-slate-500">セルをタップすると計算式とインド式の手順が表示されます。</p>
    <MultiplicationTable />
  </div>
)
