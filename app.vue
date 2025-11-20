<script lang="ts" setup>
  import { useThemeStoreRefs } from '~/stores/theme'
  import { themes } from '~/themes'

  // Les stores sont initialisés dans le plugin 01.init-stores.client.ts
  const { current } = useThemeStoreRefs()

  const loadThemesCss = () => {
    Object.keys(themes).map((theme) => {
      import(`./themes/${theme}/assets/css/${theme}.css`)
    })
  }

  onNuxtReady(() => {
    loadThemesCss()
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
