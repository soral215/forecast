import { type SVGProps } from 'react'

import { cn } from '../../../shared/lib/cn'

type WeatherType =
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm'

type IconProps = SVGProps<SVGSVGElement> & {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

// WMO Weather interpretation codes (WW)
// https://open-meteo.com/en/docs
export function getWeatherType(code: number, isDay: boolean = true): WeatherType {
  if (code === 0) {
    return isDay ? 'clear-day' : 'clear-night'
  }
  if (code >= 1 && code <= 2) {
    return isDay ? 'partly-cloudy-day' : 'partly-cloudy-night'
  }
  if (code === 3) {
    return 'cloudy'
  }
  if (code >= 45 && code <= 48) {
    return 'fog'
  }
  if (code >= 51 && code <= 57) {
    return 'drizzle'
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return 'rain'
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return 'snow'
  }
  if (code >= 95 && code <= 99) {
    return 'thunderstorm'
  }
  return isDay ? 'clear-day' : 'clear-night'
}

export function getWeatherLabel(code: number): string {
  if (code === 0) return '맑음'
  if (code >= 1 && code <= 2) return '대체로 맑음'
  if (code === 3) return '흐림'
  if (code >= 45 && code <= 48) return '안개'
  if (code >= 51 && code <= 57) return '이슬비'
  if (code >= 61 && code <= 65) return '비'
  if (code >= 66 && code <= 67) return '진눈깨비'
  if (code >= 71 && code <= 77) return '눈'
  if (code >= 80 && code <= 82) return '소나기'
  if (code >= 85 && code <= 86) return '눈보라'
  if (code >= 95 && code <= 99) return '뇌우'
  return '맑음'
}

// 맑은 날 (낮)
function SunIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <circle cx="12" cy="12" r="5" className="fill-amber-400" />
      <g className="stroke-amber-400" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </svg>
  )
}

// 맑은 밤
function MoonIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        className="fill-slate-300 stroke-slate-400"
        strokeWidth="1"
      />
    </svg>
  )
}

// 구름 (부분적으로 흐림 - 낮)
function PartlyCloudyDayIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <circle cx="6" cy="6" r="3" className="fill-amber-400" />
      <g className="stroke-amber-400" strokeWidth="1.5" strokeLinecap="round">
        <line x1="6" y1="1" x2="6" y2="2" />
        <line x1="6" y1="10" x2="6" y2="11" />
        <line x1="1" y1="6" x2="2" y2="6" />
        <line x1="10" y1="6" x2="11" y2="6" />
        <line x1="2.46" y1="2.46" x2="3.17" y2="3.17" />
        <line x1="8.83" y1="8.83" x2="9.54" y2="9.54" />
        <line x1="2.46" y1="9.54" x2="3.17" y2="8.83" />
        <line x1="8.83" y1="3.17" x2="9.54" y2="2.46" />
      </g>
      <path
        d="M20 17a4 4 0 0 0-4-4 4 4 0 0 0-3.17 1.55A3 3 0 1 0 10 18h10a3 3 0 0 0 0-6"
        className="fill-slate-300 stroke-slate-400"
        strokeWidth="1"
      />
    </svg>
  )
}

// 구름 (부분적으로 흐림 - 밤)
function PartlyCloudyNightIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <path
        d="M10 4.79A5 5 0 1 1 5.21 0 4 4 0 0 0 10 4.79z"
        className="fill-slate-300 stroke-slate-400"
        strokeWidth="0.5"
        transform="translate(2, 2) scale(0.8)"
      />
      <path
        d="M20 17a4 4 0 0 0-4-4 4 4 0 0 0-3.17 1.55A3 3 0 1 0 10 18h10a3 3 0 0 0 0-6"
        className="fill-slate-400 stroke-slate-500"
        strokeWidth="1"
      />
    </svg>
  )
}

// 흐림
function CloudyIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <path
        d="M18 10a4 4 0 0 0-4-4 4 4 0 0 0-3.17 1.55A3 3 0 1 0 8 11h10a3 3 0 0 0 0-6"
        className="fill-slate-400 stroke-slate-500"
        strokeWidth="1"
      />
      <path
        d="M20 17a4 4 0 0 0-4-4 4 4 0 0 0-3.17 1.55A3 3 0 1 0 10 18h10a3 3 0 0 0 0-6"
        className="fill-slate-300 stroke-slate-400"
        strokeWidth="1"
      />
    </svg>
  )
}

// 안개
function FogIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <path
        d="M20 10a4 4 0 0 0-4-4 4 4 0 0 0-3.17 1.55A3 3 0 1 0 10 11h10a3 3 0 0 0 0-6"
        className="fill-slate-400 stroke-slate-500"
        strokeWidth="1"
      />
      <g className="stroke-slate-400" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="5" y1="19" x2="19" y2="19" />
      </g>
    </svg>
  )
}

// 이슬비
function DrizzleIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <path
        d="M20 10a4 4 0 0 0-4-4 4 4 0 0 0-3.17 1.55A3 3 0 1 0 10 11h10a3 3 0 0 0 0-6"
        className="fill-slate-400 stroke-slate-500"
        strokeWidth="1"
      />
      <g className="stroke-sky-400" strokeWidth="1.5" strokeLinecap="round">
        <line x1="8" y1="14" x2="8" y2="16" />
        <line x1="12" y1="15" x2="12" y2="17" />
        <line x1="16" y1="14" x2="16" y2="16" />
        <line x1="10" y1="18" x2="10" y2="20" />
        <line x1="14" y1="19" x2="14" y2="21" />
      </g>
    </svg>
  )
}

// 비
function RainIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <path
        d="M20 10a4 4 0 0 0-4-4 4 4 0 0 0-3.17 1.55A3 3 0 1 0 10 11h10a3 3 0 0 0 0-6"
        className="fill-slate-500 stroke-slate-600"
        strokeWidth="1"
      />
      <g className="stroke-blue-400" strokeWidth="2" strokeLinecap="round">
        <line x1="8" y1="14" x2="8" y2="18" />
        <line x1="12" y1="15" x2="12" y2="21" />
        <line x1="16" y1="14" x2="16" y2="19" />
      </g>
    </svg>
  )
}

// 눈
function SnowIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <path
        d="M20 10a4 4 0 0 0-4-4 4 4 0 0 0-3.17 1.55A3 3 0 1 0 10 11h10a3 3 0 0 0 0-6"
        className="fill-slate-400 stroke-slate-500"
        strokeWidth="1"
      />
      <g className="fill-sky-200">
        <circle cx="8" cy="15" r="1.5" />
        <circle cx="12" cy="17" r="1.5" />
        <circle cx="16" cy="15" r="1.5" />
        <circle cx="10" cy="20" r="1.5" />
        <circle cx="14" cy="21" r="1.5" />
      </g>
    </svg>
  )
}

// 뇌우
function ThunderstormIcon({ size = 'md', className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <path
        d="M20 10a4 4 0 0 0-4-4 4 4 0 0 0-3.17 1.55A3 3 0 1 0 10 11h10a3 3 0 0 0 0-6"
        className="fill-slate-600 stroke-slate-700"
        strokeWidth="1"
      />
      <path
        d="M13 12l-3 6h4l-2 5 5-7h-4l2-4z"
        className="fill-amber-400 stroke-amber-500"
        strokeWidth="0.5"
      />
    </svg>
  )
}

type WeatherIconProps = IconProps & {
  code: number
  isDay?: boolean
}

export function WeatherIcon({ code, isDay = true, ...props }: WeatherIconProps) {
  const type = getWeatherType(code, isDay)

  switch (type) {
    case 'clear-day':
      return <SunIcon {...props} />
    case 'clear-night':
      return <MoonIcon {...props} />
    case 'partly-cloudy-day':
      return <PartlyCloudyDayIcon {...props} />
    case 'partly-cloudy-night':
      return <PartlyCloudyNightIcon {...props} />
    case 'cloudy':
      return <CloudyIcon {...props} />
    case 'fog':
      return <FogIcon {...props} />
    case 'drizzle':
      return <DrizzleIcon {...props} />
    case 'rain':
      return <RainIcon {...props} />
    case 'snow':
      return <SnowIcon {...props} />
    case 'thunderstorm':
      return <ThunderstormIcon {...props} />
    default:
      return <SunIcon {...props} />
  }
}
