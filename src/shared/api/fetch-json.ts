export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const res = await fetch(input, init)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  return (await res.json()) as T
}
