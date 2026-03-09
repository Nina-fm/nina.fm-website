import { MAX_RECONNECT_ATTEMPTS, RECONNECT_DELAYS } from './constants'

export interface AudioReconnectManagerCallbacks {
  /** Called when a reconnect attempt is scheduled. */
  onAttempt: (attempt: number, max: number, delay: number) => void
  /** Called when the maximum number of attempts is reached. */
  onMaxAttemptsReached: () => void
  /** Called when the stream successfully recovers. */
  onSuccess: () => void
}

/**
 * Framework-agnostic state machine for audio stream reconnection.
 *
 * Tracks attempt count and reconnecting status.
 * Calculates progressive backoff delays from RECONNECT_DELAYS.
 * Delegates all side effects (toasts, stop/start) to callbacks.
 */
export class AudioReconnectManager {
  private _attempts = 0
  private _reconnecting = false

  constructor(private readonly callbacks: AudioReconnectManagerCallbacks) {}

  get attempts(): number {
    return this._attempts
  }

  get reconnecting(): boolean {
    return this._reconnecting
  }

  get maxAttempts(): number {
    return MAX_RECONNECT_ATTEMPTS
  }

  /**
   * Returns the delay for the next reconnect attempt based on current attempt count.
   */
  getNextDelay(): number {
    const index = Math.min(this._attempts, RECONNECT_DELAYS.length - 1)
    return RECONNECT_DELAYS[index]!
  }

  /**
   * Registers a reconnect attempt.
   * Returns the delay in ms to wait before reconnecting,
   * or null if already reconnecting or max attempts reached.
   */
  attempt(): number | null {
    if (this._reconnecting) return null

    if (this._attempts >= MAX_RECONNECT_ATTEMPTS) {
      this.callbacks.onMaxAttemptsReached()
      return null
    }

    this._reconnecting = true
    const delay = this.getNextDelay() // calculated before increment to start at RECONNECT_DELAYS[0]
    this._attempts++
    this.callbacks.onAttempt(this._attempts, MAX_RECONNECT_ATTEMPTS, delay)
    return delay
  }

  /**
   * Marks the current reconnect cycle as finished (store may retry or give up).
   */
  markReconnectDone(): void {
    this._reconnecting = false
  }

  /**
   * Marks the reconnection as successful. Resets all state and calls onSuccess.
   */
  succeed(): void {
    this.callbacks.onSuccess()
    this.reset()
  }

  /**
   * Fully resets the manager state (attempts + reconnecting flag).
   */
  reset(): void {
    this._attempts = 0
    this._reconnecting = false
  }
}
