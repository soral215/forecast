import { type ButtonHTMLAttributes } from 'react'

import { cn } from '../lib/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        size === 'sm' ? 'px-3 py-2' : 'px-4 py-2.5',
        variant === 'primary' &&
          'bg-indigo-500 text-white hover:bg-indigo-400 disabled:bg-indigo-500/50',
        variant === 'secondary' &&
          'bg-slate-800 text-slate-50 hover:bg-slate-700 disabled:bg-slate-800/50',
        variant === 'ghost' &&
          'bg-transparent text-slate-200 hover:bg-slate-800/60 disabled:text-slate-400',
        'disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  )
}
