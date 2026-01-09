import { useEffect, useMemo, useState } from 'react'

import {
  loadSearchIndex,
  normalizeDistrictText,
  type PlaceCandidate,
} from '../../../entities/place'
import { useDebounce } from '../../../shared/lib/use-debounce'
import { Card, Input, Spinner } from '../../../shared/ui'

type Props = {
  onSelect: (place: PlaceCandidate) => void
  isFavorite?: (place: PlaceCandidate) => boolean
  onToggleFavorite?: (place: PlaceCandidate) => void
}

function scoreCandidate(candidate: PlaceCandidate, queryNorm: string) {
  // lower is better
  const includes = candidate.normalized.includes(queryNorm)
  if (!includes) return Number.POSITIVE_INFINITY
  return candidate.depth
}

export function SearchPlace({ onSelect, isFavorite, onToggleFavorite }: Props) {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 200)
  const queryNorm = useMemo(() => normalizeDistrictText(debounced), [debounced])

  const [index, setIndex] = useState<PlaceCandidate[] | null>(null)
  const [indexError, setIndexError] = useState(false)

  useEffect(() => {
    let isMounted = true
    loadSearchIndex()
      .then((data) => {
        if (!isMounted) return
        setIndex(data)
      })
      .catch(() => {
        if (!isMounted) return
        setIndexError(true)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const results = useMemo(() => {
    if (!queryNorm || !index) return []

    return index
      .map((c) => ({ c, score: scoreCandidate(c, queryNorm) }))
      .filter((x) => Number.isFinite(x.score))
      .sort((a, b) => a.score - b.score || a.c.full.localeCompare(b.c.full))
      .slice(0, 20)
      .map((x) => x.c)
  }, [index, queryNorm])

  return (
    <div className="flex flex-col gap-3">
      <Input
        value={query}
        placeholder="예: 서울특별시, 종로구, 청운동"
        onChange={(e) => setQuery(e.target.value)}
      />

      {queryNorm && (
        <Card className="p-2">
          {indexError && (
            <p className="px-2 py-2 text-sm text-rose-300">
              장소 목록을 불러오지 못했습니다.
            </p>
          )}

          {!index && !indexError && (
            <div className="flex items-center gap-2 px-2 py-2 text-sm text-slate-300">
              <Spinner size="sm" />
              장소 목록을 불러오는 중...
            </div>
          )}

          {results.length === 0 ? (
            <p className="px-2 py-2 text-sm text-slate-400">
              매칭되는 장소가 없습니다.
            </p>
          ) : (
            <ul className="max-h-72 overflow-auto">
              {results.map((p) => (
                <li key={p.full}>
                  <div className="flex items-center gap-2">
                    <button
                      className="min-w-0 flex-1 rounded-xl px-3 py-2 text-left text-sm text-slate-100 hover:bg-slate-800/60"
                      onClick={() => onSelect(p)}
                      type="button"
                    >
                      <span className="truncate">{p.full}</span>
                    </button>
                    {onToggleFavorite && (
                      <button
                        className="rounded-xl px-2 py-2 text-lg text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleFavorite(p)
                        }}
                        type="button"
                        aria-label="즐겨찾기 토글"
                        title="즐겨찾기"
                      >
                        {isFavorite?.(p) ? '★' : '☆'}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  )
}
