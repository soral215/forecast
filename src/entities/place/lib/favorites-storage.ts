import { readJson, writeJson } from '../../../shared/lib/storage'

import { type FavoritePlace } from '../model/favorite-place'

const KEY = 'favoritePlaces'

function isFavoritePlace(value: unknown): value is FavoritePlace {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.fullName === 'string' &&
    typeof v.alias === 'string' &&
    typeof v.lat === 'number' &&
    typeof v.lon === 'number'
  )
}

export function loadFavorites(): FavoritePlace[] {
  const raw = readJson<unknown>(KEY)
  if (!Array.isArray(raw)) return []
  return raw.filter(isFavoritePlace)
}

export function saveFavorites(list: FavoritePlace[]) {
  writeJson(KEY, list)
}

