import { acceptHMRUpdate, defineStore } from "pinia"

const debug = false

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
    isPlaying.value =
      !!streamRef.value &&
      isStarted.value &&
      !streamRef.value.paused &&
      !streamRef.value.ended &&
      streamRef.value.readyState > 2
  }

  const checkStreamAlive = () => {
    if (!isMobile.value && !isPlaying) {
      initPlaying()
    } else {
      setTimeout(checkStreamAlive, config.public.streamRefreshTime)
    }
  }

  const initPlaying = () => {
    if (streamRef.value) {
      streamRef.value.load()
      streamRef.value.oncanplay = () => {
        if (!isMobile.value) play()

        setTimeout(checkStreamAlive, config.public.streamRefreshTime)
      }
      streamRef.value.ontimeupdate = () => {
        if (!isStarted.value && streamRef.value && streamRef.value.currentTime > 0) {
          isStarted.value = true
          updateStatus()
        }
      }
      streamRef.value.onpause = () => updateStatus()
      streamRef.value.onplay = () => updateStatus()
      streamRef.value.onplaying = () => updateStatus()
      streamRef.value.onended = () => updateStatus()
      streamRef.value.onloadeddata = () => updateStatus()
      streamRef.value.onloadedmetadata = () => updateStatus()
      streamRef.value.onemptied = () => updateStatus()
      streamRef.value.onstalled = () => updateStatus()
      streamRef.value.onwaiting = () => updateStatus()
    }
  }

  onNuxtReady(() => {
    initPlaying()
  })

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
  }
})

export const useAudioStoreRefs = () => storeToRefs(useAudioStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useAudioStore, import.meta.hot))
}
