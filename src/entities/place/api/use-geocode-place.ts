import { useQuery } from '@tanstack/react-query'

import { geocodeKoreaByName, toGeocodingQuery } from './open-meteo-geocoding'

export function useGeocodePlace(full: string | null) {
  return useQuery({
    queryKey: ['geocode', full],
    enabled: Boolean(full),
    queryFn: async () => {
      const q = toGeocodingQuery(full!)
      return await geocodeKoreaByName(q)
    },
  })
}
