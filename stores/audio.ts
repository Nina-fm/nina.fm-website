import { acceptHMRUpdate, defineStore } from 'pinia'

const networkStatus = [
  'NETWORK_EMPTY: There is no data yet. Also, readyState is HAVE_NOTHING.',
  'NETWORK_IDLE: HTMLMediaElement is active and has selected a resource, but is not using the network.',
  'NETWORK_LOADING: The browser is downloading HTMLMediaElement data.',
  'NETWORK_NO_SOURCE: No HTMLMediaElement src found.',
  'undefined',
]

const readyStatus = [
  'HAVE_NOTHING: No information is available about the media resource.',
  'HAVE_METADATA: Enough of the media resource has been retrieved that the metadata attributes are initialized. Seeking will no longer raise an exception.',
  'HAVE_CURRENT_DATA: Data is available for the current playback position, but not enough to actually play more than one frame.',
  'HAVE_FUTURE_DATA: Data for the current playback position as well as for at least a little bit of time into the future is available.',
  'HAVE_ENOUGH_DATA: Enough data is available—and the download rate is high enough—that the media can be played through to the end without interruption.',
]

export const useAudioStore = defineStore('audio', () => {
  const config = useRuntimeConfig()
  const { debug } = useDebugStoreRefs()
  const { log } = useDebugStore()

  const blankSound = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA='
  const streamRef = ref<HTMLAudioElement | undefined>()
  const streamUrl = ref<string | undefined>()
  const initialized = ref<boolean>(false)
  const isMobile = ref<boolean>(false)
  const isPlaying = ref<boolean>(false)
  const isStarted = ref<boolean>(false)
  const isKilled = ref<boolean>(false)
  const isMuted = ref<boolean>(false)
  const isLoading = computed(() => !isPlaying.value && ((isMobile.value && initialized.value) || !initialized.value))
  const isLocked = computed(() => isMobile.value && !initialized.value)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioLog = (...params: any[]) => {
    if (debug.value) {
      log(...params)
    }
  }

  const unlock = () => {
    if (isMobile.value && isLocked.value) {
      play()
    }
  }

  const play = () => {
    audioLog('play')
    if (streamRef.value && !initialized.value) {
      toggleMute(false)
      streamRef.value.play()
      initialized.value = true
    }
  }

  const toggleMute = (val?: boolean) => {
    audioLog('toggleMute')
    if (streamRef.value) {
      const value = streamRef.value.muted
      const newValue = val === undefined ? !value : val
      streamRef.value.muted = newValue
      isMuted.value = newValue
    }
  }

  const updateStatus = () => {
    if (!isKilled.value) {
      audioLog('updateStatus', {
        isPlaying:
          !!streamRef.value &&
          isStarted.value &&
          !streamRef.value.paused &&
          !streamRef.value.ended &&
          streamRef.value.readyState > 2,
        started: isStarted.value,
        currentTime: streamRef.value?.currentTime,
        paused: streamRef.value?.paused,
        ended: streamRef.value?.ended,
        readyState: streamRef.value ? (readyStatus?.[streamRef.value?.readyState] ?? 'undefined') : 'undefined',
      })
    }

    isPlaying.value =
      !!streamRef.value &&
      isStarted.value &&
      !streamRef.value.paused &&
      !streamRef.value.ended &&
      streamRef.value.readyState > 2
  }

  const checkStreamAlive = () => {
    if (!isKilled.value) {
      if (!isMobile.value && !isPlaying.value) {
        audioLog('checkStreamAlive -> launch', {
          audio: streamRef.value
            ? {
                currentSrc: streamRef.value?.currentSrc,
                error: streamRef.value?.error
                  ? `Error ${streamRef.value?.error?.code}: ${streamRef.value?.error?.message}`
                  : 'null',
                networkState: networkStatus?.[streamRef.value?.networkState] ?? 'undefined',
                playbackRate: streamRef.value?.playbackRate,
                readyState: readyStatus?.[streamRef.value?.readyState] ?? 'undefined',
                buffered: streamRef.value?.buffered,
              }
            : null,
        })
        launch()
      } else {
        audioLog('checkStreamAlive -> setTimeout')
        setTimeout(checkStreamAlive, config.public.streamRefreshTime)
      }
    }
  }

  const launch = () => {
    audioLog('launch')
    if (streamRef.value) {
      streamRef.value.load()
      setTimeout(checkStreamAlive, config.public.streamRefreshTime)
    }
  }

  const kill = async () => {
    audioLog('kill')
    isKilled.value = true
    isStarted.value = false
    if (streamRef.value) {
      streamRef.value.src = blankSound
      streamRef.value.load()
      await nextTick()
      streamRef.value = undefined
    }
  }

  const relaunch = async () => {
    audioLog('relaunch')
    kill()
    await nextTick()
    isKilled.value = false
    await nextTick()
    initPlaying()
  }

  const initPlaying = async () => {
    if (streamRef.value && streamUrl.value && !isKilled.value) {
      audioLog('initPlaying')
      streamRef.value.src = streamUrl.value
      await nextTick()
      launch()
      streamRef.value.oncanplay = () => {
        audioLog('oncanplay')
        if (!isMobile.value) play()
        updateStatus()
      }
      streamRef.value.ontimeupdate = () => {
        if (!isStarted.value && streamRef.value && streamRef.value.currentTime > 0) {
          audioLog('ontimeupdate')
          isStarted.value = true
          updateStatus()
        }
      }
      streamRef.value.onpause = () => {
        audioLog('onpause')
        updateStatus()
      }
      streamRef.value.onplay = () => {
        audioLog('onplay')
        updateStatus()
      }
      streamRef.value.onplaying = () => {
        audioLog('onplaying')
        updateStatus()
      }
      streamRef.value.onended = () => {
        audioLog('onended')
        if (isStarted.value) kill()
        updateStatus()
      }
      // streamRef.value.onloadeddata = () => {
      //   audioLog("onloadeddata")
      //   updateStatus()
      // }
      // streamRef.value.onloadedmetadata = () => {
      //   audioLog("onloadedmetadata")
      //   updateStatus()
      // }
      // streamRef.value.onemptied = () => {
      //   audioLog("onemptied")
      //   updateStatus()
      // }
      // streamRef.value.onwaiting = () => {
      //   audioLog("onwaiting")
      //   updateStatus()
      // }
      streamRef.value.onstalled = () => {
        audioLog('onstalled')
        if (isStarted.value) kill()
        updateStatus()
      }
      streamRef.value.onsuspend = () => {
        audioLog('onsuspend')
        if (isStarted.value) kill()
        updateStatus()
      }
    }
  }

  return {
    streamRef,
    streamUrl,
    isMobile,
    isLoading,
    isLocked,
    isPlaying,
    isStarted,
    isMuted,
    isKilled,
    play,
    kill,
    unlock,
    relaunch,
    toggleMute,
    initPlaying,
  }
})

export const useAudioStoreRefs = () => storeToRefs(useAudioStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useAudioStore, import.meta.hot))
}
