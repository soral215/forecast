# realteeth (날씨 앱 과제)

React + TypeScript로 구현한 **대한민국 주소 검색 기반 날씨 앱**입니다.  
Open‑Meteo(지오코딩 + 날씨)와 TanStack Query를 사용해 데이터 조회/캐싱을 처리합니다.

## 프로젝트 실행 방법

### 요구사항

- Node.js: **20.19+** 권장 (Vite 요구사항)

### 로컬 실행

```bash
npm install
npm run dev
```

### 빌드/검증

```bash
npm run format
npm run lint
npm run build
```

## 구현한 기능

- **현재 위치 날씨**
  - 앱 첫 진입 시 브라우저 위치 권한을 요청하고, 현재 위치의 **현재 기온 + 오늘 최저/최고**를 표시
  - 권한 거부/오류 시 안내 문구 및 재시도 버튼 제공
- **장소 검색(대한민국 한정)**
  - 제공된 `korea_districts.json`을 기반으로 **시/군/구/동** 검색 자동완성(최대 20개)
  - 선택한 문자열을 Open‑Meteo 지오코딩으로 좌표(lat/lon)로 변환
  - 결과가 없으면 **“해당 장소의 정보가 제공되지 않습니다.”** 노출
- **선택 장소 날씨**
  - 선택한 장소의 **현재 기온 / 오늘 최저·최고 / 시간대별(다음 24시간) 기온** 표시
- **즐겨찾기(최대 6개)**
  - 추가/삭제 가능, localStorage에 저장
  - 즐겨찾기 카드에 **현재 날씨 + 오늘 최저/최고** 표시
  - 카드 클릭 시 상세 페이지 이동
  - 즐겨찾기 별칭(이름) 수정 가능
- **상세 페이지**
  - `/place?lat=...&lon=...` 기반으로 **현재/최저/최고/시간대별(24시간)** 표시

## 기술적 의사결정 및 이유

- **Open‑Meteo 채택**
  - API Key 없이 동작해 배포/리뷰 재현성이 높음
  - 현재/시간대별/일 최저·최고를 필요한 형태로 제공
  - 지오코딩 API를 함께 제공해 `korea_districts.json`(문자열) → 좌표 변환 흐름이 단순
- **TanStack Query**
  - 서버 상태(지오코딩/날씨)를 캐싱/로딩/에러 처리까지 표준화해 UI 구현 복잡도를 낮춤
- **검색 데이터 로딩 방식**
  - `korea_districts.json`은 용량이 커서 번들에 직접 포함하지 않고 `?url`로 **정적 asset 로드** 후 인덱싱(초기 로딩/번들 크기 개선)
- **FSD(Feature Sliced Design)**
  - `entities`(place/weather), `features`(search), `widgets`(current-location, favorites) 중심으로 책임 분리

## 사용한 기술 스택

- React, TypeScript, Vite
- Tailwind CSS
- TanStack Query
- React Router
- ESLint, Prettier

## 배포

- Vercel 또는 Netlify 권장(환경변수 없이 동작)
