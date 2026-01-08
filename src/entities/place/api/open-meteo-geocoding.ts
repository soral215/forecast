import { fetchJson } from '../../../shared/api/fetch-json'

export type OpenMeteoGeocodingResult = {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation?: number
  feature_code?: string
  country_code?: string
  admin1?: string
  admin2?: string
  admin3?: string
  admin4?: string
  timezone?: string
  population?: number
  postcodes?: string[]
  country?: string
}

export type OpenMeteoGeocodingResponse = {
  results?: OpenMeteoGeocodingResult[]
  generationtime_ms?: number
}

function stripSidoSuffix(value: string) {
  // 예: "서울특별시" -> "서울"
  return value
    .replace(/특별자치도$/u, '')
    .replace(/특별자치시$/u, '')
    .replace(/자치도$/u, '')
    .replace(/광역시$/u, '')
    .replace(/특별시$/u, '')
    .trim()
}

export function toGeocodingQueries(full: string) {
  // Open-Meteo 지오코딩은 "대한민국" suffix가 붙으면 0건이 되는 케이스가 있음(예: 서울특별시 대한민국).
  const parts = full.split('-').filter(Boolean)
  const queries: string[] = []

  if (parts.length === 0) return queries

  // 가장 구체 -> 상위로 폴백
  queries.push(parts.join(' '))
  if (parts.length >= 2) queries.push(parts.slice(0, 2).join(' '))
  queries.push(parts[0])

  const stripped = stripSidoSuffix(parts[0])
  if (stripped && stripped !== parts[0]) queries.push(stripped)

  return Array.from(new Set(queries)).filter(Boolean)
}

export async function geocodeKoreaByName(name: string) {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.searchParams.set('name', name)
  url.searchParams.set('count', '10')
  url.searchParams.set('language', 'ko')
  url.searchParams.set('format', 'json')
  url.searchParams.set('country_code', 'KR')

  const data = await fetchJson<OpenMeteoGeocodingResponse>(url)
  return data.results ?? []
}
