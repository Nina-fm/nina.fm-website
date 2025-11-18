import mime from 'mime'
import detectAutoplay from '~/utils/detectAutoplay'

export const useBrowserStore = defineStore('browser', () => {
  const config = useRuntimeConfig()
  const { toggleMute } = useAudioStore()
  const { metadata } = useMetadataStoreRefs()
  const { isSupported, lockOrientation } = useScreenOrientation()

  const wakeLock = reactive(useWakeLock())
  const canAutoplay = ref<boolean>(true)

  const getArtwork = async (filepath?: unknown) => {
    const file = typeof filepath !== 'string' || !filepath ? `/artwork.png` : `${filepath}`
    const type = mime.getType(file)
    const src = await convertImageToBase64(file)
    return [
      {
        src,
        ...(type !== null ? { type } : {}),
      },
    ]
  }

  const updateMediaSession = async () => {
    if ('mediaSession' in navigator && navigator.mediaSession.metadata && metadata.value) {
      navigator.mediaSession.metadata.title = metadata.value.name
      navigator.mediaSession.metadata.artist = metadata.value.authors_text || 'Nina.fm'
      navigator.mediaSession.metadata.artwork = await getArtwork(metadata.value.cover_url)
    }
  }

  const initMediaSession = async () => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: metadata.value?.name || 'Nina.fm',
        artist: metadata.value?.authors_text || 'Nina.fm',
        album: config.public.sitename,
        artwork: await getArtwork(metadata.value?.cover_url),
      })

      navigator.mediaSession.setActionHandler('play', () => toggleMute(false))
      navigator.mediaSession.setActionHandler('pause', () => toggleMute(true))
      navigator.mediaSession.setActionHandler('stop', () => toggleMute(true))
    }
  }

  const initWakeLock = async () => {
    await wakeLock.request('screen')
  }

  const initOrientation = async () => {
    if (isSupported.value) {
      await lockOrientation('portrait-primary')
    }
  }

  const checkAutoplay = async () => {
    const value = await detectAutoplay()
    canAutoplay.value = value
  }

  const init = () => {
    initMediaSession()
    initWakeLock()
    initOrientation()
  }

  watch(
    metadata,
    () => {
      updateMediaSession()
    },
    { deep: true },
  )

  onBeforeMount(() => {
    checkAutoplay()
  })

  return {
    // State
    canAutoplay,
    // Actions
    updateMediaSession,
    init,
  }
})

export const useBrowserStoreRefs = () => storeToRefs(useBrowserStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBrowserStore, import.meta.hot))
}
