import { useEffect, useRef, useState } from 'react'

import { Button, Input } from '../../../shared/ui'

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
      />
      <Button size="sm" variant="primary" onClick={save}>
        저장
      </Button>
      <Button size="sm" variant="ghost" onClick={onCancel}>
        취소
      </Button>
    </div>
  )
}
