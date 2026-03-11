import {
  defaultAudioElementState,
  networkStatusCodes,
  networkStatusTexts,
  readyStatusCodes,
  readyStatusTexts,
} from '~/lib/audio/element'
import { useDebugStore } from '~/stores/debug'

const defaultState = defaultAudioElementState

export const useAudioElement = () => {
  const { log } = useDebugStore()

  const audio = ref<HTMLAudioElement | null>(null)

  const buffered = ref(defaultState.buffered)
  const currentTime = ref(defaultState.currentTime)
  const duration = ref(defaultState.duration)
  const ended = ref(defaultState.ended)
  const error = ref<MediaError | null>(defaultState.error)
  const muted = ref(defaultState.muted)
  const networkState = ref(defaultState.networkState)
  const paused = ref(defaultState.paused)
  const playbackRate = ref(defaultState.playbackRate)
  const played = ref(defaultState.played)
  const preload = ref(defaultState.preload)
  const readyState = ref(defaultState.readyState)
  const volume = ref(defaultState.volume)

  const networkStateText = computed(() => networkStatusTexts[networkState.value])
  const networkStateCode = computed(() => networkStatusCodes[networkState.value])

  const readyStateText = computed(() => readyStatusTexts[readyState.value])
  const readyStateCode = computed(() => readyStatusCodes[readyState.value])

  const resetState = () => {
    log('resetState')
    buffered.value = defaultState.buffered
    currentTime.value = defaultState.currentTime
    duration.value = defaultState.duration
    ended.value = defaultState.ended
    error.value = defaultState.error
    muted.value = defaultState.muted
    networkState.value = defaultState.networkState
    paused.value = defaultState.paused
    playbackRate.value = defaultState.playbackRate
    played.value = defaultState.played
    preload.value = defaultState.preload
    readyState.value = defaultState.readyState
    volume.value = defaultState.volume
  }

  const _set = (key: keyof typeof defaultState, ref: Ref<unknown>, value: unknown) => {
    const newValue = value ?? defaultState[key]
    if (ref.value !== newValue) {
      ref.value = newValue
    }
  }

  const updateState = (callback?: () => void) => {
    if (!audio.value) return

    callback?.()

    _set('buffered', buffered, audio.value?.buffered.length)
    _set('currentTime', currentTime, Math.ceil(audio.value?.currentTime ?? 0))
    _set('duration', duration, audio.value?.duration)
    _set('ended', ended, audio.value?.ended)
    _set('error', error, audio.value?.error)
    _set('muted', muted, audio.value?.muted)
    _set('networkState', networkState, audio.value?.networkState)
    _set('paused', paused, audio.value?.paused)
    _set('playbackRate', playbackRate, audio.value?.playbackRate)
    _set('played', played, audio.value?.played.length)
    _set('preload', preload, audio.value?.preload)
    _set('readyState', readyState, audio.value?.readyState)
    _set('volume', volume, audio.value?.volume)
  }

  const _audioEvents = [
    'abort', 'canplay', 'canplaythrough', 'emptied', 'ended', 'error',
    'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing',
    'progress', 'suspend', 'timeupdate', 'volumechange', 'stalled', 'waiting',
  ] as const

  const _handleAudioEvent = () => updateState()

  const _addEventListeners = (el: HTMLAudioElement) => {
    log('_addEventListeners')
    _audioEvents.forEach((event) => el.addEventListener(event, _handleAudioEvent))
  }

  const _removeEventListeners = (el: HTMLAudioElement) => {
    log('_removeEventListeners')
    _audioEvents.forEach((event) => el.removeEventListener(event, _handleAudioEvent))
  }

  const load = (url: string) => {
    log('load', url)
    unload()
    const el = new Audio()
    el.autoplay = true
    el.src = url
    _addEventListeners(el)
    audio.value = el
    el.load()
  }

  const unload = () => {
    log('unload')
    if (audio.value) {
      const el = audio.value
      audio.value = null
      _removeEventListeners(el)
      el.pause()
      el.currentTime = 0
      el.removeAttribute('src')
      el.load()
      el.remove()
    }
    resetState()
  }

  const toggleMute = (value?: boolean) => {
    log('toggleMute')
    if (audio.value) {
      audio.value.muted = value ?? !audio.value.muted
    }
  }

  return {
    audio,
    defaultState,
    // Audio State
    buffered,
    currentTime,
    duration,
    ended,
    error,
    muted,
    networkState,
    paused,
    playbackRate,
    played,
    preload,
    readyState,
    volume,
    // Audio computed state
    networkStateCode,
    networkStateText,
    readyStateCode,
    readyStateText,
    // Audio Methods
    load,
    resetState,
    toggleMute,
    unload,
    updateState,
  }
}
