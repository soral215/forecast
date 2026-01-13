import { type PropsWithChildren, useEffect, useId, useRef } from 'react'

import { cn } from '../lib/cn'

type Props = PropsWithChildren<{
  open: boolean
  onClose: () => void
  title?: string
  className?: string
}>

export function Modal({ open, onClose, title, className, children }: Props) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  const getFocusable = () => {
    const root = panelRef.current
    if (!root) return []
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')
    return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
      (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1,
    )
  }

  useEffect(() => {
    if (!open) return

    // 스크롤 락 + 포커스 복원
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) {
        e.preventDefault()
        panelRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (e.shiftKey) {
        if (active === first || active === panelRef.current) {
          e.preventDefault()
          last.focus()
        }
        return
      }

      if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    // 열릴 때 포커스 이동
    const id = window.setTimeout(() => {
      const focusable = getFocusable()
      ;(focusable[0] ?? panelRef.current)?.focus()
    }, 0)

    return () => {
      window.clearTimeout(id)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      lastFocusedRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center animate-fade-in"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-label={!title ? '모달' : undefined}
    >
      <div
        className={cn(
          'w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 text-slate-50 shadow-xl',
          'animate-scale-in',
          className,
        )}
        onMouseDown={(e) => e.stopPropagation()}
        ref={panelRef}
        tabIndex={-1}
      >
        {title && (
          <div className="border-b border-slate-800 px-5 py-4">
            <h2 id={titleId} className="text-base font-semibold tracking-tight">
              {title}
            </h2>
          </div>
        )}
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
