import { useQuery } from '@tanstack/react-query'

import { reverseGeocodeByCoords } from './reverse-geocode'

export function useReverseGeocode(lat: number | null, lon: number | null) {
  return useQuery({
    queryKey: ['reverseGeocode', lat, lon],
    enabled: lat !== null && lon !== null,
    queryFn: () => reverseGeocodeByCoords({ lat: lat!, lon: lon! }),
    staleTime: 1000 * 60 * 60 * 24, // 24h
  })
}

