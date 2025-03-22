<script lang="ts" setup>
  import { RefreshCwIcon } from 'lucide-vue-next'

  defineProps({
    isLoading: Boolean,
  })

  defineEmits<{
    (e: 'click'): void
  }>()
</script>

<template>
  <Transition>
    <div v-if="isLoading" class="absolute inset-0 z-40 flex items-center justify-center">
      <Overlay blur />
      <AnimatedLoader />
      <Button
        variant="ghost"
        size="icon"
        class="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full hover:bg-foreground/10"
        @click="$emit('click')"
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
