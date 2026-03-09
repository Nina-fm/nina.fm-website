import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { detectAutoplay } from '~/lib/browser/detectAutoplay'
import { getArtwork } from '~/lib/mediasession/artwork'
import { useAudioStore } from '~/stores/audio'
import { useMetadataStoreRefs } from '~/stores/metadata'

export const useBrowserStore = defineStore('browser', () => {
  const config = useRuntimeConfig()
  const { toggleMute } = useAudioStore()
  const { metadata } = useMetadataStoreRefs()

  // Client-only refs
  const isSupported = ref(false)
  const canAutoplay = ref<boolean>(true)

  // Client-only composables - initialized in init()
  let lockOrientation: ((orientation: 'portrait-primary') => Promise<void>) | null = null
  let wakeLock: ReturnType<typeof useWakeLock> | null = null

  const _getArtwork = (filepath?: unknown): MediaImage[] => getArtwork(filepath, window.location.origin)

  const updateMediaSession = () => {
    if (!('mediaSession' in navigator) || !metadata.value) return

    if (!navigator.mediaSession.metadata) {
      // Pas encore de metadata — initialiser complètement
      initMediaSession()
      return
    }

    navigator.mediaSession.metadata.title = metadata.value.name
    navigator.mediaSession.metadata.artist = metadata.value.authors_text || 'Nina.fm'
    navigator.mediaSession.metadata.artwork = _getArtwork(metadata.value.cover_url)
  }

  const initMediaSession = () => {
    if (!('mediaSession' in navigator)) return

    try {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: metadata.value?.name || 'Nina.fm',
        artist: metadata.value?.authors_text || 'Nina.fm',
        album: config.public.sitename,
        artwork: _getArtwork(metadata.value?.cover_url),
      })

      navigator.mediaSession.setActionHandler('play', () => toggleMute(false))
      navigator.mediaSession.setActionHandler('pause', () => toggleMute(true))
      navigator.mediaSession.setActionHandler('stop', () => toggleMute(true))
    } catch (error) {
      console.error('Failed to initialize Media Session:', error)
    }
  }

  const initWakeLock = async () => {
    if (wakeLock) {
      await wakeLock.request('screen')
    }
  }

  const initOrientation = async () => {
    if (isSupported.value && lockOrientation) {
      try {
        await lockOrientation('portrait-primary')
      } catch {
        // L'API peut être supportée mais échouer sur certains appareils (desktop, etc.)
      }
    }
  }

  const checkAutoplay = async () => {
    const value = await detectAutoplay()
    canAutoplay.value = value
  }

  const init = () => {
    const screenOrientation = useScreenOrientation()
    isSupported.value = screenOrientation.isSupported.value
    lockOrientation = screenOrientation.lockOrientation
    wakeLock = useWakeLock()

    initMediaSession()
    initWakeLock()
    initOrientation()
  }

  watch(
    metadata,
    () => {
      if (import.meta.client) {
        updateMediaSession()
      }
    },
    { deep: true },
  )

  return {
    canAutoplay,
    checkAutoplay,
    updateMediaSession,
    init,
  }
})

export const useBrowserStoreRefs = () => storeToRefs(useBrowserStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBrowserStore, import.meta.hot))
}
