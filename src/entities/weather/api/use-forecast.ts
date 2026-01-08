import { useQuery } from '@tanstack/react-query'

import { fetchForecast } from './open-meteo-forecast'

export function useForecast(lat: number | null, lon: number | null) {
  return useQuery({
    queryKey: ['forecast', lat, lon],
    enabled: lat !== null && lon !== null,
    queryFn: () => fetchForecast({ lat: lat!, lon: lon! }),
  })
}
