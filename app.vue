<script lang="ts" setup>
useLoadingStore()
useDaylightStore()
useMetadataStore()
const { snackbars } = useSnackbarStoreRefs()
// const { toggleTheme } = useThemeStore()
const { current, currentVariant, themeVariant } = useThemeStoreRefs()
const { classes, isMobile: appIsMobile } = useAppStoreRefs()
const { isMobile: audioIsMobile, isLocked } = useAudioStoreRefs()
const { toggleMute, play } = useAudioStore()

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

onNuxtReady(() => {
  const isMobile = browserCannotAutoplay()
  appIsMobile.value = isMobile
  audioIsMobile.value = isMobile
})

onMounted(() => {
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
