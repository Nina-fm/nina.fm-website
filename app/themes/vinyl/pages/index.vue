<script setup lang="ts">
  import { useWindowSize } from '@vueuse/core'
  import { useAudioStoreRefs } from '~/stores/audio'
  import { useMetadataStoreRefs } from '~/stores/metadata'
  import { useVinylThemeStore, useVinylThemeStoreRefs } from '~/themes/vinyl/stores/vinylTheme'

  const { width, height } = useWindowSize()
  const { playing } = useAudioStoreRefs()
  const { listeners, progress, metadata, isMixtape } = useMetadataStoreRefs()
  const { isContentOpen, isDetailsOpen } = useVinylThemeStoreRefs()
  const { toggleDetails, closeDetails, closeContent } = useVinylThemeStore()

  const baseHeight = 900
  const minDimension = computed(() => Math.min(width.value, height.value))
  const scaling = computed(() => (minDimension.value * 100) / baseHeight / 100)

  const artist = computed(() => metadata.value?.authors_text)
  const title = computed(() => metadata.value?.name)
  const year = computed(() => metadata.value?.year)
  const cover = computed(() => (metadata.value?.cover_url as string) ?? undefined)
  const tracks = computed(() => (metadata.value?.tracks as Track[]) ?? undefined)

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Tab':
        e.preventDefault()
        toggleDetails()
        break
      case 'Escape':
        closeDetails()
        closeContent()
        break
      default:
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
</script>

<template>
  <div
    :class="cn('transition-main absolute inset-0', { 'right-full border-r border-muted md:right-1/2': isContentOpen })"
  >
    <ClientOnly>
      <div class="relative z-0 h-full w-full overflow-hidden bg-primary">
        <div
          class="absolute left-1/2 top-1/2 -ml-10 origin-top-left sm:ml-0 md:ml-0"
          :style="{
            transform: `scale(${scaling}) translate(-50%, -50%)`,
          }"
        >
          <VinylDisk :artist="artist" :title="title" :rotate="playing" :cover="cover" />
          <VinylToneArm :progress="progress" />
          <VinylLcdCounter :count="listeners" />
        </div>
      </div>
      <div v-if="isDetailsOpen" class="absolute inset-0" @click.stop.prevent="closeDetails()" />
      <div class="pointer-events-none absolute inset-0">
        <VinylCover
          v-if="!!metadata && isMixtape"
          :artist="artist"
          :title="title"
          :year="year"
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
  <Controls
    :controls-variant="isContentOpen ? 'ghost' : 'default'"
    :class="cn({ 'text-muted-foreground': isContentOpen })"
  />
</template>

<style scoped>
  .transition-main {
    transition: all 0.3s ease-in-out;
  }
</style>
