<script lang="ts" setup>
useLoadingStore()
useDaylightStore()
useMetadataStore()
useAudioStoreRefs()
const { snackbars } = useSnackbarStoreRefs()
// const { toggleTheme } = useThemeStore()
const { current, currentVariant, themeVariant } = useThemeStoreRefs()
const { classes } = useAppStoreRefs()
const { toggleMute } = useAudioStore()

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

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown)
})
</script>

<template>
  <v-app :theme="currentVariant" :class="classes">
    <NuxtLoadingIndicator :color="themeVariant.definition?.colors?.primary" />
    <Theme :name="current" />
    <Notifier v-model="snackbars" />
  </v-app>
</template>
