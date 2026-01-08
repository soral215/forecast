import { useState } from 'react'
import { Link } from 'react-router-dom'

import { type PlaceCandidate, useGeocodePlace } from '../../entities/place'
import {
  getNext24hHourlyTemps,
  getTodayMinMax,
  useForecast,
} from '../../entities/weather'
import { SearchPlace } from '../../features/search-place'
import { Card } from '../../shared/ui'

export function HomePage() {
  const [selected, setSelected] = useState<PlaceCandidate | null>(null)
  const geocode = useGeocodePlace(selected?.full ?? null)
  const first = geocode.data?.[0]
  const forecast = useForecast(
    first?.latitude ?? null,
    first?.longitude ?? null,
  )
  const todayMinMax = forecast.data ? getTodayMinMax(forecast.data) : null

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

        {forecast.isLoading && (
          <Card>
            <p className="text-sm text-slate-400">날씨 정보를 불러오는 중...</p>
          </Card>
        )}

        {forecast.isError && (
          <Card>
            <p className="text-sm text-rose-300">
              해당 장소의 정보가 제공되지 않습니다.
            </p>
          </Card>
        )}

        {forecast.isSuccess && (
          <Card>
            <h2 className="text-base font-semibold tracking-tight">
              {selected ? selected.full : '선택된 장소'}
            </h2>

            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-200">
              <div className="rounded-xl bg-slate-950/40 px-3 py-2">
                현재 기온:{' '}
                <span className="font-semibold">
                  {forecast.data.current?.temperature_2m ?? '-'}℃
                </span>
              </div>

              {todayMinMax && (
                <div className="rounded-xl bg-slate-950/40 px-3 py-2">
                  오늘:{' '}
                  <span className="font-semibold">{todayMinMax.min}℃</span> /{' '}
                  <span className="font-semibold">{todayMinMax.max}℃</span>
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-sm text-slate-300">
                시간대별 기온(다음 24시간)
              </p>
              <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {getNext24hHourlyTemps(forecast.data).map((x) => (
                  <li
                    key={x.time}
                    className="rounded-xl border border-slate-800 bg-slate-950/30 px-3 py-2"
                  >
                    <p className="text-xs text-slate-400">
                      {x.time.slice(11, 16)}
                    </p>
                    <p className="text-sm font-semibold text-slate-100">
                      {x.temp}℃
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
