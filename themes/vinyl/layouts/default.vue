<script setup lang="ts">
const { isContentOpen } = useVinylThemeStoreRefs();
</script>

<template>
  <div class="absolute inset-5 overflow-hidden">
    <slot />
    <Controls :class="cn('text-primary-foreground', { 'text-primary hidden md:flex': isContentOpen })" />
  </div>
</template>
