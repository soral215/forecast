import { type HTMLAttributes } from 'react'

import { cn } from '../lib/cn'

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md'
}

export function Spinner({ className, size = 'md', ...props }: Props) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-slate-600 border-t-slate-100',
        size === 'sm' ? 'h-4 w-4 border-2' : 'h-6 w-6 border-2',
        className,
      )}
      {...props}
    />
  )
}

