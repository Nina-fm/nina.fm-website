<script setup lang="ts">
const { isContentOpen } = useVinylThemeStoreRefs()
</script>

<template>
  <div class="absolute inset-4 md:inset-5 overflow-hidden rounded">
    <slot />
    <Controls :class="cn('text-primary-foreground', { 'text-primary hidden md:flex': isContentOpen })" />
  </div>
</template>
