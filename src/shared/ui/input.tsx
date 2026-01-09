import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from '../lib/cn'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500',
        'focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30',
        className,
      )}
      {...props}
    />
  )
})

