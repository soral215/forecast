import { useCallback, useEffect, useMemo, useState } from 'react'

import { loadFavorites, saveFavorites } from './favorites-storage'
import { type FavoritePlace } from '../model/favorite-place'

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePlace[]>(() =>
    loadFavorites(),
  )

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  const ids = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites])

  const isFavorite = useCallback((id: string) => ids.has(id), [ids])

  const addFavorite = useCallback((place: FavoritePlace) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === place.id)) return prev
      if (prev.length >= 6) return prev
      return [...prev, place]
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const renameFavorite = useCallback((id: string, alias: string) => {
    setFavorites((prev) => prev.map((p) => (p.id === id ? { ...p, alias } : p)))
  }, [])

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    renameFavorite,
    max: 6,
  }
}
