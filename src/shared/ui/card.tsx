import { type HTMLAttributes } from 'react'

import { cn } from '../lib/cn'

type Props = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-800 p-6',
        'bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/60',
        'backdrop-blur-sm',
        'transition-all duration-200',
        className,
      )}
      {...props}
    />
  )
}
