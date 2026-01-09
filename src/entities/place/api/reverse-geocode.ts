import { fetchJson } from '../../../shared/api/fetch-json'

export type ReverseGeocodeResponse = {
  latitude: number
  longitude: number
  countryName?: string
  countryCode?: string
  principalSubdivision?: string
  city?: string
  locality?: string
  postcode?: string
}

export async function reverseGeocodeByCoords(params: {
  lat: number
  lon: number
}) {
  const url = new URL(
    'https://api.bigdatacloud.net/data/reverse-geocode-client',
  )
  url.searchParams.set('latitude', String(params.lat))
  url.searchParams.set('longitude', String(params.lon))
  url.searchParams.set('localityLanguage', 'ko')

  return await fetchJson<ReverseGeocodeResponse>(url)
}

export function formatKoreanPlaceName(data: ReverseGeocodeResponse) {
  // 가능한 한 사용자가 익숙한 순서로 조합
  // 예: 서울특별시 중구 명동
  const parts = [
    data.principalSubdivision,
    data.city && data.city !== data.principalSubdivision
      ? data.city
      : undefined,
    data.locality,
  ].filter(Boolean)

  if (parts.length > 0) return parts.join(' ')
  return undefined
}

