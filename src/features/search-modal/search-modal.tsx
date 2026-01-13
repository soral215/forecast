import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type PlaceCandidate, useGeocodePlace } from '../../entities/place'
import {
  getTodayMinMax,
  getWeatherLabel,
  useForecast,
  WeatherIcon,
} from '../../entities/weather'
import { useFavorites } from '../favorites'
import { SearchPlace } from '../search-place'
import { Button, Modal, WeatherPreviewSkeleton } from '../../shared/ui'

type Props = {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: Props) {
  const [selected, setSelected] = useState<PlaceCandidate | null>(null)
  const fav = useFavorites()
  const navigate = useNavigate()

  const geocode = useGeocodePlace(selected?.full ?? null)
  const first = geocode.data?.[0]

  const forecast = useForecast(
    first?.latitude ?? null,
    first?.longitude ?? null,
  )
  const todayMinMax = useMemo(
    () => (forecast.data ? getTodayMinMax(forecast.data) : null),
    [forecast.data],
  )

  const isFavoriteByFullName = (full: string) =>
    fav.favorites.some((f) => f.fullName === full)

  const toggleFavoriteByCandidate = async (c: PlaceCandidate) => {
    const existing = fav.favorites.find((f) => f.fullName === c.full)
    if (existing) {
      fav.removeFavorite(existing.id)
      return
    }
    // 즐겨찾기 추가는 프리뷰에서만 확정(좌표 필요)하므로 여기서는 선택만 유도
    setSelected(c)
  }

  const previewFav =
    selected && first
      ? {
          id: `${first.latitude},${first.longitude}`,
          fullName: selected.full,
          alias: selected.full,
          lat: first.latitude,
          lon: first.longitude,
        }
      : null

  const previewIsFavorite = previewFav
    ? fav.isFavorite(previewFav.id) || isFavoriteByFullName(previewFav.fullName)
    : false

  const canAddMore = fav.favorites.length < fav.max

  return (
    <Modal open={open} onClose={onClose} title="지역 검색">
      {!selected && (
        <SearchPlace
          onSelect={(p) => setSelected(p)}
          isFavorite={(p) => isFavoriteByFullName(p.full)}
          onToggleFavorite={(p) => {
            void toggleFavoriteByCandidate(p)
          }}
        />
      )}

      {selected && (
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">선택한 지역</p>
              <p className="mt-1 text-base font-semibold">{selected.full}</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelected(null)}
            >
              목록
            </Button>
          </div>

          {(geocode.isLoading || forecast.isLoading) && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <WeatherPreviewSkeleton />
            </div>
          )}
          {geocode.isError && (
            <p className="text-sm text-rose-300">
              해당 장소의 정보가 제공되지 않습니다.
            </p>
          )}
          {geocode.isSuccess && geocode.data.length === 0 && (
            <p className="text-sm text-rose-300">
              해당 장소의 정보가 제공되지 않습니다.
            </p>
          )}

          {first && forecast.isSuccess && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                {/* 날씨 아이콘 + 현재 상태 */}
                <div className="flex items-center gap-2 rounded-xl bg-slate-950/40 px-3 py-2">
                  <WeatherIcon
                    code={forecast.data?.current?.weather_code ?? 0}
                    isDay={forecast.data?.current?.is_day === 1}
                    size="md"
                  />
                  <div>
                    <p className="text-xs text-slate-400">
                      {getWeatherLabel(forecast.data?.current?.weather_code ?? 0)}
                    </p>
                    <p className="font-semibold">
                      {forecast.data?.current?.temperature_2m ?? '-'}℃
                    </p>
                  </div>
                </div>
                {todayMinMax && (
                  <div className="rounded-xl bg-slate-950/40 px-3 py-2">
                    <p className="text-xs text-slate-400">오늘</p>
                    <p>
                      <span className="font-semibold text-blue-300">{todayMinMax.min}℃</span>
                      <span className="mx-1 text-slate-500">/</span>
                      <span className="font-semibold text-rose-300">{todayMinMax.max}℃</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant={previewIsFavorite ? 'secondary' : 'primary'}
                  size="sm"
                  disabled={!previewIsFavorite && !canAddMore}
                  onClick={() => {
                    if (!previewFav) return
                    if (previewIsFavorite) {
                      fav.removeFavorite(previewFav.id)
                      return
                    }
                    fav.addFavorite(previewFav)
                    onClose()
                  }}
                >
                  {previewIsFavorite ? '즐겨찾기 삭제' : '즐겨찾기 추가'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    navigate(
                      `/place?lat=${first.latitude}&lon=${first.longitude}&name=${encodeURIComponent(
                        selected.full,
                      )}`,
                    )
                    onClose()
                  }}
                >
                  전체 보기
                </Button>
                {!previewIsFavorite && !canAddMore && (
                  <p className="self-center text-sm text-rose-300">
                    즐겨찾기는 최대 {fav.max}개까지 추가할 수 있습니다.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
