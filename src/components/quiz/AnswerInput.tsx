// src/components/quiz/AnswerInput.tsx
type Props = {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  disabled: boolean
}

export const AnswerInput = ({ value, onChange, onSubmit, disabled }: Props) => {
  const handleText = (v: string) => {
    if (disabled) return
    onChange(v.replace(/[^0-9]/g, '').slice(0, 3))
  }
  return (
    <div className="space-y-3">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => handleText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value !== '') onSubmit()
        }}
        disabled={disabled}
        placeholder="答えを入力"
        aria-label="答えの入力欄"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-2xl focus:border-[var(--color-accent)] focus:outline-none disabled:bg-slate-50"
      />
    </div>
  )
}
