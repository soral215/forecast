import { useState } from 'react'

import { CurrentLocationWeather } from '../../widgets/current-location-weather'
import { FavoritesSection } from '../../widgets/favorites-section'
import { SelectedPlaceWeather } from '../../widgets/selected-place-weather'
import { Button } from '../../shared/ui'
import { SearchModal } from '../../features/search-modal'

export function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-full bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">날씨</h1>
            <p className="mt-1 text-sm text-slate-400">
              현재 위치 또는 원하는 장소를 검색해 확인하세요.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSearchOpen(true)}
          >
            검색
          </Button>
        </header>

        <CurrentLocationWeather onOpenSearch={() => setSearchOpen(true)} />

        <FavoritesSection />
        {/* <SelectedPlaceWeather /> */}

        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </div>
  )
}
