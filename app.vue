<script lang="ts" setup>
useLoadingStore()
useDaylightStore()
// const { toggleTheme } = useThemeStore()
const { current, currentVariant, themeVariant } = useThemeStoreRefs()
const { classes, isMobile: appIsMobile } = useAppStoreRefs()
const { cannotAutoplay, initNavigator } = useNavigator()
const { isMobile: audioIsMobile } = useAudioStoreRefs()
const { toggleMute, unlock, initPlaying } = useAudioStore()
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

onNuxtReady(() => {
  const isMobile = cannotAutoplay()
  appIsMobile.value = isMobile
  audioIsMobile.value = isMobile
})

onMounted(() => {
  initPlaying()
  initNavigator()
  document.addEventListener("keydown", handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown)
})
</script>

<template>
  <v-app :theme="currentVariant" :class="classes" @click="() => unlock()">
    <VitePwaManifest />
    <NuxtLoadingIndicator :color="themeVariant.definition?.colors?.primary" />
    <AudioStream />
    <Theme :name="current" />
    <Notifier v-model="snackbars" />
    <VersionAnouncement />
  </v-app>
</template>
