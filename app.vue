<script lang="ts" setup>
useLoadingStore()
useDaylightStore()
useMetadataStore()
const { isMuted } = useAudioStoreRefs()
const { snackbars } = useSnackbarStoreRefs()
const { current, currentVariant, themeVariant } = useThemeStoreRefs()
const classes = reactive({
  dark: themeVariant.value.definition?.dark,
  muted: isMuted.value,
})
</script>

<template>
  <v-app :theme="currentVariant" :class="classes">
    <NuxtLoadingIndicator :color="themeVariant.definition?.colors?.primary" />
    <ThemeToggler />
    <Theme :name="current" />
    <Notifier v-model="snackbars" />
  </v-app>
</template>
