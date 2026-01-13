import { Link, useSearchParams } from 'react-router-dom'

import {
  getDailyMinMaxList,
  getNext24hHourlyTemps,
  getTodayMinMax,
  getWeatherLabel,
  useForecast,
  WeatherIcon,
} from '../../entities/weather'
import { Card } from '../../shared/ui'

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

  return (
    <div className="min-h-full bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">전체 보기</h1>
          <Link
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100 hover:bg-slate-700"
            to="/"
          >
            뒤로
          </Link>
        </header>

        {!hasCoords && (
          <Card>
            <p className="text-sm text-slate-300">
              선택된 장소가 없습니다. 즐겨찾기 카드 또는 검색 결과에서 장소를
              선택해주세요.
            </p>
          </Card>
        )}

        {hasCoords && (
          <Card>
            <h2 className="text-base font-semibold tracking-tight">
              {name ? name : '선택된 장소'}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              좌표: {lat}, {lon}
            </p>

            {forecast.isLoading && (
              <p className="mt-4 text-sm text-slate-400">
                날씨 정보를 불러오는 중...
              </p>
            )}

            {forecast.isError && (
              <p className="mt-4 text-sm text-rose-300">
                해당 장소의 정보가 제공되지 않습니다.
              </p>
            )}

            {forecast.isSuccess && (
              <>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-200">
                  {/* 날씨 아이콘 + 현재 상태 */}
                  <div className="flex items-center gap-3 rounded-xl bg-slate-950/40 px-4 py-3">
                    <WeatherIcon
                      code={forecast.data.current?.weather_code ?? 0}
                      isDay={forecast.data.current?.is_day === 1}
                      size="lg"
                    />
                    <div>
                      <p className="text-sm text-slate-400">
                        {getWeatherLabel(forecast.data.current?.weather_code ?? 0)}
                      </p>
                      <p className="text-2xl font-semibold">
                        {forecast.data.current?.temperature_2m ?? '-'}℃
                      </p>
                    </div>
                  </div>
                  {todayMinMax && (
                    <div className="rounded-xl bg-slate-950/40 px-4 py-3">
                      <p className="text-xs text-slate-400">오늘</p>
                      <p className="text-lg">
                        <span className="font-semibold text-blue-300">{todayMinMax.min}℃</span>
                        <span className="mx-1 text-slate-500">/</span>
                        <span className="font-semibold text-rose-300">{todayMinMax.max}℃</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-sm text-slate-300">
                    시간대별 기온(다음 24시간)
                  </p>
                  <ul className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                    {getNext24hHourlyTemps(forecast.data).map((x) => (
                      <li
                        key={x.time}
                        className="flex flex-col items-center gap-1 rounded-xl border border-slate-800 bg-slate-950/30 px-2 py-3"
                      >
                        <p className="text-xs text-slate-400">
                          {x.time.slice(11, 16)}
                        </p>
                        <WeatherIcon code={x.weatherCode} size="sm" />
                        <p className="text-sm font-semibold text-slate-100">
                          {x.temp}℃
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-slate-300">일별 최저/최고(7일)</p>
                  <ul className="mt-2 divide-y divide-slate-800 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/30">
                    {getDailyMinMaxList(forecast.data, 7).map((d) => (
                      <li
                        key={d.date}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <p className="w-12 text-sm text-slate-200">
                            {d.date.slice(5, 10)}
                          </p>
                          <WeatherIcon code={d.weatherCode} size="sm" />
                        </div>
                        <p className="text-sm text-slate-200">
                          <span className="font-semibold text-blue-300">{d.min}℃</span>
                          <span className="mx-2 text-slate-600">/</span>
                          <span className="font-semibold text-rose-300">{d.max}℃</span>
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
