import { describe, expect, it } from 'vitest'
import {
  HEARTBEAT_INTERVAL,
  MAX_RECONNECT_ATTEMPTS,
  RECONNECT_DELAYS,
  RECONNECT_DOUBLE_CHECK_DELAY,
  RECONNECT_STOP_START_DELAY,
  RECONNECT_SUCCESS_CHECK_DELAY,
  VISIBILITY_RESTORE_DELAY,
} from './audio'

describe('audio constants', () => {
  it('MAX_RECONNECT_ATTEMPTS is a positive integer', () => {
    expect(Number.isInteger(MAX_RECONNECT_ATTEMPTS)).toBe(true)
    expect(MAX_RECONNECT_ATTEMPTS).toBeGreaterThan(0)
  })

  it('RECONNECT_DELAYS is a non-empty array of positive numbers in ascending order', () => {
    expect(RECONNECT_DELAYS.length).toBeGreaterThan(0)
    RECONNECT_DELAYS.forEach((d) => expect(d).toBeGreaterThan(0))
    for (let i = 1; i < RECONNECT_DELAYS.length; i++) {
      expect(RECONNECT_DELAYS[i]).toBeGreaterThan(RECONNECT_DELAYS[i - 1]!)
    }
  })

  it('all delay constants are positive numbers', () => {
    expect(HEARTBEAT_INTERVAL).toBeGreaterThan(0)
    expect(RECONNECT_STOP_START_DELAY).toBeGreaterThan(0)
    expect(RECONNECT_SUCCESS_CHECK_DELAY).toBeGreaterThan(0)
    expect(RECONNECT_DOUBLE_CHECK_DELAY).toBeGreaterThan(0)
    expect(VISIBILITY_RESTORE_DELAY).toBeGreaterThan(0)
  })
})
