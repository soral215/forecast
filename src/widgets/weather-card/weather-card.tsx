import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getNext24hHourlyTemps,
  getTodayMinMax,
  useForecast,
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
      className={cn(expanded ? 'p-6' : 'p-4', onClick && 'cursor-pointer')}
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
            : subtitle && (
                <p className="mt-1 truncate text-sm text-slate-500">
                  {subtitle}
                </p>
              )}
        </div>
        <div className="flex items-center gap-2">
          {headerExtra}
          {detailLink && (
            <Link
              className="text-sm text-indigo-300 hover:text-indigo-200"
              to={detailLink}
              onClick={(e) => e.stopPropagation()}
            >
              상세
            </Link>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setExpanded((v) => !v)
            }}
          >
            {expanded ? '접기' : '더보기'}
          </Button>
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
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-200">
            <div className="rounded-xl bg-slate-950/40 px-3 py-2">
              현재:{' '}
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

          {expanded && (
            <div className="mt-6">
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
          )}
        </>
      )}
    </Card>
  )
}
