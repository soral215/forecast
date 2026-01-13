import { FavoritesGrid } from '../favorites-grid'
import { useFavorites } from '../../features/favorites'

type Props = {
  onOpenSearch?: () => void
}

export function FavoritesSection({ onOpenSearch }: Props) {
  const fav = useFavorites()

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight">즐겨찾기</h2>
          {fav.favorites.length > 0 && (
            <p className="mt-1 text-sm opacity-70">
              {fav.favorites.length}/{fav.max}개 등록됨
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <FavoritesGrid
          favorites={fav.favorites}
          onRename={fav.renameFavorite}
          onRemove={fav.removeFavorite}
          onOpenSearch={onOpenSearch}
        />
      </div>
    </section>
  )
}
