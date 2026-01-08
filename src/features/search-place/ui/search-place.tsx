import { useMemo, useState } from 'react'

import {
  buildSearchIndex,
  normalizeDistrictText,
  type PlaceCandidate,
} from '../../../entities/place'
import { useDebounce } from '../../../shared/lib/use-debounce'
import { Card, Input } from '../../../shared/ui'

type Props = {
  onSelect: (place: PlaceCandidate) => void
}

function scoreCandidate(candidate: PlaceCandidate, queryNorm: string) {
  // lower is better
  const includes = candidate.normalized.includes(queryNorm)
  if (!includes) return Number.POSITIVE_INFINITY
  return candidate.depth
}

export function SearchPlace({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 200)
  const queryNorm = useMemo(() => normalizeDistrictText(debounced), [debounced])

  const index = useMemo(() => buildSearchIndex(), [])

  const results = useMemo(() => {
    if (!queryNorm) return []

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
          {results.length === 0 ? (
            <p className="px-2 py-2 text-sm text-slate-400">
              매칭되는 장소가 없습니다.
            </p>
          ) : (
            <ul className="max-h-72 overflow-auto">
              {results.map((p) => (
                <li key={p.full}>
                  <button
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-100 hover:bg-slate-800/60"
                    onClick={() => onSelect(p)}
                    type="button"
                  >
                    {p.full}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  )
}
