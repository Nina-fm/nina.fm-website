<script lang="ts" setup>
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
      <NinaIcon icon="play_circle_outline" class="relative text-primary/50" :style="{ fontSize: '200px' }" />
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
