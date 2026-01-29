<script lang="ts" setup>
  import { useBrowserStore } from '~/stores/browser'
  import { useThemeStoreRefs } from '~/stores/theme'

  // Les stores sont initialisés dans le plugin 01.init-stores.client.ts
  const { current } = useThemeStoreRefs()

  // Initialize browser features (Media Session, WakeLock, etc.)
  useBrowserStore()

  const loadThemeCss = async (themeKey: string) => {
    try {
      await import(`./themes/${themeKey}/assets/css/${themeKey}.css`)
    } catch (error) {
      console.error(`Failed to load CSS for theme ${themeKey}:`, error)
    }
  }

  const loadCurrentThemeCss = () => {
    loadThemeCss(current.value)
  }

  onNuxtReady(() => {
    loadCurrentThemeCss()
  })

  // Recharger le CSS quand le thème change
  watch(current, (newTheme, oldTheme) => {
    if (newTheme !== oldTheme) {
      loadThemeCss(newTheme)
    }
  })
</script>

<template>
  <div data-app class="h-full">
    <VitePwaManifest />
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <Theme :name="current" />
    <AudioControlOverlay />
    <AudioDebugger />
    <Notifier />
    <Rainbow />
  </div>
</template>
