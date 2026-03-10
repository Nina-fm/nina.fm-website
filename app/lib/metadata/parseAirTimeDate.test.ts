import { describe, expect, it } from 'vitest'
import { parseAirTimeDate } from './parseAirTimeDate'

describe('parseAirTimeDate', () => {
  it('should parse a standard datetime string into a Date', () => {
    const result = parseAirTimeDate('2024-03-15 14:30:00')
    expect(result).toBeInstanceOf(Date)
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(2) // March = 2 (0-indexed)
    expect(result.getDate()).toBe(15)
    expect(result.getHours()).toBe(14)
    expect(result.getMinutes()).toBe(30)
  })

  it('should strip milliseconds before parsing', () => {
    const withMs = parseAirTimeDate('2024-03-15 14:30:00.123')
    const withoutMs = parseAirTimeDate('2024-03-15 14:30:00')
    expect(withMs.getTime()).toBe(withoutMs.getTime())
  })

  it('should correctly parse midnight', () => {
    const result = parseAirTimeDate('2024-01-01 00:00:00')
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
  })
})
