import { type OpenMeteoForecastResponse } from '../api/open-meteo-forecast'

export function getTodayMinMax(data: OpenMeteoForecastResponse) {
  const daily = data.daily
  if (!daily) return null

  const min = daily.temperature_2m_min?.[0]
  const max = daily.temperature_2m_max?.[0]
  if (typeof min !== 'number' || typeof max !== 'number') return null
  return { min, max }
}

export function getNext24hHourlyTemps(data: OpenMeteoForecastResponse) {
  const hourly = data.hourly
  if (!hourly) return []

  const times = hourly.time ?? []
  const temps = hourly.temperature_2m ?? []
  const len = Math.min(times.length, temps.length)
  if (len === 0) return []

  const nowIso = data.current?.time
  const startIdx = nowIso ? Math.max(0, times.indexOf(nowIso)) : 0

  return Array.from({ length: Math.min(24, len - startIdx) }, (_, i) => {
    const idx = startIdx + i
    return { time: times[idx], temp: temps[idx] }
  })
}
