<script lang="ts" setup>
  import { RefreshCwIcon } from 'lucide-vue-next'

  defineProps({
    isLoading: Boolean,
  })

  defineEmits<{
    (e: 'click' | 'refresh'): void
  }>()
</script>

<template>
  <Transition>
    <div v-if="isLoading" class="absolute inset-0 z-50 flex items-center justify-center" @click="$emit('click')">
      <Overlay blur />
      <AnimatedLoader />
      <Button
        variant="ghost"
        size="icon"
        class="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full text-primary hover:bg-foreground/10"
        @click="$emit('refresh')"
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
