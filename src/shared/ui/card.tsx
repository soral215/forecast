import { type HTMLAttributes } from 'react'

import { cn } from '../lib/cn'

type Props = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        'bg-white/20 border-white/30',
        'backdrop-blur-md',
        'shadow-lg shadow-black/5',
        'transition-all duration-200',
        className,
      )}
      {...props}
    />
  )
}
