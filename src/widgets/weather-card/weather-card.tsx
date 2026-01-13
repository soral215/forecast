import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getNext24hHourlyTemps,
  getTodayMinMax,
  getWeatherLabel,
  useForecast,
  WeatherIcon,
} from '../../entities/weather'
import { Button, Card, Spinner } from '../../shared/ui'
import { cn } from '../../shared/lib/cn'

type Props = {
  title: string
  subtitle?: string
  titleNode?: React.ReactNode
  subtitleNode?: React.ReactNode
  lat: number | null
  lon: number | null
  headerExtra?: React.ReactNode
  onClick?: () => void
  detailLabel?: string
  empty?: {
    title: string
    description?: string
    actions?: Array<{ label: string; onClick: () => void }>
  }
  detailLink?: string
  defaultExpanded?: boolean
}

export function WeatherCard({
  title,
  subtitle,
  titleNode,
  subtitleNode,
  lat,
  lon,
  headerExtra,
  empty,
  detailLink,
  defaultExpanded = false,
  onClick,
  detailLabel = '전체 보기',
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const forecast = useForecast(lat, lon)
  const todayMinMax = useMemo(
    () => (forecast.data ? getTodayMinMax(forecast.data) : null),
    [forecast.data],
  )

  if (lat === null || lon === null) {
    return (
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              {empty?.title ?? title}
            </h2>
            {empty?.description && (
              <p className="mt-1 text-sm text-slate-400">{empty.description}</p>
            )}
          </div>
        </div>
        {empty?.actions && empty.actions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {empty.actions.map((a) => (
              <Button
                key={a.label}
                variant="secondary"
                size="sm"
                onClick={a.onClick}
              >
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'p-4',
        onClick && 'cursor-pointer hover:border-slate-700 hover:bg-slate-900/60 active:scale-[0.99]',
      )}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return
        if (e.key === 'Enter' || e.key === ' ') onClick()
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {titleNode ? (
            titleNode
          ) : (
            <h2 className="truncate text-base font-semibold tracking-tight">
              {title}
            </h2>
          )}
          {subtitleNode
            ? subtitleNode
            : subtitle && subtitle !== title && (
                <p className="mt-1 truncate text-sm text-slate-500">
                  {subtitle}
                </p>
              )}
        </div>
        <div className="flex items-center gap-1">
          {headerExtra}
          {detailLink && (
            <Link
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
              to={detailLink}
              onClick={(e) => e.stopPropagation()}
              aria-label={detailLabel}
              title={detailLabel}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {forecast.isLoading && (
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
          <Spinner size="sm" />
          불러오는 중...
        </div>
      )}

      {forecast.isError && (
        <p className="mt-3 text-sm text-rose-300">
          해당 장소의 정보가 제공되지 않습니다.
        </p>
      )}

      {forecast.isSuccess && (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {/* 날씨 아이콘 + 현재 상태 */}
            <div className="flex items-center gap-3">
              <WeatherIcon
                code={forecast.data.current?.weather_code ?? 0}
                isDay={forecast.data.current?.is_day === 1}
                size="lg"
              />
              <div>
                <p className="text-xs text-slate-400">
                  {getWeatherLabel(forecast.data.current?.weather_code ?? 0)}
                </p>
                <p className="text-2xl font-bold tracking-tight text-slate-50">
                  {forecast.data.current?.temperature_2m ?? '-'}
                  <span className="text-lg font-normal text-slate-400">℃</span>
                </p>
              </div>
            </div>
            {todayMinMax && (
              <div className="rounded-xl bg-slate-800/50 px-4 py-2">
                <p className="text-xs text-slate-400">오늘</p>
                <p className="text-sm">
                  <span className="font-semibold text-blue-300">{todayMinMax.min}℃</span>
                  <span className="mx-1.5 text-slate-600">/</span>
                  <span className="font-semibold text-rose-300">{todayMinMax.max}℃</span>
                </p>
              </div>
            )}
          </div>

          {/* 시간대별 보기 토글 영역 */}
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 border-t border-slate-800 pt-3 text-sm text-slate-400 transition-colors hover:text-slate-200"
            onClick={(e) => {
              e.stopPropagation()
              setExpanded((v) => !v)
            }}
          >
            <span>{expanded ? '시간대별 접기' : '시간대별 보기'}</span>
            <svg
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                expanded && 'rotate-180',
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* 펼쳐진 시간대별 기온 */}
          <div
            className={cn(
              'grid transition-all duration-300 ease-in-out',
              expanded ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden">
              <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
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
          </div>
        </>
      )}
    </Card>
  )
}
