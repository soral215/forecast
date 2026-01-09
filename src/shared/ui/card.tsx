import { type HTMLAttributes } from 'react'

import { cn } from '../lib/cn'

type Props = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-800 bg-slate-900/40 p-6',
        className,
      )}
      {...props}
    />
  )
}

