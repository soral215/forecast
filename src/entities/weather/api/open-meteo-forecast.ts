import { fetchJson } from '../../../shared/api/fetch-json'

export type OpenMeteoForecastResponse = {
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
  current?: {
    time: string
    temperature_2m: number
  }
  hourly?: {
    time: string[]
    temperature_2m: number[]
  }
  daily?: {
    time: string[]
    temperature_2m_min: number[]
    temperature_2m_max: number[]
  }
}

export async function fetchForecast(params: { lat: number; lon: number }) {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(params.lat))
  url.searchParams.set('longitude', String(params.lon))
  url.searchParams.set('timezone', 'Asia/Seoul')
  url.searchParams.set('current', 'temperature_2m')
  url.searchParams.set('hourly', 'temperature_2m')
  url.searchParams.set('daily', 'temperature_2m_min,temperature_2m_max')

  return await fetchJson<OpenMeteoForecastResponse>(url)
}
