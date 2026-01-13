export type PlaceDepth = 1 | 2 | 3

export type PlaceCandidate = {
  /** 원본 문자열 (예: 서울특별시-종로구-청운동) */
  full: string
  /** 검색용(공백/하이픈 제거) */
  normalized: string
  /** 1:시도, 2:시도-시군구, 3:시도-시군구-읍면동/동 */
  depth: PlaceDepth
  sido: string
  sigungu?: string
  dong?: string
}
