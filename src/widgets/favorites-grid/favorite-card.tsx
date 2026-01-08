import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type FavoritePlace } from '../../entities/place'
import { RenameFavoriteInline } from '../../features/rename-favorite'
import { Button } from '../../shared/ui'
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
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              수정
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemove(place.id)}
            >
              삭제
            </Button>
          </div>
        )
      }
    />
  )
}
