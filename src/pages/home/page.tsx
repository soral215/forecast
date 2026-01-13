import { useMemo, useState } from 'react'

import { CurrentLocationWeather } from '../../widgets/current-location-weather'
import { FavoritesSection } from '../../widgets/favorites-section'
import { Button } from '../../shared/ui'
import { SearchModal } from '../../features/search-modal'
import { useGeolocation } from '../../shared/lib/use-geolocation'
import { getDefaultTheme, getWeatherTheme, useForecast } from '../../entities/weather'
import { cn } from '../../shared/lib/cn'

export function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)

  // 현재 위치 날씨로 배경 테마 결정
  const geoOptions = useMemo(() => ({ enableHighAccuracy: false, timeout: 8000 }), [])
  const geo = useGeolocation(geoOptions)
  const forecast = useForecast(
    geo.coords?.latitude ?? null,
    geo.coords?.longitude ?? null,
  )

  const defaultTheme = getDefaultTheme()
  const weatherTheme = useMemo(() => {
    if (!forecast.data?.current) return null
    return getWeatherTheme(
      forecast.data.current.weather_code,
      forecast.data.current.is_day === 1,
    )
  }, [forecast.data])

  const theme = weatherTheme ?? defaultTheme
  const isLoaded = !!weatherTheme

  return (
    <div
      className={cn(
        'min-h-full transition-colors duration-1000',
        theme.textColor,
      )}
    >
      {/* 기본 배경 (항상 표시) */}
      <div
        className={cn(
          'fixed inset-0 -z-20 bg-gradient-to-b',
          defaultTheme.gradient,
        )}
      />

      {/* 날씨 기반 배경 (데이터 로드 후 fade-in) */}
      <div
        className={cn(
          'fixed inset-0 -z-10 bg-gradient-to-b transition-opacity duration-[1200ms] ease-in-out',
          isLoaded ? 'opacity-100' : 'opacity-0',
          weatherTheme?.gradient ?? defaultTheme.gradient,
        )}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="animate-on-load animate-fade-in-down flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">날씨</h1>
            <p className="mt-1 text-sm opacity-80">
              현재 위치 또는 원하는 장소를 검색해 확인하세요.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className="bg-white/20 text-white hover:bg-white/30 border-white/30"
          >
            검색
          </Button>
        </header>

        <div className="animate-on-load animate-fade-in-up animation-delay-100">
          <CurrentLocationWeather onOpenSearch={() => setSearchOpen(true)} />
        </div>

        <div className="animate-on-load animate-fade-in-up animation-delay-200">
          <FavoritesSection onOpenSearch={() => setSearchOpen(true)} />
        </div>

        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </div>
  )
}
