<script lang="ts" setup>
useLoadingStore();
useDaylightStore();
useAudioStore();
useMetadataStore();
const { snackbars } = useSnackbarStoreRefs()
const { current, currentVariant, themeVariant } = useThemeStoreRefs()
</script>

<template>
  <v-app :theme="currentVariant">
    <NuxtLoadingIndicator :color="themeVariant.definition?.colors?.primary" />
    <ThemeToggler />
    <Theme :name="current" />
    <Notifier v-model="snackbars" />
  </v-app>
</template>
