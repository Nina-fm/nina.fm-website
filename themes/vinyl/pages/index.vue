<script setup lang="ts">
const { width, height } = useWindowSize()
const { isPlaying } = useAudioStoreRefs()
const { liveQuery, listeners, progress, metadata, isMixtape } = useMetadataStoreRefs()
const { isContentOpen, isDetailsOpen } = useVinylThemeStoreRefs()
const { toggleDetails, closeDetails, closeContent } = useVinylThemeStore()

const baseHeight = 900
const minDimension = computed(() => Math.min(width.value, height.value))
const scaling = computed(() => (minDimension.value * 100) / baseHeight / 100)

const artist = computed(() => liveQuery.value?.authors)
const title = computed(() => liveQuery.value?.name)
const cover = computed(() => (metadata.value?.cover_url as string) ?? undefined)
const tracks = computed(() => (metadata.value?.tracks as Track[]) ?? undefined)

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Tab":
      e.preventDefault()
      toggleDetails()
      break
    case "Escape":
      closeDetails()
      closeContent()
      break
    default:
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
  <div
    :class="cn('absolute inset-0 transition-main', { 'right-full md:right-1/2 border-r border-muted': isContentOpen })"
  >
    <ClientOnly>
      <div class="z-0 h-full w-full overflow-hidden relative bg-primary">
        <div
          class="absolute left-1/2 top-1/2 origin-top-left -ml-10 sm:ml-0 md:ml-0"
          :style="{
            transform: `scale(${scaling}) translate(-50%, -50%)`,
          }"
        >
          <VinylDisk :artist="artist" :title="title" :rotate="isPlaying" :cover="cover" />
          <VinylToneArm :progress="progress" />
          <VinylLcdCounter :count="listeners" />
        </div>
      </div>
      <div v-if="isDetailsOpen" class="absolute inset-0" @click.stop.prevent="closeDetails()" />
      <div class="absolute inset-0 pointer-events-none">
        <VinylCover
          v-if="!!metadata && isMixtape"
          :artist="artist"
          :title="title"
          :tracks="tracks"
          :cover="cover"
          :style="{
            '--tw-scale-y': scaling,
            '--tw-scale-x': scaling,
            transform: `translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }"
        />
      </div>
    </ClientOnly>
  </div>
  <VinylContentPage />
</template>

<style scoped>
.transition-main {
  transition: all 0.3s ease-in-out;
}
</style>
