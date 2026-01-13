import { type HTMLAttributes } from 'react'

import { cn } from '../lib/cn'

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: 'text' | 'circular' | 'rectangular'
}

export function Skeleton({ className, variant = 'text', ...props }: Props) {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-800',
        variant === 'text' && 'h-4 rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-xl',
        className,
      )}
      {...props}
    />
  )
}

// 날씨 카드용 스켈레톤
export function WeatherCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* 날씨 아이콘 + 온도 스켈레톤 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* 아이콘 */}
          <Skeleton variant="circular" className="h-12 w-12" />
          <div className="flex flex-col gap-1.5">
            {/* 날씨 상태 텍스트 */}
            <Skeleton className="h-3 w-16" />
            {/* 온도 */}
            <Skeleton className="h-7 w-20" />
          </div>
        </div>
        {/* 오늘 최저/최고 */}
        <Skeleton variant="rectangular" className="h-12 w-24" />
      </div>

      {/* 하단 토글 영역 스켈레톤 */}
      <div className="border-t border-slate-800 pt-3">
        <Skeleton className="mx-auto h-4 w-28" />
      </div>
    </div>
  )
}

// 검색 결과 프리뷰용 스켈레톤
export function WeatherPreviewSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" className="h-8 w-8" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton variant="rectangular" className="ml-2 h-10 w-20" />
    </div>
  )
}
