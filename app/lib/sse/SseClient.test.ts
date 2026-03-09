import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SseClient } from './SseClient'

// Minimal EventSource mock
class MockEventSource {
  static OPEN = 1
  static CLOSED = 2

  readyState = MockEventSource.OPEN
  onmessage: ((e: { data: string }) => void) | null = null
  onerror: (() => void) | null = null

  constructor(public url: string) {
    MockEventSource.instances.push(this)
  }

  close() {
    this.readyState = MockEventSource.CLOSED
  }

  // Test helpers
  static instances: MockEventSource[] = []
  static last(): MockEventSource {
    return MockEventSource.instances[MockEventSource.instances.length - 1]!
  }
  static reset() {
    MockEventSource.instances = []
  }

  simulateMessage(data: unknown) {
    this.onmessage?.({ data: JSON.stringify(data) })
  }
  simulateError() {
    this.onerror?.()
  }
}

beforeEach(() => {
  MockEventSource.reset()
  vi.stubGlobal('EventSource', MockEventSource)
  vi.useFakeTimers()
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('SseClient — connect()', () => {
  it('creates an EventSource with the provided URL', () => {
    const client = new SseClient('https://api.nina.fm/sse', vi.fn())
    client.connect()
    expect(MockEventSource.last().url).toBe('https://api.nina.fm/sse')
  })

  it('does not create a second EventSource if already connected', () => {
    const client = new SseClient('https://api.nina.fm/sse', vi.fn())
    client.connect()
    client.connect()
    expect(MockEventSource.instances).toHaveLength(1)
  })
})

describe('SseClient — message handling', () => {
  it('calls onMessage with parsed JSON data', () => {
    const handler = vi.fn()
    const client = new SseClient<{ name: string }>('https://api.nina.fm/sse', handler)
    client.connect()
    MockEventSource.last().simulateMessage({ name: 'Nina.fm' })
    expect(handler).toHaveBeenCalledWith({ name: 'Nina.fm' })
  })

  it('silently ignores malformed JSON', () => {
    const handler = vi.fn()
    const client = new SseClient('https://api.nina.fm/sse', handler)
    client.connect()
    MockEventSource.last().onmessage?.({ data: 'not-json' })
    expect(handler).not.toHaveBeenCalled()
  })
})

describe('SseClient — reconnect on error', () => {
  it('closes the EventSource on error and reconnects after delay', () => {
    const client = new SseClient('https://api.nina.fm/sse', vi.fn(), { reconnectDelay: 3000 })
    client.connect()
    const first = MockEventSource.last()
    first.simulateError()
    expect(first.readyState).toBe(MockEventSource.CLOSED)
    // Before delay: no new EventSource
    expect(MockEventSource.instances).toHaveLength(1)
    // After delay: reconnected
    vi.advanceTimersByTime(3000)
    expect(MockEventSource.instances).toHaveLength(2)
  })
})

describe('SseClient — disconnect()', () => {
  it('closes the EventSource', () => {
    const client = new SseClient('https://api.nina.fm/sse', vi.fn())
    client.connect()
    const es = MockEventSource.last()
    client.disconnect()
    expect(es.readyState).toBe(MockEventSource.CLOSED)
  })

  it('cancels a pending reconnect timer', () => {
    const client = new SseClient('https://api.nina.fm/sse', vi.fn(), { reconnectDelay: 3000 })
    client.connect()
    MockEventSource.last().simulateError()
    client.disconnect()
    vi.advanceTimersByTime(3000)
    // No new EventSource should have been created
    expect(MockEventSource.instances).toHaveLength(1)
  })
})
