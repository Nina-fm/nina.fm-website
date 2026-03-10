/**
 * Returns the next item in a circular array.
 * Wraps around to index 0 when current is the last item.
 */
export function getNextInCycle<T>(items: T[], current: T): T | undefined {
  if (items.length === 0) return undefined
  const index = items.indexOf(current)
  const next = index >= items.length - 1 ? 0 : index + 1
  return items[next]
}

/**
 * Cycles dark mode through its three states: 'auto' → true → false → 'auto'
 */
export function cycleDarkMode(current: boolean | 'auto'): boolean | 'auto' {
  if (current === 'auto') return true
  if (current === true) return false
  return 'auto'
}
