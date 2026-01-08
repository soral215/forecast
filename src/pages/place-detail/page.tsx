import { Link } from 'react-router-dom'

import { Card } from '../../shared/ui'

export function PlaceDetailPage() {
  return (
    <div className="min-h-full bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Place detail</h1>
          <Link
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100 hover:bg-slate-700"
            to="/"
          >
            Back
          </Link>
        </header>

        <Card>
          <p className="text-sm text-slate-300">
            상세 페이지(추후 선택된 장소의 전체 날씨 정보를 표시).
          </p>
        </Card>
      </div>
    </div>
  )
}
