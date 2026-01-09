import { useCallback, useMemo } from 'react'

import { type FavoritePlace } from '../../../entities/place/model/favorite-place'
import { favoritesActions, useFavoritesStore } from './favorites-store'

export function useFavorites() {
  const favorites = useFavoritesStore()
  const actions = useMemo(() => favoritesActions(), [])

  const isFavorite = useCallback(
    (id: string) => actions.isFavorite(id),
    [actions],
  )
  const addFavorite = useCallback(
    (p: FavoritePlace) => actions.add(p),
    [actions],
  )
  const removeFavorite = useCallback(
    (id: string) => actions.remove(id),
    [actions],
  )
  const renameFavorite = useCallback(
    (id: string, alias: string) => actions.rename(id, alias),
    [actions],
  )

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    renameFavorite,
    max: actions.max,
  }
}
