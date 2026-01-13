import { useEffect, useRef, useState } from 'react'

import { Input } from '../../../shared/ui'

type Props = {
  initialValue: string
  fallbackValue: string
  onSave: (nextAlias: string) => void
  onCancel: () => void
}

export function RenameFavoriteInline({
  initialValue,
  fallbackValue,
  onSave,
  onCancel,
}: Props) {
  const [draft, setDraft] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const save = () => {
    const next = draft.trim()
    onSave(next.length ? next : fallbackValue)
  }

  return (
    <div
      className="flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') save()
          if (e.key === 'Escape') onCancel()
        }}
        placeholder="별칭 입력"
        className="w-auto min-w-0 flex-1"
      />
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={save}
          className="rounded-lg bg-white/30 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/40"
        >
          저장
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3 py-1.5 text-sm font-medium opacity-70 transition-colors hover:bg-white/20 hover:opacity-100"
        >
          취소
        </button>
      </div>
    </div>
  )
}
