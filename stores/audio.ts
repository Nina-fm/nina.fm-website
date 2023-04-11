import { acceptHMRUpdate, defineStore } from "pinia"

const debug = true

export const useAudioStore = defineStore("audio", () => {
  const config = useRuntimeConfig()
  const blankSound = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA="
  const streamRef = ref<HTMLAudioElement | undefined>()
  const initialized = ref<boolean>(false)
  const isMobile = ref<boolean>(false)
  const isPlaying = ref<boolean>(false)
  const isStarted = ref<boolean>(false)
  const isMuted = ref<boolean>(false)
  const isLoading = computed(() => !isPlaying.value)
  const isLocked = computed(() => isMobile.value && !initialized.value)
  const streamUrl = computed(() => (isMobile.value && isLocked.value ? blankSound : config.public.streamUrl))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const log = (...params: any[]) => {
    if (debug) {
      console.log("[useAudioStore]", ...params)
    }
  }

  watch(isLocked, (value) => {
    log({ isLocked: value })
    if (!value) play()
  })

  const play = async () => {
    log("play")
    if (streamRef.value && !initialized.value) {
      streamRef.value?.play()
      initialized.value = true
    }
  }

  const toggleMute = () => {
    if (streamRef.value) {
      const value = streamRef.value.muted
      streamRef.value.muted = !value
      isMuted.value = !value
    }
  }

  const updateStatus = () => {
    log("updateStatus", {
      isPlaying:
        !!streamRef.value &&
        isStarted.value &&
        !streamRef.value.paused &&
        !streamRef.value.ended &&
        streamRef.value.readyState > 2,
      stream: streamRef.value,
      started: isStarted.value,
      currentTime: streamRef.value?.currentTime,
      paused: streamRef.value?.paused,
      ended: streamRef.value?.ended,
      readyState: streamRef.value?.readyState,
    })
    // if (streamRef.value?.paused) {
    //   streamRef.value.play()
    // }
    isPlaying.value =
      !!streamRef.value &&
      isStarted.value &&
      !streamRef.value.paused &&
      !streamRef.value.ended &&
      streamRef.value.readyState > 2
  }

  const checkStreamAlive = () => {
    if (!isMobile.value && !isPlaying.value) {
      log("checkStreamAlive -> launch")
      launch()
    } else {
      log("checkStreamAlive -> setTimeout")
      setTimeout(checkStreamAlive, config.public.streamRefreshTime)
    }
  }

  const launch = () => {
    log("launch")
    if (streamRef.value) {
      streamRef.value.src = streamUrl.value
      streamRef.value.load()
      setTimeout(checkStreamAlive, config.public.streamRefreshTime)
    }
  }

  const kill = () => {
    isStarted.value = false
    if (streamRef.value) {
      streamRef.value.src = blankSound
      streamRef.value.load()
    }
  }

  const initPlaying = () => {
    if (streamRef.value) {
      log("initPlaying")
      launch()
      streamRef.value.oncanplay = () => {
        log("oncanplay")
        if (!isMobile.value) play()
        updateStatus()
      }
      streamRef.value.ontimeupdate = () => {
        if (!isStarted.value && streamRef.value && streamRef.value.currentTime > 0) {
          log("ontimeupdate")
          isStarted.value = true
          updateStatus()
        }
      }
      streamRef.value.onpause = () => {
        log("onpause")
        updateStatus()
      }
      streamRef.value.onplay = () => {
        log("onplay")
        updateStatus()
      }
      streamRef.value.onplaying = () => {
        log("onplaying")
        updateStatus()
      }
      streamRef.value.onended = () => {
        log("onended")
        if (isStarted.value) kill()
        updateStatus()
      }
      // streamRef.value.onloadeddata = () => {
      //   log("onloadeddata")
      //   updateStatus()
      // }
      // streamRef.value.onloadedmetadata = () => {
      //   log("onloadedmetadata")
      //   updateStatus()
      // }
      // streamRef.value.onemptied = () => {
      //   log("onemptied")
      //   updateStatus()
      // }
      // streamRef.value.onwaiting = () => {
      //   log("onwaiting")
      //   updateStatus()
      // }
      streamRef.value.onstalled = () => {
        log("onstalled")
        if (isStarted.value) kill()
        updateStatus()
      }
      streamRef.value.onsuspend = () => {
        log("onsuspend")
        if (isStarted.value) kill()
        updateStatus()
      }
    }
  }

  return {
    streamUrl,
    streamRef,
    isMobile,
    isLoading,
    isLocked,
    isPlaying,
    isStarted,
    isMuted,
    play,
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
