<script lang="ts" setup>
const config = useRuntimeConfig()
useLoadingStore()
useDaylightStore()
// const { toggleTheme } = useThemeStore()
const { current, currentVariant, themeVariant } = useThemeStoreRefs()
const { classes, isMobile: appIsMobile } = useAppStoreRefs()
const { isMobile: audioIsMobile, isLocked } = useAudioStoreRefs()
const { toggleMute, play, initPlaying } = useAudioStore()
const { liveQuery, metadata } = useMetadataStoreRefs()
const { snackbars } = useSnackbarStoreRefs()

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Tab":
      e.preventDefault()
      // toggleTheme()
      break
    case " ":
      toggleMute()
      break
    default:
      // e.preventDefault()
      break
  }
}

const browserIsSafari = () => !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/)

const browserIsMobile = () =>
  typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1

const browserCannotAutoplay = () => browserIsSafari() || browserIsMobile()

const handleUnlock = () => {
  if (audioIsMobile.value && isLocked.value) {
    play()
  }
}

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

watch(
  liveQuery,
  () => {
    updateMediaSession()
  },
  { deep: true }
)

onNuxtReady(() => {
  const isMobile = browserCannotAutoplay()
  appIsMobile.value = isMobile
  audioIsMobile.value = isMobile
})

onMounted(() => {
  initPlaying()
  initMediaSession()
  document.addEventListener("keydown", handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown)
})
</script>

<template>
  <v-app :theme="currentVariant" :class="classes" @click="handleUnlock">
    <VitePwaManifest />
    <NuxtLoadingIndicator :color="themeVariant.definition?.colors?.primary" />
    <AudioStream />
    <Theme :name="current" />
    <Notifier v-model="snackbars" />
    <VersionAnouncement />
  </v-app>
</template>
