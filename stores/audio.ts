import { Howl, Howler } from "howler"
import { acceptHMRUpdate, defineStore } from "pinia"

Howler.autoSuspend = false
const debug = true

export const useAudioStore = defineStore("audio", () => {
  const config = useRuntimeConfig()
  const { streamUrl } = config.public
  const isLocked = ref<boolean>(true)
  const isPlaying = ref<boolean>(false)
  const isMuted = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const initialized = ref<boolean>(false)
  const status = ref<"unloaded" | "loading" | "loaded" | undefined>()
  const stream = ref<Howl | undefined>()

  watchEffect(() => {
    if (initialized.value) update()

    console.log({
      isLocked: isLocked.value,
      isPlaying: isPlaying.value,
      isMuted: isMuted.value,
      isLoading: isLoading.value,
      status: status.value,
    })
  })

  watch(
    stream,
    () => {
      update()
    },
    { deep: true }
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const log = (...params: any[]) => {
    if (debug) {
      console.log(...params)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const load = () => {
    log("load")
    isLoading.value = true
    stream.value?.load()
  }

  const unload = () => {
    log("unload")
    isLoading.value = false
    stream.value?.unload()
  }

  const unmute = () => {
    log("unmute")
    stream.value?.mute(false)
    isMuted.value = false
  }

  const mute = () => {
    log("mute")
    stream.value?.mute(true)
    isMuted.value = true
  }

  const toggleMute = () => {
    log("toggleMute")
    if (isMuted.value) unmute()
    else mute()
  }

  const play = () => {
    log("play")
    isLoading.value = true
    stream.value?.play()
  }

  const pause = () => {
    log("pause")
    stream.value?.pause()
  }

  const stop = () => {
    log("stop")
    stream.value?.stop()
  }

  const togglePlay = () => {
    log("togglePlay")
    if (isPlaying.value) stop()
    else play()
  }

  const unlock = () => {
    console.log("unlock")
    stream.value?.once("unlock", () => {
      if (isLocked.value) {
        isLocked.value = false
        play()
      }
    })
  }

  const update = () => {
    log("update")
    status.value = stream.value?.state()
    isPlaying.value = stream.value?.playing() ?? false
  }

  onNuxtReady(() => {
    const audio = new Howl({
      src: [streamUrl],
      format: ["mp3"],
      html5: true,
      autoplay: true,
      // onload: () => {
      //   log("on stream load")
      //   isLoading.value = false
      // },
      // onloaderror: (id: unknown, err: unknown) => {
      //   log("on stream loaderror", { id }, { err })
      //   stop()
      //   unload()
      //   play()
      // },
      // onpause: () => {
      //   log("on stream pause")
      // },
      // onplay: () => {
      //   log("on stream play")
      //   isLocked.value = false
      //   isLoading.value = false
      // },
      onplayerror: (id: unknown, err: unknown) => {
        log("on stream playerror", { id }, { err })
        if (isLocked.value) unlock()
        else play()
      },
      // onstop: () => {
      //   log("on stream stop")
      //   unload()
      // },
      // onunlock: () => {
      //   log("on stream unlock")
      //   isLocked.value = false
      // },
    })
    console.log({ Howler })
    stream.value = audio
    initialized.value = true
  })

  return {
    stream,
    isLoading,
    isLocked,
    isPlaying,
    isMuted,
    status,
    play,
    pause,
    mute,
    togglePlay,
    toggleMute,
  }
})

export const useAudioStoreRefs = () => storeToRefs(useAudioStore())

if (import.meta.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useAudioStore, import.meta.hot))
}
