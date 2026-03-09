import type { ConfigurableDocument, ConfigurableNavigator } from '@vueuse/core'

type WakeLockType = 'screen'
export interface WakeLockSentinel extends EventTarget {
  type: WakeLockType
  released: boolean
  release: () => Promise<void>
}
export type UseWakeLockOptions = ConfigurableNavigator & ConfigurableDocument
/**
 * Reactive Screen Wake Lock API.
 *
 * @see https://vueuse.org/useWakeLock
 * @param options
 */
export declare function useWakeLock(options?: UseWakeLockOptions): {
  isSupported: ComputedRef<boolean>
  isActive: Ref<boolean>
  request: (type: WakeLockType) => Promise<void>
  release: () => Promise<void>
}
export type UseWakeLockReturn = ReturnType<typeof useWakeLock>
