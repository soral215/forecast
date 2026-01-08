import { useState } from 'react'
import { Link } from 'react-router-dom'

import { type PlaceCandidate, useGeocodePlace } from '../../entities/place'
import { SearchPlace } from '../../features/search-place'
import { Card } from '../../shared/ui'

export function HomePage() {
  const [selected, setSelected] = useState<PlaceCandidate | null>(null)
  const geocode = useGeocodePlace(selected?.full ?? null)

  return (
    <div className="min-h-full bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Home</h1>
          <Link
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100 hover:bg-slate-700"
            to="/place"
          >
            Go detail
          </Link>
        </header>

        <Card>
          <p className="text-sm text-slate-300">
            Router/Query Provider 적용 확인용 임시 페이지입니다.
          </p>

          <div className="mt-6">
            <SearchPlace onSelect={(p) => setSelected(p)} />
          </div>

          {selected && (
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
              <p className="text-sm text-slate-200">
                선택: <span className="font-medium">{selected.full}</span>
              </p>

              {geocode.isLoading && (
                <p className="mt-2 text-sm text-slate-400">좌표를 찾는 중...</p>
              )}

              {geocode.isError && (
                <p className="mt-2 text-sm text-rose-300">
                  해당 장소의 정보가 제공되지 않습니다.
                </p>
              )}

              {geocode.isSuccess && geocode.data.length === 0 && (
                <p className="mt-2 text-sm text-rose-300">
                  해당 장소의 정보가 제공되지 않습니다.
                </p>
              )}

              {geocode.isSuccess && geocode.data.length > 0 && (
                <p className="mt-2 text-sm text-slate-300">
                  좌표: {geocode.data[0].latitude}, {geocode.data[0].longitude}
                </p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
