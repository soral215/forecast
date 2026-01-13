import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import {
  getDailyMinMaxList,
  getDefaultTheme,
  getNext24hHourlyTemps,
  getTodayMinMax,
  getWeatherLabel,
  getWeatherTheme,
  useForecast,
  WeatherIcon,
} from '../../entities/weather'
import { Card } from '../../shared/ui'
import { cn } from '../../shared/lib/cn'

export function PlaceDetailPage() {
  const [params] = useSearchParams()
  const name = params.get('name')
  const latParam = params.get('lat')
  const lonParam = params.get('lon')
  const lat = latParam ? Number(latParam) : NaN
  const lon = lonParam ? Number(lonParam) : NaN
  const hasCoords =
    typeof latParam === 'string' &&
    typeof lonParam === 'string' &&
    latParam.length > 0 &&
    lonParam.length > 0 &&
    Number.isFinite(lat) &&
    Number.isFinite(lon)

  const forecast = useForecast(hasCoords ? lat : null, hasCoords ? lon : null)
  const todayMinMax = forecast.data ? getTodayMinMax(forecast.data) : null

  const defaultTheme = getDefaultTheme()
  const weatherTheme = useMemo(() => {
    if (!forecast.data?.current) return null
    return getWeatherTheme(
      forecast.data.current.weather_code,
      forecast.data.current.is_day === 1,
    )
  }, [forecast.data])

  const theme = weatherTheme ?? defaultTheme
  const isLoaded = !!weatherTheme

  return (
    <div className={cn('min-h-full transition-colors duration-1000', theme.textColor)}>
      {/* 기본 배경 (항상 표시) */}
      <div
        className={cn(
          'fixed inset-0 -z-20 bg-gradient-to-b',
          defaultTheme.gradient,
        )}
      />

      {/* 날씨 기반 배경 (데이터 로드 후 fade-in) */}
      <div
        className={cn(
          'fixed inset-0 -z-10 bg-gradient-to-b transition-opacity duration-[1200ms] ease-in-out',
          isLoaded ? 'opacity-100' : 'opacity-0',
          weatherTheme?.gradient ?? defaultTheme.gradient,
        )}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="animate-on-load animate-fade-in-down flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">전체 보기</h1>
          <Link
            className="rounded-lg bg-white/20 px-3 py-2 text-sm hover:bg-white/30 transition-colors border border-white/30"
            to="/"
          >
            뒤로
          </Link>
        </header>

        {!hasCoords && (
          <Card className="animate-on-load animate-fade-in-up animation-delay-100">
            <p className="text-sm opacity-70">
              선택된 장소가 없습니다. 즐겨찾기 카드 또는 검색 결과에서 장소를
              선택해주세요.
            </p>
          </Card>
        )}

        {hasCoords && (
          <Card className="animate-on-load animate-fade-in-up animation-delay-100">
            <h2 className="text-base font-semibold tracking-tight">
              {name ? name : '선택된 장소'}
            </h2>
            <p className="mt-1 text-sm opacity-60">
              좌표: {lat}, {lon}
            </p>

            {forecast.isLoading && (
              <p className="mt-4 text-sm opacity-70">
                날씨 정보를 불러오는 중...
              </p>
            )}

            {forecast.isError && (
              <p className="mt-4 text-sm text-rose-200">
                해당 장소의 정보가 제공되지 않습니다.
              </p>
            )}

            {forecast.isSuccess && (
              <>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {/* 날씨 아이콘 + 현재 상태 */}
                  <div className="flex items-center gap-3">
                    <WeatherIcon
                      code={forecast.data.current?.weather_code ?? 0}
                      isDay={forecast.data.current?.is_day === 1}
                      size="lg"
                    />
                    <div>
                      <p className="text-sm opacity-70">
                        {getWeatherLabel(forecast.data.current?.weather_code ?? 0)}
                      </p>
                      <p className="text-3xl font-bold">
                        {forecast.data.current?.temperature_2m ?? '-'}
                        <span className="text-xl font-normal opacity-60">℃</span>
                      </p>
                    </div>
                  </div>
                  {todayMinMax && (
                    <div className="rounded-xl bg-black/10 px-4 py-3">
                      <p className="text-xs opacity-70">오늘</p>
                      <p className="text-lg">
                        <span className="font-semibold text-blue-200">{todayMinMax.min}℃</span>
                        <span className="mx-1 opacity-40">/</span>
                        <span className="font-semibold text-rose-200">{todayMinMax.max}℃</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-sm opacity-70">
                    시간대별 기온(다음 24시간)
                  </p>
                  <ul className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                    {getNext24hHourlyTemps(forecast.data).map((x) => (
                      <li
                        key={x.time}
                        className="flex flex-col items-center gap-1 rounded-xl border border-white/20 bg-black/10 px-2 py-3"
                      >
                        <p className="text-xs opacity-70">
                          {x.time.slice(11, 16)}
                        </p>
                        <WeatherIcon code={x.weatherCode} size="sm" />
                        <p className="text-sm font-semibold">
                          {x.temp}℃
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="text-sm opacity-70">일별 최저/최고(7일)</p>
                  <ul className="mt-2 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/20 bg-black/10">
                    {getDailyMinMaxList(forecast.data, 7).map((d) => (
                      <li
                        key={d.date}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <p className="w-12 text-sm">
                            {d.date.slice(5, 10)}
                          </p>
                          <WeatherIcon code={d.weatherCode} size="sm" />
                        </div>
                        <p className="text-sm">
                          <span className="font-semibold text-blue-200">{d.min}℃</span>
                          <span className="mx-2 opacity-40">/</span>
                          <span className="font-semibold text-rose-200">{d.max}℃</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
