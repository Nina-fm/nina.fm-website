import { Howl, Howler } from "howler"
import { acceptHMRUpdate, defineStore } from "pinia"

const debug = true

Howler.html5PoolSize = 1
Howler.autoSuspend = false

export const useAudioStore = defineStore("audio", () => {
  const config = useRuntimeConfig()
  const { streamUrl } = config.public
  const isLocked = ref<boolean>(true)
  const isPlaying = ref<boolean>(false)
  const isMuted = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const status = ref<"unloaded" | "loading" | "loaded" | undefined>()
  let stream: Howl | undefined

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

  const unlock = () => {
    console.log("unlock")
    stream?.once("unlock", () => {
      if (isLocked.value) {
        isLocked.value = false
        play()
      }
    })
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
      onload: () => {
        log("on stream load")
        isLoading.value = false
        update()
      },
      onloaderror: () => {
        log("on stream loaderror")
        play()
        update()
      },
      onpause: () => {
        log("on stream pause")
        update()
      },
      onplay: () => {
        log("on stream play")
        isLocked.value = false
        isLoading.value = false
        update()
      },
      onplayerror: () => {
        log("on stream playerror")
        if (isLocked.value) unlock()
        else play()
        update()
      },
      onstop: () => {
        log("on stream stop")
        update()
      },
      onunlock: () => {
        log("on stream unlock")
        isLocked.value = false
        update()
      },
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useAudioStore, import.meta.hot))
}
