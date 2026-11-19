// Very small spam guard: at most `max` requests per IP in the time window (per server instance).
const hits = new Map<string, number[]>()

export function limited(ip: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now()
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs)
  list.push(now)
  hits.set(ip, list)
  if (hits.size > 5000) hits.clear()
  return list.length > max
}
