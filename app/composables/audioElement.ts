import { useDebugStore } from '~/stores/debug'

const networkStatusCodes = ['NETWORK_EMPTY', 'NETWORK_IDLE', 'NETWORK_LOADING', 'NETWORK_NO_SOURCE']
const networkStatusTexts = [
  'There is no data yet. Also, readyState is HAVE_NOTHING.',
  'HTMLMediaElement is active and has selected a resource, but is not using the network.',
  'The browser is downloading HTMLMediaElement data.',
  'No HTMLMediaElement src found.',
]
const readyStatusCodes = ['HAVE_NOTHING', 'HAVE_METADATA', 'HAVE_CURRENT_DATA', 'HAVE_FUTURE_DATA', 'HAVE_ENOUGH_DATA']
const readyStatusTexts = [
  'No information is available about the media resource.',
  'Enough of the media resource has been retrieved that the metadata attributes are initialized. Seeking will no longer raise an exception.',
  'Data is available for the current playback position, but not enough to actually play more than one frame.',
  'Data for the current playback position as well as for at least a little bit of time into the future is available.',
  'Enough data is available—and the download rate is high enough—that the media can be played through to the end without interruption.',
]

// const blankSound = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA='

const defaultState = {
  buffered: 0,
  currentTime: 0,
  duration: 0,
  ended: false,
  error: null,
  muted: false,
  networkState: 0,
  paused: true,
  playbackRate: 1,
  played: 0,
  preload: 'auto' /* "none" | "metadata" | "auto" | "undefined" | "empty" */,
  readyState: 0,
  volume: 1,
  stalled: false,
  waiting: false,
}

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

  const _addEventListeners = () => {
    log('_addEventListeners')
    if (audio.value) {
      audio.value.addEventListener('abort', () => updateState())
      audio.value.addEventListener('canplay', () => updateState())
      audio.value.addEventListener('canplaythrough', () => updateState())
      audio.value.addEventListener('emptied', () => updateState())
      audio.value.addEventListener('ended', () => updateState())
      audio.value.addEventListener('error', () => updateState())
      audio.value.addEventListener('loadeddata', () => updateState())
      audio.value.addEventListener('loadedmetadata', () => updateState())
      audio.value.addEventListener('loadstart', () => updateState())
      audio.value.addEventListener('pause', () => updateState())
      audio.value.addEventListener('play', () => updateState())
      audio.value.addEventListener('playing', () => updateState())
      audio.value.addEventListener('progress', () => updateState())
      audio.value.addEventListener('suspend', () => updateState())
      audio.value.addEventListener('timeupdate', () => updateState())
      audio.value.addEventListener('volumechange', () => updateState())
      audio.value.addEventListener('stalled', () => updateState())
      audio.value.addEventListener('waiting', () => updateState())
    }
  }

  const _removeEventListeners = () => {
    log('_removeEventListeners')
    if (audio.value) {
      audio.value.removeEventListener('abort', () => updateState())
      audio.value.removeEventListener('canplay', () => updateState())
      audio.value.removeEventListener('canplaythrough', () => updateState())
      audio.value.removeEventListener('emptied', () => updateState())
      audio.value.removeEventListener('ended', () => updateState())
      audio.value.removeEventListener('error', () => updateState())
      audio.value.removeEventListener('loadeddata', () => updateState())
      audio.value.removeEventListener('loadedmetadata', () => updateState())
      audio.value.removeEventListener('loadstart', () => updateState())
      audio.value.removeEventListener('pause', () => updateState())
      audio.value.removeEventListener('play', () => updateState())
      audio.value.removeEventListener('playing', () => updateState())
      audio.value.removeEventListener('progress', () => updateState())
      audio.value.removeEventListener('suspend', () => updateState())
      audio.value.removeEventListener('timeupdate', () => updateState())
      audio.value.removeEventListener('volumechange', () => updateState())
      audio.value.removeEventListener('stalled', () => updateState())
      audio.value.removeEventListener('waiting', () => updateState())
    }
  }

  const load = (url: string) => {
    log('load', url)
    unload()
    audio.value = new Audio()
    audio.value.autoplay = true
    audio.value.src = url
    audio.value.load()
    _addEventListeners()
  }

  const unload = () => {
    log('unload')
    if (audio.value) {
      audio.value.pause()
      // Force clear the buffer by seeking to end and setting blank source
      audio.value.currentTime = 0
      audio.value.removeAttribute('src')
      audio.value.load() // This empties the buffer
    }
    _removeEventListeners()
    audio.value?.remove()
    audio.value = null
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
