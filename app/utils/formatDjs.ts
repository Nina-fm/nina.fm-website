/**
 * Format a list of DJ names with proper separators
 * Same logic as Face B (formatDjs.ts)
 *
 * Examples:
 * - ["120"] → "120"
 * - ["120", "Fuji"] → "120 & Fuji"
 * - ["Hagi", "Siam", "Chapelier"] → "Hagi, Siam & Chapelier"
 */
export const formatDjs = (djs: string[] | undefined): string => {
  if (!djs || djs.length === 0) return ''

  if (djs.length === 1) {
    return djs[0] || ''
  }

  if (djs.length === 2) {
    return `${djs[0]} & ${djs[1]}`
  }

  // 3 or more: "DJ1, DJ2, DJ3 & DJ4"
  const allButLast = djs.slice(0, -1).join(', ')
  const last = djs[djs.length - 1]
  return `${allButLast} & ${last}`
}
