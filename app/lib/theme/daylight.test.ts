import { describe, expect, it } from 'vitest'
import { DAY_END_HOUR, DAY_START_HOUR, DAYLIGHT_POLL_INTERVAL, isDayTime } from './daylight'

describe('daylight constants', () => {
  it('should have DAY_START_HOUR strictly less than DAY_END_HOUR', () => {
    expect(DAY_START_HOUR).toBeLessThan(DAY_END_HOUR)
  })

  it('should have a positive DAYLIGHT_POLL_INTERVAL', () => {
    expect(DAYLIGHT_POLL_INTERVAL).toBeGreaterThan(0)
  })
})

describe('isDayTime', () => {
  it('should return false at midnight (0)', () => {
    expect(isDayTime(0)).toBe(false)
  })

  it('should return false at DAY_START_HOUR (boundary, exclusive)', () => {
    expect(isDayTime(DAY_START_HOUR)).toBe(false)
  })

  it('should return true just after DAY_START_HOUR', () => {
    expect(isDayTime(DAY_START_HOUR + 1)).toBe(true)
  })

  it('should return true at noon', () => {
    expect(isDayTime(12)).toBe(true)
  })

  it('should return true just before DAY_END_HOUR', () => {
    expect(isDayTime(DAY_END_HOUR - 1)).toBe(true)
  })

  it('should return false at DAY_END_HOUR (boundary, exclusive)', () => {
    expect(isDayTime(DAY_END_HOUR)).toBe(false)
  })

  it('should return false late at night (23)', () => {
    expect(isDayTime(23)).toBe(false)
  })
})
