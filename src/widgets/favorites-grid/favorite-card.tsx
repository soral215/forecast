import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type FavoritePlace } from '../../entities/place'
import { RenameFavoriteInline } from '../../features/rename-favorite'
import { WeatherCard } from '../weather-card'

type Props = {
  place: FavoritePlace
  onRename: (id: string, alias: string) => void
  onRemove: (id: string) => void
}

export function FavoriteCard({ place, onRename, onRemove }: Props) {
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)

  const goDetail = () => {
    navigate(
      `/place?lat=${place.lat}&lon=${place.lon}&name=${encodeURIComponent(
        place.alias,
      )}`,
    )
  }

  return (
    <WeatherCard
      title={place.alias}
      subtitle={place.fullName}
      titleNode={
        isEditing ? (
          <RenameFavoriteInline
            initialValue={place.alias}
            fallbackValue={place.fullName}
            onSave={(next) => {
              onRename(place.id, next)
              setIsEditing(false)
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <h2 className="truncate text-base font-semibold tracking-tight">
            {place.alias}
          </h2>
        )
      }
      lat={place.lat}
      lon={place.lon}
      onClick={isEditing ? undefined : goDetail}
      detailLink={`/place?lat=${place.lat}&lon=${place.lon}&name=${encodeURIComponent(
        place.alias,
      )}`}
      headerExtra={
        isEditing ? null : (
          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="rounded-lg p-2 opacity-70 transition-colors hover:bg-white/20 hover:opacity-100"
              onClick={() => setIsEditing(true)}
              aria-label="이름 수정"
              title="이름 수정"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button
              className="rounded-lg p-2 opacity-70 transition-colors hover:bg-rose-500/30 hover:opacity-100"
              onClick={() => onRemove(place.id)}
              aria-label="삭제"
              title="삭제"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )
      }
    />
  )
}
