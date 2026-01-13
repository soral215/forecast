import { getWeatherType } from './weather-icon'

export type WeatherTheme = {
  gradient: string
  textColor: string
  cardBg: string
  cardBorder: string
}

// 날씨와 시간에 따른 배경 테마
export function getWeatherTheme(weatherCode: number, isDay: boolean): WeatherTheme {
  const type = getWeatherType(weatherCode, isDay)

  switch (type) {
    case 'clear-day':
      return {
        gradient: 'from-sky-400 via-blue-500 to-blue-600',
        textColor: 'text-white',
        cardBg: 'bg-white/20 backdrop-blur-md',
        cardBorder: 'border-white/30',
      }

    case 'clear-night':
      return {
        gradient: 'from-indigo-900 via-purple-900 to-slate-900',
        textColor: 'text-white',
        cardBg: 'bg-white/10 backdrop-blur-md',
        cardBorder: 'border-white/20',
      }

    case 'partly-cloudy-day':
      return {
        gradient: 'from-sky-300 via-blue-400 to-slate-400',
        textColor: 'text-white',
        cardBg: 'bg-white/25 backdrop-blur-md',
        cardBorder: 'border-white/30',
      }

    case 'partly-cloudy-night':
      return {
        gradient: 'from-slate-700 via-indigo-800 to-slate-900',
        textColor: 'text-white',
        cardBg: 'bg-white/10 backdrop-blur-md',
        cardBorder: 'border-white/20',
      }

    case 'cloudy':
      return {
        gradient: 'from-slate-400 via-slate-500 to-slate-600',
        textColor: 'text-white',
        cardBg: 'bg-white/20 backdrop-blur-md',
        cardBorder: 'border-white/25',
      }

    case 'fog':
      return {
        gradient: 'from-slate-300 via-slate-400 to-slate-500',
        textColor: 'text-slate-800',
        cardBg: 'bg-white/30 backdrop-blur-md',
        cardBorder: 'border-white/40',
      }

    case 'drizzle':
      return {
        gradient: 'from-slate-500 via-blue-600 to-slate-700',
        textColor: 'text-white',
        cardBg: 'bg-white/15 backdrop-blur-md',
        cardBorder: 'border-white/20',
      }

    case 'rain':
      return {
        gradient: 'from-slate-600 via-blue-700 to-slate-800',
        textColor: 'text-white',
        cardBg: 'bg-white/15 backdrop-blur-md',
        cardBorder: 'border-white/20',
      }

    case 'snow':
      return {
        gradient: 'from-slate-200 via-blue-200 to-slate-300',
        textColor: 'text-slate-800',
        cardBg: 'bg-white/40 backdrop-blur-md',
        cardBorder: 'border-white/50',
      }

    case 'thunderstorm':
      return {
        gradient: 'from-slate-800 via-purple-900 to-slate-900',
        textColor: 'text-white',
        cardBg: 'bg-white/10 backdrop-blur-md',
        cardBorder: 'border-white/15',
      }

    default:
      return {
        gradient: 'from-sky-400 via-blue-500 to-blue-600',
        textColor: 'text-white',
        cardBg: 'bg-white/20 backdrop-blur-md',
        cardBorder: 'border-white/30',
      }
  }
}

// 기본 테마 (로딩 중이거나 데이터 없을 때)
export function getDefaultTheme(): WeatherTheme {
  return {
    gradient: 'from-slate-800 via-slate-900 to-slate-950',
    textColor: 'text-white',
    cardBg: 'bg-white/10 backdrop-blur-md',
    cardBorder: 'border-white/20',
  }
}
