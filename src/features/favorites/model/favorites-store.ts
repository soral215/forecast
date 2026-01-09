import { useSyncExternalStore } from 'react'

import {
  loadFavorites,
  saveFavorites,
} from '../../../entities/place/lib/favorites-storage'
import { type FavoritePlace } from '../../../entities/place/model/favorite-place'

type Listener = () => void

const listeners = new Set<Listener>()
let state: FavoritePlace[] = loadFavorites()

function emit() {
  for (const l of listeners) l()
}

function setState(next: FavoritePlace[]) {
  state = next
  saveFavorites(state)
  emit()
}

// 다른 탭과 동기화(선택)
window.addEventListener('storage', (e) => {
  if (e.key !== 'favoritePlaces') return
  state = loadFavorites()
  emit()
})

export function useFavoritesStore() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => state,
  )
}

export function favoritesActions() {
  const max = 6

  return {
    max,
    isFavorite(id: string) {
      return state.some((f) => f.id === id)
    },
    add(place: FavoritePlace) {
      if (state.some((p) => p.id === place.id)) return
      if (state.length >= max) return
      setState([...state, place])
    },
    remove(id: string) {
      setState(state.filter((p) => p.id !== id))
    },
    rename(id: string, alias: string) {
      setState(state.map((p) => (p.id === id ? { ...p, alias } : p)))
    },
  }
}

