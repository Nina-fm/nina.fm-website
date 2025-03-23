<script lang="ts" setup>
  import { CirclePlayIcon } from 'lucide-vue-next'

  defineProps({
    active: Boolean,
  })

  defineEmits<{
    (e: 'click'): void
  }>()
</script>

<template>
  <Transition>
    <div v-if="active" class="absolute inset-0 z-50 flex flex-col items-center justify-center" @click="$emit('click')">
      <Overlay blur />
      <CirclePlayIcon class="absolute size-44 text-primary/50" />
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
