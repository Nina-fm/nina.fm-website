import { Howl, Howler } from "howler"

import { defineStore } from "pinia"
import { render } from "vue"

interface Monitor {
  dataArray: Uint8Array | null
}

export const useAudioStore = defineStore("audio", () => {
  const config = useRuntimeConfig()
  const { streamUrl } = config.public
  const isLocked = ref<boolean>(true)
  const isPlaying = ref<boolean>(false)
  const isMuted = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const status = ref<"unloaded" | "loading" | "loaded" | undefined>()
  const audioContext = ref<AudioContext>()
  let stream: Howl | undefined

  Howler.autoSuspend = false
  Howler.html5PoolSize = 1

  const load = () => {
    console.log("load")
    isLoading.value = true
    stream?.load()
  }

  const unmute = () => {
    console.log("unmute")
    stream?.mute(false)
    isMuted.value = false
  }

  const mute = () => {
    console.log("mute")
    stream?.mute(true)
    isMuted.value = true
  }

  const toggleMute = () => {
    console.log("toggleMute")
    if (isMuted.value) unmute()
    else mute()
  }

  const play = () => {
    console.log("play")
    isLoading.value = true
    stream?.play()
  }

  const pause = () => {
    console.log("pause")
    stream?.pause()
  }

  const stop = () => {
    console.log("stop")
    stream?.stop()
  }

  const togglePlay = () => {
    console.log("togglePlay")
    if (isPlaying.value) stop()
    else play()
  }

  const update = () => {
    console.log("update")
    status.value = stream?.state()
    isPlaying.value = stream?.playing() ?? false
  }

  const updateContext = () => {
    console.log("set context")
    audioContext.value = Howler.ctx
  }

  onNuxtReady(() => {
    stream = new Howl({
      src: [streamUrl],
      html5: true,
    })

    stream.on("load", () => {
      console.log("on stream load")
      updateContext()
      isLoading.value = false
      update()
    })
    stream.on("loaderror", () => {
      console.log("on stream loaderror")
      update()
    })
    stream.on("pause", () => {
      console.log("on stream pause")
      update()
    })
    stream.on("play", () => {
      console.log("on stream play")
      isLoading.value = false
      update()
    })
    stream.on("playerror", () => {
      console.log("on stream playerror")
      stream?.once("unlock", play)
      update()
    })
    stream.on("stop", () => {
      console.log("on stream stop")
      update()
    })
    stream.on("unlock", () => {
      console.log("on stream unlock")
      isLocked.value = false
      // play();
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
    audioContext,
  }
})

export const useAudioStoreRefs = () => storeToRefs(useAudioStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAudioStore, import.meta.hot))
}
