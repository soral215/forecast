import { FavoritesGrid } from '../favorites-grid'
import { useFavorites } from '../../features/favorites'

export function FavoritesSection() {
  const fav = useFavorites()

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight">즐겨찾기</h2>
          <p className="mt-1 text-sm opacity-70">
            최대 {fav.max}개까지 등록할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <FavoritesGrid
          favorites={fav.favorites}
          onRename={fav.renameFavorite}
          onRemove={fav.removeFavorite}
        />
      </div>
    </section>
  )
}
