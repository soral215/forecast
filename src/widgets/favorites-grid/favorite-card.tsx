import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type FavoritePlace } from '../../entities/place'
import { getTodayMinMax, useForecast } from '../../entities/weather'
import { Button, Card, Input, Spinner } from '../../shared/ui'

type Props = {
  place: FavoritePlace
  onRename: (id: string, alias: string) => void
  onRemove: (id: string) => void
}

export function FavoriteCard({ place, onRename, onRemove }: Props) {
  const forecast = useForecast(place.lat, place.lon)
  const todayMinMax = forecast.data ? getTodayMinMax(forecast.data) : null
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(place.alias)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!isEditing) return
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [isEditing])

  const goDetail = () => {
    navigate(
      `/place?lat=${place.lat}&lon=${place.lon}&name=${encodeURIComponent(
        place.alias,
      )}`,
    )
  }

  const save = () => {
    const next = draft.trim()
    onRename(place.id, next.length ? next : place.fullName)
    setIsEditing(false)
  }

  return (
    <Card
      className="cursor-pointer p-4 hover:border-slate-700"
      onClick={() => {
        if (isEditing) return
        goDetail()
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (isEditing) return
        if (e.key === 'Enter' || e.key === ' ') goDetail()
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') save()
                  if (e.key === 'Escape') setIsEditing(false)
                }}
                onClick={(e) => e.stopPropagation()}
                placeholder="별칭 입력"
              />
              <Button
                size="sm"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation()
                  save()
                }}
              >
                저장
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditing(false)
                }}
              >
                취소
              </Button>
            </div>
          ) : (
            <>
              <p className="truncate text-sm font-semibold text-slate-50">
                {place.alias}
              </p>
              <p className="mt-1 truncate text-xs text-slate-500">
                {place.fullName}
              </p>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                setDraft(place.alias)
                setIsEditing(true)
              }}
            >
              수정
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                onRemove(place.id)
              }}
            >
              삭제
            </Button>
          </div>
        )}
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
              오늘: <span className="font-semibold">{todayMinMax.min}℃</span> /{' '}
              <span className="font-semibold">{todayMinMax.max}℃</span>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
