import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useDebugStore } from '~/stores/debug'

const defaultState = {
  locked: false,
  loadStarted: false,
  preloadStarted: false,
  stopped: true,
}

export const useAudioStore = defineStore('audio', () => {
  const config = useRuntimeConfig()
  const { log } = useDebugStore()
  const audioElement = useAudioElement()

  const streamUrl = config.public.audioStreamUrl
  const checkNetworkTimeout = config.public.streamCheckNetworkTimeout

  const { audio, currentTime, error, load, paused, played, readyState, toggleMute, unload } = audioElement

  // State
  const canAutoplay = ref(true)
  const initialized = ref(false)
  const locked = ref(defaultState.locked)
  const loadStarted = ref(defaultState.loadStarted)
  const preloadStarted = ref(defaultState.preloadStarted)
  const stopped = ref(defaultState.stopped)
  const networkDown = ref(false)

  // Computed

  const readyToPlay = computed(() => readyState.value >= 3)
  const playing = computed(() => currentTime.value > 0 && !!played.value && !paused.value && !stopped.value)
  const preloading = computed(() => preloadStarted.value && readyState.value < 3)
  const _loading = computed(
    () => preloading.value || (loadStarted.value && (currentTime.value === 0 || readyState.value < 3)),
  )
  const loading = computed(() => (_loading.value || preloading.value) && !readyToPlay.value)
  const networkIssue = computed(() => error.value || (playing.value && loading.value))

  // Watchers

  watch(networkIssue, (value) => {
    if (!!value && !networkDown.value && initialized.value) {
      log('networkIssue', value)
      networkDown.value = true
      _connectionCheck()
    }
  })

  onMounted(() => {
    initialized.value = true
    start()
  })

  onBeforeMount(() => {
    _checkAutoplay()
  })

  // Private methods

  const _checkAutoplay = async () => {
    log('_checkAutoplay')
    canAutoplay.value = await detectAutoplay()
    if (!canAutoplay.value) {
      log('autoplay not allowed')
      locked.value = true
    }
  }

  const _connectionCheck = () => {
    log('_connectionCheck')
    if (networkIssue.value && initialized.value) {
      log('connection needs restart')
      toast.promise(
        new Promise((resolve) => {
          const check = () => {
            if (networkIssue.value && initialized.value) {
              stop()
              start()
              setTimeout(check, checkNetworkTimeout)
            } else {
              resolve(true)
            }
          }
          check()
        }),
        {
          loading: () => `Connexion au flux audio Nina.fm impossible. Tentative de reconnexion...`,
          success: () => `Connexion au flux audio Nina.fm restaurée.`,
          error: () => `Échec de la reconnexion au flux audio Nina.fm.`,
        },
      )
    }
  }

  const _unlock = () => {
    log('_unlock')
    locked.value = false
    if (audio.value) {
      audio.value.play()
    }
  }

  const _resetState = () => {
    log('_resetState')
    loadStarted.value = defaultState.loadStarted
    preloadStarted.value = defaultState.preloadStarted
    stopped.value = defaultState.stopped
  }

  // Public methods

  const start = (unlock?: boolean) => {
    log('start')
    if (unlock) {
      _unlock()
    }
    if (stopped.value) {
      stopped.value = false
      load(`${streamUrl}?t=${Date.now()}`)
      loadStarted.value = true
    }
  }

  const stop = () => {
    log('stop')
    if (audio.value) {
      stopped.value = true
      unload()
      _resetState()
    }
  }

  const refresh = () => {
    log('refresh')
    stop()
    start()
  }

  const toggleStartStop = () => {
    log('toggleStartStop')
    if (playing.value) {
      stop()
    } else {
      start()
    }
  }

  const togglePlayPause = () => {
    log('togglePlayPause')
    if (paused.value) {
      audio.value?.play()
    } else {
      audio.value?.pause()
    }
  }

  return {
    ...audioElement,
    streamUrl,
    // State
    loadStarted,
    preloadStarted,
    stopped,
    // Computed
    locked,
    loading,
    networkIssue,
    playing,
    preloading,
    readyToPlay,
    // Actions
    toggleMute,
    toggleStartStop,
    togglePlayPause,
    refresh,
    start,
    stop,
  }
})

export const useAudioStoreRefs = () => storeToRefs(useAudioStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAudioStore, import.meta.hot))
}
