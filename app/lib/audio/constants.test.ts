import { describe, expect, it } from 'vitest'
import { RECONNECT_DELAYS } from './constants'

describe('RECONNECT_DELAYS', () => {
  it('is non-empty and in strictly ascending order', () => {
    expect(RECONNECT_DELAYS.length).toBeGreaterThan(0)
    for (let i = 1; i < RECONNECT_DELAYS.length; i++) {
      expect(RECONNECT_DELAYS[i]).toBeGreaterThan(RECONNECT_DELAYS[i - 1]!)
    }
  })
})
