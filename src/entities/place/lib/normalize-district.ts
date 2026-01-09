export function normalizeDistrictText(value: string) {
  return value.replaceAll('-', '').replaceAll(' ', '').trim()
}

