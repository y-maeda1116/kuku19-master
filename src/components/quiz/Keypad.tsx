// src/components/quiz/Keypad.tsx
import { Button } from '../ui/Button'

type Props = {
  onDigit: (d: string) => void
  onClear: () => void
  onSubmit: () => void
  disabled: boolean
}

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export const Keypad = ({ onDigit, onClear, onSubmit, disabled }: Props) => (
  <div className="grid grid-cols-3 gap-2">
    {digits.map((d) => (
      <Button
        key={d}
        variant="secondary"
        disabled={disabled}
        onClick={() => onDigit(d)}
        className="py-4 text-xl"
      >
        {d}
      </Button>
    ))}
    <Button variant="ghost" disabled={disabled} onClick={onClear} className="py-4 text-xl">
      C
    </Button>
    <Button variant="secondary" disabled={disabled} onClick={() => onDigit('0')} className="py-4 text-xl">
      0
    </Button>
    <Button variant="primary" disabled={disabled} onClick={onSubmit} className="py-4 text-xl">
      ✓
    </Button>
  </div>
)
