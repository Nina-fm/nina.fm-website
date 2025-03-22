<script lang="ts" setup>
  const { unlock } = useAudioStore()
  const { isLocked } = useAudioStoreRefs()
</script>

<template>
  <div
    v-if="isLocked"
    class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/60"
    @click="unlock"
  >
    <NinaIcon icon="play_circle_outline" class="text-primary" :style="{ fontSize: '200px' }" />
  </div>
</template>

<style></style>
