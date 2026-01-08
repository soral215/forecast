import { useQuery } from '@tanstack/react-query'

import { geocodeKoreaByName, toGeocodingQueries } from './open-meteo-geocoding'

export function useGeocodePlace(full: string | null) {
  return useQuery({
    queryKey: ['geocode', full],
    enabled: Boolean(full),
    queryFn: async () => {
      const queries = toGeocodingQueries(full!)
      for (const q of queries) {
        const results = await geocodeKoreaByName(q)
        if (results.length > 0) return results
      }
      return []
    },
  })
}
