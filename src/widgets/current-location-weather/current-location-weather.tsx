import { useMemo } from 'react'

import { getTodayMinMax, useForecast } from '../../entities/weather'
import { Button, Card, Spinner } from '../../shared/ui'
import { useGeolocation } from '../../shared/lib/use-geolocation'

export function CurrentLocationWeather() {
  const geoOptions = useMemo(
    () => ({ enableHighAccuracy: false, timeout: 8000 }),
    [],
  )
  const geo = useGeolocation(geoOptions)
  const forecast = useForecast(
    geo.coords?.latitude ?? null,
    geo.coords?.longitude ?? null,
  )

  const todayMinMax = forecast.data ? getTodayMinMax(forecast.data) : null

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight">현재 위치</h2>
          <p className="mt-1 text-sm text-slate-400">
            브라우저 위치 권한을 허용하면 현재 위치의 날씨를 표시합니다.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={geo.request}>
          다시 시도
        </Button>
      </div>

      {geo.status === 'loading' && (
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
          <Spinner size="sm" />
          위치를 확인하는 중...
        </div>
      )}

      {geo.status === 'error' && (
        <p className="mt-4 text-sm text-rose-300">
          위치 정보를 가져올 수 없습니다. (권한 거부 또는 기기/브라우저 설정)
        </p>
      )}

      {geo.status === 'success' && forecast.isLoading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
          <Spinner size="sm" />
          날씨 정보를 불러오는 중...
        </div>
      )}

      {geo.status === 'success' && forecast.isError && (
        <p className="mt-4 text-sm text-rose-300">
          해당 장소의 정보가 제공되지 않습니다.
        </p>
      )}

      {geo.status === 'success' && forecast.isSuccess && (
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-200">
          <div className="rounded-xl bg-slate-950/40 px-3 py-2">
            현재 기온:{' '}
            <span className="font-semibold">
              {forecast.data.current?.temperature_2m ?? '-'}℃
            </span>
          </div>
          {todayMinMax && (
            <div className="rounded-xl bg-slate-950/40 px-3 py-2">
              오늘: <span className="font-semibold">{todayMinMax.min}℃</span> /{' '}
              <span className="font-semibold">{todayMinMax.max}℃</span>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
