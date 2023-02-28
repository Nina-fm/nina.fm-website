import { Howl, Howler } from "howler"

import { defineStore } from "pinia"

const debug = false

export const useAudioStore = defineStore("audio", () => {
  const config = useRuntimeConfig()
  const { streamUrl } = config.public
  const isLocked = ref<boolean>(true)
  const isPlaying = ref<boolean>(false)
  const isMuted = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const status = ref<"unloaded" | "loading" | "loaded" | undefined>()
  let stream: Howl | undefined

  Howler.autoSuspend = false
  Howler.html5PoolSize = 1

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
    stream?.load()
  }

  const unmute = () => {
    log("unmute")
    stream?.mute(false)
    isMuted.value = false
  }

  const mute = () => {
    log("mute")
    stream?.mute(true)
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
    stream?.play()
  }

  const pause = () => {
    log("pause")
    stream?.pause()
  }

  const stop = () => {
    log("stop")
    stream?.stop()
  }

  const togglePlay = () => {
    log("togglePlay")
    if (isPlaying.value) stop()
    else play()
  }

  const update = () => {
    log("update")
    status.value = stream?.state()
    isPlaying.value = stream?.playing() ?? false
  }

  onNuxtReady(() => {
    stream = new Howl({
      src: [streamUrl],
      html5: true,
      autoplay: true,
    })

    stream.on("load", () => {
      log("on stream load")
      isLoading.value = false
      update()
    })
    stream.on("loaderror", () => {
      log("on stream loaderror")
      update()
    })
    stream.on("pause", () => {
      log("on stream pause")
      update()
    })
    stream.on("play", () => {
      log("on stream play")
      isLocked.value = false
      isLoading.value = false
      update()
    })
    stream.on("playerror", () => {
      log("on stream playerror")
      stream?.once("unlock", play)
      update()
    })
    stream.on("stop", () => {
      log("on stream stop")
      update()
    })
    stream.on("unlock", () => {
      log("on stream unlock")
      isLocked.value = false
      update()
    })
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
  import.meta.hot.accept(acceptHMRUpdate(useAudioStore, import.meta.hot))
}
