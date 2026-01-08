import { type FavoritePlace } from '../../entities/place'

import { FavoriteCard } from './favorite-card'

type Props = {
  favorites: FavoritePlace[]
}

export function FavoritesGrid({ favorites }: Props) {
  if (favorites.length === 0) {
    return (
      <p className="text-sm text-slate-400">즐겨찾기가 없습니다. (최대 6개)</p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {favorites.map((p) => (
        <FavoriteCard key={p.id} place={p} />
      ))}
    </div>
  )
}
