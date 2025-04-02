<script lang="ts" setup>
  import { CirclePlayIcon, RefreshCwIcon } from 'lucide-vue-next'

  const { networkIssue, loading, locked, playing, preloadStarted, readyToPlay } = useAudioStoreRefs()
  const { start, refresh } = useAudioStore()

  const active = computed(() => loading.value || locked.value || !playing.value)
  const displayLoading = computed(() => !locked.value && (loading.value || (readyToPlay.value && !playing.value)))
  const displayRefresh = computed(() => !networkIssue.value && preloadStarted.value && !loading.value && !playing.value)

  const handleClick = () => {
    return locked.value ? start(true) : null
  }
</script>

<template>
  <Transition>
    <div v-if="active" class="absolute inset-0 z-50 flex items-center justify-center" @click="handleClick">
      <Overlay blur />
      <AnimatedLoader v-if="displayLoading" />
      <Button
        v-else-if="locked"
        variant="ghost"
        class="absolute size-40 text-primary opacity-60 transition-opacity duration-300 ease-in-out hover:bg-transparent hover:opacity-80 [&_svg]:size-40 [&_svg_polygon]:fill-current"
        @click="handleClick"
      >
        <CirclePlayIcon />
      </Button>
      <Button
        v-if="displayRefresh"
        variant="ghost"
        size="icon"
        class="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full text-primary hover:bg-foreground/10"
        @click="refresh"
      >
        <RefreshCwIcon class="size-4" />
      </Button>
    </div>
  </Transition>
</template>

<style scoped>
  /* .v-enter-active, */
  .v-leave-active {
    transition: opacity 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
