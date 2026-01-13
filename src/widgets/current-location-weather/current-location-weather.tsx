import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGeolocation } from '../../shared/lib/use-geolocation'
import { formatKoreanPlaceName, useReverseGeocode } from '../../entities/place'
import { WeatherCard } from '../weather-card'

type Props = {
  onOpenSearch: () => void
}

export function CurrentLocationWeather({ onOpenSearch }: Props) {
  const navigate = useNavigate()
  const geoOptions = useMemo(
    () => ({ enableHighAccuracy: false, timeout: 8000 }),
    [],
  )
  const geo = useGeolocation(geoOptions)
  const placeNameQuery = useReverseGeocode(
    geo.coords?.latitude ?? null,
    geo.coords?.longitude ?? null,
  )
  const placeName = placeNameQuery.data
    ? formatKoreanPlaceName(placeNameQuery.data)
    : undefined
  const lat = geo.coords?.latitude ?? null
  const lon = geo.coords?.longitude ?? null

  const empty =
    geo.status === 'error'
      ? {
          title: '현재 위치를 사용할 수 없어요',
          description: '위치 권한을 허용하거나, 검색으로 지역을 추가해보세요.',
          actions: [
            { label: '다시 시도', onClick: geo.request },
            { label: '검색', onClick: onOpenSearch },
          ],
        }
      : !lat || !lon
        ? {
            title: '현재 위치',
            description:
              '브라우저 위치 권한을 허용하면 현재 위치의 날씨를 표시합니다.',
            actions: [{ label: '다시 시도', onClick: geo.request }],
          }
        : undefined

  const detailLink =
    lat && lon
      ? `/place?lat=${lat}&lon=${lon}&name=${encodeURIComponent(
          placeName ?? '현재 위치',
        )}`
      : undefined

  const handleClick = () => {
    if (detailLink) {
      navigate(detailLink)
    }
  }

  return (
    <WeatherCard
      title="현재 위치"
      subtitle={placeName}
      lat={lat}
      lon={lon}
      empty={empty}
      detailLink={detailLink}
      onClick={detailLink ? handleClick : undefined}
      headerExtra={
        <button
          className="rounded-lg p-2 opacity-70 transition-colors hover:bg-white/20 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            geo.request()
          }}
          aria-label="새로고침"
          title="새로고침"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      }
    />
  )
}
