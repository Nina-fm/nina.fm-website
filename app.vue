<script lang="ts" setup>
useLoadingStore()
useDaylightStore()
useMetadataStore()
useAudioStoreRefs()
const { snackbars } = useSnackbarStoreRefs()
const { current, currentVariant, themeVariant } = useThemeStoreRefs()
const { classes } = useAppStoreRefs()
</script>

<template>
  <v-app :theme="currentVariant" :class="classes">
    <NuxtLoadingIndicator :color="themeVariant.definition?.colors?.primary" />
    <ThemeToggler />
    <Theme :name="current" />
    <Notifier v-model="snackbars" />
  </v-app>
</template>
