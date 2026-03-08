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

  // Client-only composables - initialized in init()
  let lockOrientation: ((orientation: 'portrait-primary') => Promise<void>) | null = null
  let wakeLock: ReturnType<typeof useWakeLock> | null = null

  /**
   * Retourne un tableau d'artwork avec plusieurs tailles déclarées.
   * Les head units (voiture, etc.) sélectionnent la taille la plus adaptée.
   * Pour les covers de taille inconnue, on déclare plusieurs entrées
   * pointant vers la même URL — c'est la pratique recommandée MediaSession.
   */
  const getArtwork = (filepath?: unknown): MediaImage[] => {
    const defaultArtwork = `${window.location.origin}/artwork.png`
    const src = typeof filepath === 'string' && filepath ? filepath : defaultArtwork
    const isDefault = src === defaultArtwork
    const type = mime.getType(src) || 'image/png'

    if (isDefault) {
      // artwork.png est 1024×1024 — on déclare la vraie taille
      return [{ src, sizes: '1024x1024', type }]
    }

    // Pour les covers API (taille inconnue), on déclare plusieurs tailles
    // pointant vers la même URL pour maximiser la compatibilité
    return [
      { src, sizes: '96x96', type },
      { src, sizes: '128x128', type },
      { src, sizes: '192x192', type },
      { src, sizes: '256x256', type },
      { src, sizes: '384x384', type },
      { src, sizes: '512x512', type },
    ]
  }

  const updateMediaSession = () => {
    if (!('mediaSession' in navigator) || !metadata.value) return

    if (!navigator.mediaSession.metadata) {
      // Pas encore de metadata — initialiser complètement
      initMediaSession()
      return
    }

    navigator.mediaSession.metadata.title = metadata.value.name
    navigator.mediaSession.metadata.artist = metadata.value.authors_text || 'Nina.fm'
    navigator.mediaSession.metadata.artwork = getArtwork(metadata.value.cover_url)
  }

  const initMediaSession = () => {
    if (!('mediaSession' in navigator)) return

    try {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: metadata.value?.name || 'Nina.fm',
        artist: metadata.value?.authors_text || 'Nina.fm',
        album: config.public.sitename,
        artwork: getArtwork(metadata.value?.cover_url),
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
