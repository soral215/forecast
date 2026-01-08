import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  type FavoritePlace,
  type PlaceCandidate,
  useGeocodePlace,
} from '../../entities/place'
import {
  getNext24hHourlyTemps,
  getTodayMinMax,
  useForecast,
} from '../../entities/weather'
import { SearchPlace } from '../../features/search-place'
import { useFavorites } from '../../features/favorites'
import { Button, Card } from '../../shared/ui'

export function SelectedPlaceWeather() {
  const [selected, setSelected] = useState<PlaceCandidate | null>(null)
  const geocode = useGeocodePlace(selected?.full ?? null)
  const first = geocode.data?.[0]

  const forecast = useForecast(
    first?.latitude ?? null,
    first?.longitude ?? null,
  )
  const todayMinMax = forecast.data ? getTodayMinMax(forecast.data) : null

  const fav = useFavorites()
  const selectedFav: FavoritePlace | null =
    selected && first
      ? {
          id: `${first.latitude},${first.longitude}`,
          fullName: selected.full,
          alias: selected.full,
          lat: first.latitude,
          lon: first.longitude,
        }
      : null
  const isSelectedFavorite = selectedFav
    ? fav.isFavorite(selectedFav.id)
    : false
  const canAddMore = fav.favorites.length < fav.max

  return (
    <>
      <Card>
        <h2 className="text-base font-semibold tracking-tight">장소 검색</h2>
        <p className="mt-1 text-sm text-slate-400">
          검색 결과에서 장소를 선택하면 상세 날씨를 표시합니다.
        </p>

        <div className="mt-4">
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
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-sm text-slate-300">
                  좌표: {geocode.data[0].latitude}, {geocode.data[0].longitude}
                </p>
                <Link
                  className="text-sm text-indigo-300 hover:text-indigo-200"
                  to={`/place?lat=${geocode.data[0].latitude}&lon=${geocode.data[0].longitude}&name=${encodeURIComponent(
                    selected.full,
                  )}`}
                >
                  상세 보기
                </Link>
              </div>
            )}

            {selectedFav && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant={isSelectedFavorite ? 'secondary' : 'primary'}
                  onClick={() => {
                    if (isSelectedFavorite) fav.removeFavorite(selectedFav.id)
                    else fav.addFavorite(selectedFav)
                  }}
                  disabled={!isSelectedFavorite && !canAddMore}
                >
                  {isSelectedFavorite ? '즐겨찾기 삭제' : '즐겨찾기 추가'}
                </Button>
                {!isSelectedFavorite && !canAddMore && (
                  <p className="text-sm text-rose-300">
                    즐겨찾기는 최대 {fav.max}개까지 추가할 수 있습니다.
                  </p>
                )}
              </div>
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

      {forecast.isSuccess && selected && (
        <Card>
          <h2 className="text-base font-semibold tracking-tight">
            {selected.full}
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
                오늘: <span className="font-semibold">{todayMinMax.min}℃</span>{' '}
                / <span className="font-semibold">{todayMinMax.max}℃</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <p className="text-sm text-slate-300">시간대별 기온(다음 24시간)</p>
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
    </>
  )
}
