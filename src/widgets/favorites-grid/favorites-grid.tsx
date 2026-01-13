import { type FavoritePlace } from '../../entities/place'

import { FavoriteCard } from './favorite-card'

type Props = {
  favorites: FavoritePlace[]
  onRename: (id: string, alias: string) => void
  onRemove: (id: string) => void
}

const delayClasses = [
  '',
  'animation-delay-100',
  'animation-delay-200',
  'animation-delay-300',
  'animation-delay-400',
  'animation-delay-500',
]

export function FavoritesGrid({ favorites, onRename, onRemove }: Props) {
  if (favorites.length === 0) {
    return (
      <p className="text-sm text-slate-400 animate-fade-in">
        즐겨찾기가 없습니다. (최대 6개)
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {favorites.map((p, index) => (
        <div
          key={p.id}
          className={`animate-on-load animate-fade-in-up ${delayClasses[index] ?? ''}`}
        >
          <FavoriteCard
            place={p}
            onRename={onRename}
            onRemove={onRemove}
          />
        </div>
      ))}
    </div>
  )
}
