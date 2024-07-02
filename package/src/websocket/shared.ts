export function getOrSet<T extends Map<any, any>>(
  map: T,
  key: T extends Map<infer K, unknown> ? K : never,
  fallback: T extends Map<unknown, infer R> ? R : never
): T extends Map<unknown, infer R> ? R : never {
  return map.get(key) ?? (() => {
    map.set(key, fallback)
    return fallback
  })()
}