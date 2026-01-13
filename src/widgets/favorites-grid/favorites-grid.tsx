import { type FavoritePlace } from '../../entities/place'

import { FavoriteCard } from './favorite-card'

type Props = {
  favorites: FavoritePlace[]
  onRename: (id: string, alias: string) => void
  onRemove: (id: string) => void
  onOpenSearch?: () => void
}

const delayClasses = [
  '',
  'animation-delay-100',
  'animation-delay-200',
  'animation-delay-300',
  'animation-delay-400',
  'animation-delay-500',
]

export function FavoritesGrid({ favorites, onRename, onRemove, onOpenSearch }: Props) {
  if (favorites.length === 0) {
    return (
      <div className="animate-fade-in rounded-2xl border border-dashed border-white/30 bg-white/5 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <svg className="h-6 w-6 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </div>
        <p className="text-sm opacity-70">즐겨찾기가 없습니다</p>
        <p className="mt-1 text-xs opacity-50">최대 6개까지 등록할 수 있어요</p>
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/30"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            장소 검색하기
          </button>
        )}
      </div>
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
