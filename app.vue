<script lang="ts" setup>
  import { themes } from '~/themes'

  useDaylightStore()
  const { init: initBrowser } = useBrowserStore()
  const { current } = useThemeStoreRefs()

  const loadThemesCss = () => {
    Object.keys(themes).map((theme) => {
      import(`./themes/${theme}/assets/css/${theme}.css`)
    })
  }

  onNuxtReady(() => {
    loadThemesCss()
  })

  onMounted(() => {
    initBrowser()
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
