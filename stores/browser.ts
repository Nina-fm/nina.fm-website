import mime from 'mime'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { useAudioStore } from '~/stores/audio'
import { useMetadataStoreRefs } from '~/stores/metadata'
import detectAutoplay from '~/utils/detectAutoplay'

export const useBrowserStore = defineStore('browser', () => {
  const config = useRuntimeConfig()
  const { toggleMute } = useAudioStore()
  const { metadata } = useMetadataStoreRefs()

  // Client-only refs
  const isSupported = ref(false)
  const canAutoplay = ref<boolean>(true)

  // Client-only composables - will be initialized in onMounted
  let lockOrientation: ((orientation: 'portrait-primary') => Promise<void>) | null = null
  let wakeLock: ReturnType<typeof useWakeLock> | null = null

  const getArtwork = async (filepath?: unknown) => {
    try {
      // Fallback to default artwork
      const defaultArtwork = `${window.location.origin}/artwork.png`
      const file = typeof filepath !== 'string' || !filepath ? defaultArtwork : filepath

      // MediaSession API accepte les URLs directes sans conversion base64
      // Utiliser directement l'URL est plus performant et évite les problèmes CORS
      const type = mime.getType(file)

      return [
        {
          src: file,
          sizes: '512x512',
          ...(type !== null ? { type } : {}),
        },
      ]
    } catch (error) {
      console.error('Failed to get artwork:', error)
      // Fallback sur l'artwork par défaut
      return [
        {
          src: `${window.location.origin}/artwork.png`,
          sizes: '512x512',
          type: 'image/png',
        },
      ]
    }
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
      try {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: metadata.value?.name || 'Nina.fm',
          artist: metadata.value?.authors_text || 'Nina.fm',
          album: config.public.sitename,
          artwork: await getArtwork(metadata.value?.cover_url),
        })

        navigator.mediaSession.setActionHandler('play', () => toggleMute(false))
        navigator.mediaSession.setActionHandler('pause', () => toggleMute(true))
        navigator.mediaSession.setActionHandler('stop', () => toggleMute(true))
      } catch (error) {
        console.error('Failed to initialize Media Session:', error)
      }
    }
  }

  const initWakeLock = async () => {
    if (import.meta.client && wakeLock) {
      await wakeLock.request('screen')
    }
  }

  const initOrientation = async () => {
    if (import.meta.client && isSupported.value && lockOrientation) {
      await lockOrientation('portrait-primary')
    }
  }

  const checkAutoplay = async () => {
    const value = await detectAutoplay()
    canAutoplay.value = value
  }

  const init = () => {
    // Initialize client-only features
    if (import.meta.client) {
      const screenOrientation = useScreenOrientation()
      isSupported.value = screenOrientation.isSupported.value
      lockOrientation = screenOrientation.lockOrientation
      wakeLock = useWakeLock()
    }

    initMediaSession()
    initWakeLock()
    initOrientation()
  }

  // Initialize when component mounts
  onMounted(() => {
    init()
  })

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
