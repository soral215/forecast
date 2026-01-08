import { useMemo } from 'react'

import { Button } from '../../shared/ui'
import { useGeolocation } from '../../shared/lib/use-geolocation'
import { formatKoreanPlaceName, useReverseGeocode } from '../../entities/place'
import { WeatherCard } from '../weather-card'

type Props = {
  onOpenSearch: () => void
}

export function CurrentLocationWeather({ onOpenSearch }: Props) {
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

  return (
    <WeatherCard
      title="현재 위치"
      subtitle={placeName}
      lat={lat}
      lon={lon}
      empty={empty}
      detailLink={detailLink}
      headerExtra={
        <Button variant="secondary" size="sm" onClick={geo.request}>
          새로고침
        </Button>
      }
    />
  )
}
