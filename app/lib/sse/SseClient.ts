export interface SseClientOptions {
  /** Delay in ms before reconnecting after an error. Default: 3000 */
  reconnectDelay?: number
}

/**
 * Framework-agnostic SSE client with automatic reconnection.
 *
 * Usage:
 *   const client = new SseClient<MyDto>(url, (data) => { ... })
 *   client.connect()
 *   // later:
 *   client.disconnect()
 */
export class SseClient<T = unknown> {
  private es: EventSource | null = null
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private readonly reconnectDelay: number

  constructor(
    private readonly url: string,
    private readonly onMessage: (data: T) => void,
    options?: SseClientOptions,
  ) {
    this.reconnectDelay = options?.reconnectDelay ?? 3000
  }

  get isConnected(): boolean {
    return this.es !== null && this.es.readyState === EventSource.OPEN
  }

  connect(): void {
    if (this.es !== null) return

    this.es = new EventSource(this.url)

    this.es.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data as string) as T
        this.onMessage(data)
      } catch {
        // Silently ignore malformed JSON
      }
    }

    this.es.onerror = () => {
      this._closeEventSource()
      this.reconnectTimer = setTimeout(() => this.connect(), this.reconnectDelay)
    }
  }

  disconnect(): void {
    this._clearReconnectTimer()
    this._closeEventSource()
  }

  private _closeEventSource(): void {
    if (this.es) {
      this.es.close()
      this.es = null
    }
  }

  private _clearReconnectTimer(): void {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
  }
}
