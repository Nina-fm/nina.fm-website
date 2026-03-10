import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useDebugStore } from '~/stores/debug'

const defaultState = {
  locked: false,
  loadStarted: false,
  preloadStarted: false,
  stopped: true,
  reconnecting: false,
  reconnectAttempts: 0,
}

export const useAudioStore = defineStore('audio', () => {
  const config = useRuntimeConfig()
  const { log } = useDebugStore()
  const audioElement = useAudioElement()

  const streamUrl = config.public.audioStreamUrl

  const { audio, currentTime, error, load, paused, played, readyState, toggleMute, unload } = audioElement

  // State
  const canAutoplay = ref(true)
  const initialized = ref(false)
  const locked = ref(defaultState.locked)
  const loadStarted = ref(defaultState.loadStarted)
  const preloadStarted = ref(defaultState.preloadStarted)
  const stopped = ref(defaultState.stopped)
  const networkDown = ref(false)
  const reconnecting = ref(defaultState.reconnecting)
  const reconnectAttempts = ref(defaultState.reconnectAttempts)

  // Reconnection config
  const MAX_RECONNECT_ATTEMPTS = 10
  const RECONNECT_DELAYS = [2000, 5000, 10000, 15000, 20000] // Progressive delays (faster initial retry)
  const HEARTBEAT_INTERVAL = 5000 // Check every 5s if stream is alive
  const RECONNECT_STOP_START_DELAY = 1000 // Delay between stop and start
  const RECONNECT_SUCCESS_CHECK_DELAY = 2000 // Delay before checking if reconnect worked
  const RECONNECT_DOUBLE_CHECK_DELAY = 2000 // Additional delay for double-checking
  const VISIBILITY_RESTORE_DELAY = 1000 // Delay after page becomes visible

  let reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null
  let heartbeatIntervalId: ReturnType<typeof setInterval> | null = null
  let lastCurrentTime = 0

  // Computed

  const readyToPlay = computed(() => readyState.value >= 3)
  const playing = computed(() => currentTime.value > 0 && !!played.value && !paused.value && !stopped.value)
  const preloading = computed(() => preloadStarted.value && readyState.value < 3)
  const _loading = computed(
    () => preloading.value || (loadStarted.value && (currentTime.value === 0 || readyState.value < 3)),
  )
  const loading = computed(() => (_loading.value || preloading.value) && !readyToPlay.value)
  // Improved network issue detection: trigger even when not playing yet
  const networkIssue = computed(
    () =>
      !!error.value ||
      (loadStarted.value && !stopped.value && loading.value && currentTime.value === 0 && readyState.value < 3),
  )

  // Watchers

  watch(networkIssue, (value) => {
    if (!!value && !networkDown.value && initialized.value && !reconnecting.value) {
      log('networkIssue detected', value)
      networkDown.value = true
      _attemptReconnect()
    }
  })

  // Watch for successful reconnection
  watch(playing, (isPlaying) => {
    if (isPlaying && networkDown.value) {
      log('Stream recovered, resetting reconnect state')
      _clearReconnectState()
    }
  })

  onMounted(() => {
    initialized.value = true
    _setupNetworkListeners()
    _startHeartbeat()
    start()
  })

  onBeforeMount(() => {
    _checkAutoplay()
  })

  onBeforeUnmount(() => {
    _cleanupNetworkListeners()
    _stopHeartbeat()
    _clearReconnectTimeout()
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

  const _clearReconnectTimeout = () => {
    if (reconnectTimeoutId) {
      clearTimeout(reconnectTimeoutId)
      reconnectTimeoutId = null
    }
  }

  const _clearReconnectState = () => {
    log('_clearReconnectState')
    _clearReconnectTimeout()
    toast.dismiss('reconnecting') // Always dismiss the toast
    networkDown.value = false
    reconnecting.value = false
    reconnectAttempts.value = 0
  }

  const _getReconnectDelay = () => {
    const index = Math.min(reconnectAttempts.value, RECONNECT_DELAYS.length - 1)
    return RECONNECT_DELAYS[index]
  }

  const _isReconnectSuccessful = () => {
    return playing.value || (readyToPlay.value && !paused.value)
  }

  const _handleReconnectSuccess = () => {
    log('Reconnect successful!')
    toast.dismiss('reconnecting')
    setTimeout(() => {
      toast.success('Connexion au flux audio restaurée', {
        duration: 3000,
      })
    }, 100)
    _clearReconnectState()
  }

  const _checkReconnectResult = () => {
    if (networkIssue.value && !stopped.value) {
      log('Reconnect failed, retrying...')
      _attemptReconnect()
    } else if (_isReconnectSuccessful()) {
      _handleReconnectSuccess()
    } else {
      // Still loading, double check after delay
      setTimeout(() => {
        if (_isReconnectSuccessful()) {
          toast.dismiss('reconnecting')
          _clearReconnectState()
        }
      }, RECONNECT_DOUBLE_CHECK_DELAY)
    }
  }

  const _attemptReconnect = () => {
    if (reconnecting.value || stopped.value) {
      log('Already reconnecting or stopped, skipping')
      return
    }

    if (reconnectAttempts.value >= MAX_RECONNECT_ATTEMPTS) {
      log('Max reconnect attempts reached')
      toast.dismiss('reconnecting') // Clear any existing toast
      toast.error('Impossible de reconnecter au flux audio. Veuillez recharger la page.', {
        duration: 10000,
        action: {
          label: 'Réessayer',
          onClick: () => {
            reconnectAttempts.value = 0
            _attemptReconnect()
          },
        },
      })
      return
    }

    reconnecting.value = true
    reconnectAttempts.value++
    const delay = _getReconnectDelay()

    log(`Reconnect attempt ${reconnectAttempts.value}/${MAX_RECONNECT_ATTEMPTS} in ${delay}ms`)

    // Always show/update the loading toast
    toast.loading('Reconnexion en cours...', {
      id: 'reconnecting',
      duration: Infinity,
    })

    _clearReconnectTimeout()
    reconnectTimeoutId = setTimeout(() => {
      log('Executing reconnect attempt')
      stop()

      setTimeout(() => {
        start()
        reconnecting.value = false
        setTimeout(_checkReconnectResult, RECONNECT_SUCCESS_CHECK_DELAY)
      }, RECONNECT_STOP_START_DELAY)
    }, delay)
  }

  const _setupNetworkListeners = () => {
    log('_setupNetworkListeners')

    // Browser online/offline events
    window.addEventListener('online', _handleOnline)
    window.addEventListener('offline', _handleOffline)

    // Page visibility (iOS background detection)
    document.addEventListener('visibilitychange', _handleVisibilityChange)
  }

  const _cleanupNetworkListeners = () => {
    log('_cleanupNetworkListeners')
    window.removeEventListener('online', _handleOnline)
    window.removeEventListener('offline', _handleOffline)
    document.removeEventListener('visibilitychange', _handleVisibilityChange)
  }

  const _handleOnline = () => {
    log('Browser back online')
    if (!stopped.value && initialized.value) {
      networkDown.value = true
      // Force immediate reconnection
      toast.loading('Réseau rétabli. Reconnexion...', {
        id: 'reconnecting',
        duration: Infinity,
      })
      // Reset attempts for faster reconnect
      reconnectAttempts.value = 0
      _attemptReconnect()
    }
  }

  const _handleOffline = () => {
    log('Browser went offline')
    if (!stopped.value && initialized.value) {
      networkDown.value = true
      // Immediately stop playback and network request
      if (audio.value) {
        audio.value.pause()
        audio.value.currentTime = 0
        audio.value.removeAttribute('src')
        audio.value.load() // This stops the network request
      }
      toast.loading('Connexion perdue. En attente du réseau...', {
        id: 'reconnecting',
        duration: Infinity,
      })
    }
  }

  const _handleVisibilityChange = () => {
    if (!document.hidden && networkDown.value && !stopped.value && initialized.value) {
      log('Page visible again, checking connection')
      setTimeout(() => {
        if (networkIssue.value) {
          _attemptReconnect()
        }
      }, VISIBILITY_RESTORE_DELAY)
    }
  }

  const _startHeartbeat = () => {
    log('_startHeartbeat')
    _stopHeartbeat()

    heartbeatIntervalId = setInterval(() => {
      if (playing.value && !stopped.value && !reconnecting.value) {
        // Check if stream is progressing
        if (currentTime.value === lastCurrentTime && currentTime.value > 0) {
          log('Heartbeat: stream appears stalled')
          networkDown.value = true
          _attemptReconnect()
        }
        lastCurrentTime = currentTime.value
      }
    }, HEARTBEAT_INTERVAL)
  }

  const _stopHeartbeat = () => {
    if (heartbeatIntervalId) {
      clearInterval(heartbeatIntervalId)
      heartbeatIntervalId = null
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
    reconnecting.value = defaultState.reconnecting
    reconnectAttempts.value = defaultState.reconnectAttempts
  }

  // Public methods

  const start = (unlock?: boolean) => {
    log('start')
    if (unlock) {
      _unlock()
    }
    if (stopped.value && !reconnecting.value) {
      stopped.value = false
      load(`${streamUrl}?t=${Date.now()}`)
      loadStarted.value = true
    }
  }

  const stop = () => {
    log('stop')
    if (audio.value) {
      stopped.value = true
      _clearReconnectState()
      _clearReconnectTimeout()
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
    reconnecting,
    reconnectAttempts,
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
