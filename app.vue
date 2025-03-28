<script lang="ts" setup>
  import { themes } from '~/themes'

  useDaylightStore()
  const { isLoading } = useLoadingStoreRefs()
  const { current } = useThemeStoreRefs()
  const { isMobile: appIsMobile } = useAppStoreRefs()
  const { isMobile: audioIsMobile, isPlaying, isLocked } = useAudioStoreRefs()
  const { toggleMute, unlock, relaunch } = useAudioStore()
  const { cannotAutoplay, initNavigator } = useNavigator()

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case ' ':
        e.preventDefault()
        toggleMute()
        break
      default:
        break
    }
  }

  const loadThemesCss = () => {
    Object.keys(themes).map((theme) => {
      import(`./themes/${theme}/assets/css/${theme}.css`)
    })
  }

  onNuxtReady(() => {
    loadThemesCss()
    const isMobile = cannotAutoplay()
    appIsMobile.value = isMobile
    audioIsMobile.value = isMobile
  })

  onMounted(() => {
    initNavigator()
    document.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })

  // TODO: Check if the AudioStrem is rerendered (cf. audio bug)
</script>

<template>
  <div data-app class="h-full" @click="unlock">
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <AudioStream />
    <Theme :name="current" />
    <LoadingOverlay :is-loading="isLoading && !isLocked" @refresh="relaunch" />
    <MobilePlayUnlocker :active="isLocked && !isPlaying" @click="unlock" />
    <AudioDebugger />
    <Notifier />
    <Rainbow />
  </div>
</template>
