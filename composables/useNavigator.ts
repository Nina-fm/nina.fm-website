export const useNavigator = () => {
  const config = useRuntimeConfig()
  const { toggleMute } = useAudioStore()
  const { liveQuery, metadata } = useMetadataStoreRefs()
  const wakeLock = reactive(useWakeLock())

  const isSafari = () => !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/)

  const isMobile = () => typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1

  const cannotAutoplay = () => isSafari() || isMobile()

  const updateMediaSession = () => {
    if (
      "mediaSession" in navigator &&
      navigator.mediaSession.metadata &&
      liveQuery.value?.authors &&
      liveQuery.value.name
    ) {
      navigator.mediaSession.metadata.title = liveQuery.value.name
      navigator.mediaSession.metadata.artist = liveQuery.value.authors
      navigator.mediaSession.metadata.artwork = [
        { src: metadata.value?.cover_url ? `${metadata.value.cover_url}` : `/icon-large.png` },
      ]
    }
  }

  const initMediaSession = () => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: liveQuery.value?.name,
        artist: liveQuery.value?.authors,
        album: config.public.sitename,
        artwork: [{ src: metadata.value?.cover_url ? `${metadata.value.cover_url}` : `/icon-large.png` }],
      })

      navigator.mediaSession.setActionHandler("play", () => toggleMute(false))
      navigator.mediaSession.setActionHandler("pause", () => toggleMute(true))
      navigator.mediaSession.setActionHandler("stop", () => toggleMute(true))
    }
  }

  const initWakeLock = async () => {
    await wakeLock.request("screen")
  }

  const initNavigator = () => {
    initMediaSession()
    initWakeLock()
  }

  watch(
    liveQuery,
    () => {
      updateMediaSession()
    },
    { deep: true }
  )

  return {
    wakeLock,
    isSafari,
    isMobile,
    cannotAutoplay,
    updateMediaSession,
    initMediaSession,
    initWakeLock,
    initNavigator,
  }
}
