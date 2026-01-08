import { normalizeDistrictText } from './normalize-district'
import { type PlaceCandidate, type PlaceDepth } from '../model/types'

// Vite will emit this JSON as an asset (not inline into JS) when imported with ?url
import districtsUrl from '../../../shared/assets/korea_districts.json?url'

function toCandidate(full: string): PlaceCandidate | null {
  const parts = full.split('-').filter(Boolean)
  const depth = parts.length as PlaceDepth
  if (depth < 1 || depth > 3) return null

  const [sido, sigungu, dong] = parts

  return {
    full,
    normalized: normalizeDistrictText(full),
    depth,
    sido,
    sigungu,
    dong,
  }
}

let cache: Promise<PlaceCandidate[]> | null = null

async function fetchDistricts(): Promise<string[]> {
  const res = await fetch(districtsUrl)
  if (!res.ok) throw new Error(`Failed to load districts: HTTP ${res.status}`)
  const data = (await res.json()) as unknown
  if (!Array.isArray(data)) throw new Error('Invalid districts json')
  return data as string[]
}

export function loadSearchIndex(): Promise<PlaceCandidate[]> {
  if (!cache) {
    cache = fetchDistricts().then((list) =>
      list.map(toCandidate).filter((v): v is PlaceCandidate => v !== null),
    )
  }
  return cache
}
