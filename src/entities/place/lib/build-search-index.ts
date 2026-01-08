import districts from '../../../shared/assets/korea_districts.json'

import { normalizeDistrictText } from './normalize-district'
import { type PlaceCandidate, type PlaceDepth } from '../model/types'

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

export function buildSearchIndex(): PlaceCandidate[] {
  // districts is a string[] (e.g. "서울특별시-종로구-청운동")
  return (districts as string[])
    .map(toCandidate)
    .filter((v): v is PlaceCandidate => v !== null)
}
