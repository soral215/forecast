# 날씨 앱 (Weather App)

React + TypeScript로 구현한 **대한민국 주소 검색 기반 날씨 앱**입니다.  
Open-Meteo API(지오코딩 + 날씨)와 TanStack Query를 사용해 데이터 조회/캐싱을 처리합니다.

![Preview](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple)

## 🚀 프로젝트 실행 방법

### 요구사항

- Node.js: **20.19+** 권장 (Vite 요구사항)

### 로컬 실행

```bash
npm install
npm run dev
```

### 빌드/검증

```bash
npm run format   # 코드 포맷팅
npm run lint     # 린트 검사
npm run build    # 프로덕션 빌드
```

## ✨ 주요 기능

### 🌤️ 현재 위치 날씨
- 브라우저 위치 권한 요청 후 **현재 기온 + 오늘 최저/최고** 표시
- **날씨 아이콘** 및 **날씨 상태**(맑음, 흐림, 비, 눈 등) 표시
- 권한 거부/오류 시 안내 문구 및 재시도 버튼 제공
- 카드 클릭 시 상세 페이지로 이동

### 🔍 장소 검색
- `korea_districts.json` 기반 **시/도/구/동** 자동완성 검색 (최대 20개)
- 검색 결과에서 **별표(☆) 클릭으로 즐겨찾기 바로 추가**
- 선택한 장소의 날씨 미리보기 제공
- 모달 상단 고정으로 안정적인 UX

### ⭐ 즐겨찾기 (최대 6개)
- localStorage 기반 데이터 저장
- 즐겨찾기 카드에 **현재 날씨 + 오늘 최저/최고** 표시
- **별칭(이름) 수정** 가능
- 즐겨찾기 없을 때 검색 유도 UI 제공
- 상세 페이지에서도 즐겨찾기 추가/삭제 가능

### 📊 상세 페이지
- **현재 기온** + 날씨 아이콘
- **오늘 최저/최고** 온도
- **시간대별 기온** (다음 24시간)
- **일별 최저/최고** (7일 예보)

## 🎨 UI/UX 특징

### 동적 배경
- 날씨 상태(맑음, 흐림, 비, 눈 등)에 따른 **그라디언트 배경**
- 낮/밤 구분으로 시간대에 맞는 분위기 연출
- 부드러운 fade-in 전환 효과 (2초)

### 애니메이션
- 페이지 진입 시 **staggered fade-in** 애니메이션
- 카드 hover/active 상태 피드백
- 버튼 클릭 시 scale 효과

### Glassmorphism 카드
- 반투명 배경 + backdrop-blur 효과
- 배경과 조화로운 border 처리

### 스켈레톤 로딩
- 날씨 데이터 로딩 중 스켈레톤 UI 표시
- 로딩 상태에서도 일관된 레이아웃 유지

### 반응형 디자인
- 모바일: 모달 하단 정렬, 4열 시간대별 그리드
- 데스크톱: 모달 상단 정렬, 8열 시간대별 그리드

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | React 18, TypeScript 5 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Data Fetching | TanStack Query 5 |
| Routing | React Router 7 |
| Linting | ESLint, Prettier |

## 📐 아키텍처 (FSD)

```
src/
├── app/              # 앱 설정 (providers, router)
├── pages/            # 페이지 컴포넌트
│   ├── home/         # 메인 페이지
│   └── place-detail/ # 상세 페이지
├── widgets/          # 복합 UI 컴포넌트
│   ├── current-location-weather/
│   ├── favorites-grid/
│   ├── favorites-section/
│   └── weather-card/
├── features/         # 기능 단위 모듈
│   ├── favorites/    # 즐겨찾기 상태 관리
│   ├── rename-favorite/
│   ├── search-modal/
│   └── search-place/
├── entities/         # 도메인 모델
│   ├── place/        # 장소 (geocoding, reverse-geocode)
│   └── weather/      # 날씨 (forecast, icons, themes)
└── shared/           # 공통 유틸/컴포넌트
    ├── api/
    ├── lib/
    └── ui/
```

## 🔧 기술적 의사결정

### Open-Meteo API 채택
- API Key 없이 동작 → 배포/리뷰 재현성 높음
- 지오코딩 + 날씨 API를 함께 제공
- WMO 날씨 코드로 아이콘/배경 매핑 용이

### TanStack Query
- 서버 상태 캐싱/로딩/에러 처리 표준화
- staleTime 설정으로 불필요한 재요청 방지

### 검색 데이터 로딩
- `korea_districts.json`을 번들에 포함하지 않고 `?url`로 **정적 asset 로드**
- 초기 번들 크기 최적화

### 날씨 테마 시스템
- WMO 코드 기반 날씨 상태 분류
- `is_day` 플래그로 낮/밤 구분
- Tailwind 클래스 기반 동적 스타일링

## 🌐 배포

- **배포 URL**: [forecast-chi-tawny.vercel.app](https://forecast-chi-tawny.vercel.app/)
- Vercel 또는 Netlify로 배포 가능 (환경변수 없이 동작)

## 📝 라이선스

MIT License
