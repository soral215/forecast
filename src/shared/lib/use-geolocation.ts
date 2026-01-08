import { useCallback, useEffect, useState } from 'react'

type Coords = { latitude: number; longitude: number }

type GeoState =
  | { status: 'idle'; coords: null; error: null }
  | { status: 'loading'; coords: null; error: null }
  | { status: 'success'; coords: Coords; error: null }
  | { status: 'error'; coords: null; error: GeolocationPositionError | Error }

export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<GeoState>({
    status: 'idle',
    coords: null,
    error: null,
  })

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setState({
        status: 'error',
        coords: null,
        error: new Error('Geolocation is not supported'),
      })
      return
    }

    setState({ status: 'loading', coords: null, error: null })

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: 'success',
          coords: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          error: null,
        })
      },
      (err) => {
        setState({ status: 'error', coords: null, error: err })
      },
      options,
    )
  }, [options])

  // 첫 진입 시 1회 시도
  useEffect(() => {
    // eslint(react-hooks/set-state-in-effect) 회피: effect 본문에서 request를 직접 호출하지 않음
    const id = window.setTimeout(() => request(), 0)
    return () => window.clearTimeout(id)
  }, [request])

  return { ...state, request }
}
