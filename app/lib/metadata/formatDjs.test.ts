import { describe, expect, it } from 'vitest'
import { formatDjs } from './formatDjs'

describe('formatDjs', () => {
  it('should return empty string when djs is undefined', () => {
    expect(formatDjs(undefined)).toBe('')
  })

  it('should return empty string when djs is an empty array', () => {
    expect(formatDjs([])).toBe('')
  })

  it('should return the DJ name as-is when there is only one', () => {
    expect(formatDjs(['120'])).toBe('120')
  })

  it('should join two DJs with &', () => {
    expect(formatDjs(['120', 'Fuji'])).toBe('120 & Fuji')
  })

  it('should join three DJs with comma and &', () => {
    expect(formatDjs(['Hagi', 'Siam', 'Chapelier'])).toBe('Hagi, Siam & Chapelier')
  })

  it('should join four DJs with commas and &', () => {
    expect(formatDjs(['A', 'B', 'C', 'D'])).toBe('A, B, C & D')
  })

  it('should return empty string when the single entry is an empty string', () => {
    expect(formatDjs([''])).toBe('')
  })
})
