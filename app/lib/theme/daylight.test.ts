import { describe, expect, it } from 'vitest'
import { DAY_END_HOUR, DAY_START_HOUR, DAYLIGHT_POLL_INTERVAL, isDayTime } from './daylight'

describe('daylight constants', () => {
  it('DAY_START_HOUR < DAY_END_HOUR', () => {
    expect(DAY_START_HOUR).toBeLessThan(DAY_END_HOUR)
  })

  it('DAYLIGHT_POLL_INTERVAL is positive', () => {
    expect(DAYLIGHT_POLL_INTERVAL).toBeGreaterThan(0)
  })
})

describe('isDayTime', () => {
  it('returns false at midnight (0)', () => {
    expect(isDayTime(0)).toBe(false)
  })

  it('returns false at DAY_START_HOUR (boundary, exclusive)', () => {
    expect(isDayTime(DAY_START_HOUR)).toBe(false)
  })

  it('returns true just after DAY_START_HOUR', () => {
    expect(isDayTime(DAY_START_HOUR + 1)).toBe(true)
  })

  it('returns true at noon', () => {
    expect(isDayTime(12)).toBe(true)
  })

  it('returns true just before DAY_END_HOUR', () => {
    expect(isDayTime(DAY_END_HOUR - 1)).toBe(true)
  })

  it('returns false at DAY_END_HOUR (boundary, exclusive)', () => {
    expect(isDayTime(DAY_END_HOUR)).toBe(false)
  })

  it('returns false late at night (23)', () => {
    expect(isDayTime(23)).toBe(false)
  })
})
