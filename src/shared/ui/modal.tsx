import { type PropsWithChildren, useEffect } from 'react'

import { cn } from '../lib/cn'

type Props = PropsWithChildren<{
  open: boolean
  onClose: () => void
  title?: string
  className?: string
}>

export function Modal({ open, onClose, title, className, children }: Props) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          'w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 text-slate-50 shadow-xl',
          className,
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="border-b border-slate-800 px-5 py-4">
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          </div>
        )}
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
