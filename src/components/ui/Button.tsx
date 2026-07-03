// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

const variantClass: Record<Variant, string> = {
  primary: 'bg-[var(--color-accent)] text-white hover:opacity-90',
  secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
}

export const Button = ({ variant = 'primary', className = '', children, ...rest }: Props) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${variantClass[variant]} ${className}`}
    {...rest}
  >
    {children}
  </button>
)
