<script lang="ts" setup>
useLoadingStore()
useDaylightStore()

const { current } = useThemeStoreRefs()
const { isMobile: appIsMobile } = useAppStoreRefs()
const { cannotAutoplay, initNavigator } = useNavigator()
const { isMobile: audioIsMobile } = useAudioStoreRefs()
const { toggleMute, unlock, initPlaying } = useAudioStore()

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case " ":
      toggleMute()
      break
    default:
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
  <div data-app class="h-full" @click="() => unlock()">
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <AudioStream />
    <Theme :name="current" />
    <ClientOnly>
      <Toaster />
    </ClientOnly>
    <Rainbow />
  </div>
</template>
