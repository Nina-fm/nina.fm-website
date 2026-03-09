import { describe, expect, it } from 'vitest'
import { formatDjs } from './formatDjs'

describe('formatDjs', () => {
  it('returns empty string for undefined', () => {
    expect(formatDjs(undefined)).toBe('')
  })

  it('returns empty string for empty array', () => {
    expect(formatDjs([])).toBe('')
  })

  it('returns single DJ name as-is', () => {
    expect(formatDjs(['120'])).toBe('120')
  })

  it('joins two DJs with &', () => {
    expect(formatDjs(['120', 'Fuji'])).toBe('120 & Fuji')
  })

  it('joins three DJs with comma and &', () => {
    expect(formatDjs(['Hagi', 'Siam', 'Chapelier'])).toBe('Hagi, Siam & Chapelier')
  })

  it('joins four DJs correctly', () => {
    expect(formatDjs(['A', 'B', 'C', 'D'])).toBe('A, B, C & D')
  })

  it('handles empty string entries', () => {
    expect(formatDjs([''])).toBe('')
  })
})
