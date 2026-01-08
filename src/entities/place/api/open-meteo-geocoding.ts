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

export function toGeocodingQuery(full: string) {
  // 예: "서울특별시-종로구-청운동" -> "서울특별시 종로구 청운동 대한민국"
  return `${full.replaceAll('-', ' ')} 대한민국`.trim()
}

export async function geocodeKoreaByName(name: string) {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.searchParams.set('name', name)
  url.searchParams.set('count', '10')
  url.searchParams.set('language', 'ko')
  url.searchParams.set('format', 'json')
  url.searchParams.set('country', 'KR')

  const data = await fetchJson<OpenMeteoGeocodingResponse>(url)
  return data.results ?? []
}
