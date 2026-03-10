import { describe, expect, it, vi } from 'vitest'
import { AudioReconnectManager } from './AudioReconnectManager'
import { MAX_RECONNECT_ATTEMPTS, RECONNECT_DELAYS } from './constants'

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
  it('should start with 0 attempts and not reconnecting when created', () => {
    const { manager } = makeManager()
    expect(manager.attempts).toBe(0)
    expect(manager.reconnecting).toBe(false)
  })

  it('should expose MAX_RECONNECT_ATTEMPTS via maxAttempts', () => {
    const { manager } = makeManager()
    expect(manager.maxAttempts).toBe(MAX_RECONNECT_ATTEMPTS)
  })
})

describe('AudioReconnectManager — attempt()', () => {
  it('should return first reconnect delay and increment attempts when called', () => {
    const { manager, callbacks } = makeManager()
    const delay = manager.attempt()
    expect(delay).toBe(RECONNECT_DELAYS[0])
    expect(manager.attempts).toBe(1)
    expect(callbacks.onAttempt).toHaveBeenCalledWith(1, MAX_RECONNECT_ATTEMPTS, RECONNECT_DELAYS[0])
  })

  it('should return null and not increment attempts when already reconnecting', () => {
    const { manager } = makeManager()
    manager.attempt()
    const second = manager.attempt()
    expect(second).toBeNull()
    expect(manager.attempts).toBe(1)
  })

  it('should progress through RECONNECT_DELAYS as attempts increase', () => {
    const { manager } = makeManager()
    const delays: (number | null)[] = []
    for (let i = 0; i < RECONNECT_DELAYS.length; i++) {
      const delay = manager.attempt()
      delays.push(delay)
      manager.markReconnectDone()
    }
    expect(delays).toEqual(RECONNECT_DELAYS)
  })

  it('should cap delay at last RECONNECT_DELAYS value when list is exhausted', () => {
    const { manager } = makeManager()
    // Burn through all defined delays
    for (let i = 0; i < RECONNECT_DELAYS.length; i++) {
      manager.attempt()
      manager.markReconnectDone()
    }
    const delay = manager.attempt()
    expect(delay).toBe(RECONNECT_DELAYS[RECONNECT_DELAYS.length - 1])
  })

  it('should call onMaxAttemptsReached and return null when limit is reached', () => {
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
  it('should call onSuccess and reset state when succeed is called', () => {
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
  it('should clear attempts and reconnecting flag when reset is called', () => {
    const { manager } = makeManager()
    manager.attempt()
    manager.reset()
    expect(manager.attempts).toBe(0)
    expect(manager.reconnecting).toBe(false)
  })

  it('should allow new attempts after reset', () => {
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
