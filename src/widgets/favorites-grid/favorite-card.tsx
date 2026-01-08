import { Link } from 'react-router-dom'

import { type FavoritePlace } from '../../entities/place'
import { getTodayMinMax, useForecast } from '../../entities/weather'
import { Card, Spinner } from '../../shared/ui'

type Props = {
  place: FavoritePlace
}

export function FavoriteCard({ place }: Props) {
  const forecast = useForecast(place.lat, place.lon)
  const todayMinMax = forecast.data ? getTodayMinMax(forecast.data) : null

  return (
    <Link
      to={`/place?lat=${place.lat}&lon=${place.lon}&name=${encodeURIComponent(place.alias)}`}
    >
      <Card className="p-4 hover:border-slate-700">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-50">{place.alias}</p>
            <p className="mt-1 text-xs text-slate-500">{place.fullName}</p>
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
        )}
      </Card>
    </Link>
  )
}
