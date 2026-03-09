import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MAX_RECONNECT_ATTEMPTS, RECONNECT_DELAYS } from './constants'
import { AudioReconnectManager } from './AudioReconnectManager'

function makeManager() {
  const callbacks = {
    onAttempt: vi.fn(),
    onMaxAttemptsReached: vi.fn(),
    onSuccess: vi.fn(),
  }
  const manager = new AudioReconnectManager(callbacks)
  return { manager, callbacks }
}

describe('AudioReconnectManager — initial state', () => {
  it('starts with 0 attempts and not reconnecting', () => {
    const { manager } = makeManager()
    expect(manager.attempts).toBe(0)
    expect(manager.reconnecting).toBe(false)
  })

  it('exposes MAX_RECONNECT_ATTEMPTS via maxAttempts', () => {
    const { manager } = makeManager()
    expect(manager.maxAttempts).toBe(MAX_RECONNECT_ATTEMPTS)
  })
})

describe('AudioReconnectManager — attempt()', () => {
  it('returns the first reconnect delay and increments attempts', () => {
    const { manager, callbacks } = makeManager()
    const delay = manager.attempt()
    expect(delay).toBe(RECONNECT_DELAYS[0])
    expect(manager.attempts).toBe(1)
    expect(callbacks.onAttempt).toHaveBeenCalledWith(1, MAX_RECONNECT_ATTEMPTS, RECONNECT_DELAYS[0])
  })

  it('returns null and does not increment when already reconnecting', () => {
    const { manager } = makeManager()
    manager.attempt()
    const second = manager.attempt()
    expect(second).toBeNull()
    expect(manager.attempts).toBe(1)
  })

  it('progresses through RECONNECT_DELAYS as attempts increase', () => {
    const { manager } = makeManager()
    const delays: (number | null)[] = []
    for (let i = 0; i < RECONNECT_DELAYS.length; i++) {
      const delay = manager.attempt()
      delays.push(delay)
      manager.markReconnectDone()
    }
    expect(delays).toEqual(RECONNECT_DELAYS)
  })

  it('caps delay at the last RECONNECT_DELAYS value after exhausting the list', () => {
    const { manager } = makeManager()
    // Burn through all defined delays
    for (let i = 0; i < RECONNECT_DELAYS.length; i++) {
      manager.attempt()
      manager.markReconnectDone()
    }
    const delay = manager.attempt()
    expect(delay).toBe(RECONNECT_DELAYS[RECONNECT_DELAYS.length - 1])
  })

  it('calls onMaxAttemptsReached and returns null when limit is reached', () => {
    const { manager, callbacks } = makeManager()
    for (let i = 0; i < MAX_RECONNECT_ATTEMPTS; i++) {
      manager.attempt()
      manager.markReconnectDone()
    }
    const delay = manager.attempt()
    expect(delay).toBeNull()
    expect(callbacks.onMaxAttemptsReached).toHaveBeenCalledOnce()
  })
})

describe('AudioReconnectManager — succeed()', () => {
  it('calls onSuccess and resets state', () => {
    const { manager, callbacks } = makeManager()
    manager.attempt()
    manager.markReconnectDone()
    manager.succeed()
    expect(callbacks.onSuccess).toHaveBeenCalledOnce()
    expect(manager.attempts).toBe(0)
    expect(manager.reconnecting).toBe(false)
  })
})

describe('AudioReconnectManager — reset()', () => {
  it('clears attempts and reconnecting flag', () => {
    const { manager } = makeManager()
    manager.attempt()
    manager.reset()
    expect(manager.attempts).toBe(0)
    expect(manager.reconnecting).toBe(false)
  })

  it('allows new attempts after reset', () => {
    const { manager } = makeManager()
    for (let i = 0; i < MAX_RECONNECT_ATTEMPTS; i++) {
      manager.attempt()
      manager.markReconnectDone()
    }
    manager.reset()
    const delay = manager.attempt()
    expect(delay).toBe(RECONNECT_DELAYS[0])
  })
})
