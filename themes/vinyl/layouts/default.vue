<script setup lang="ts">
  const { isContentOpen } = useVinylThemeStoreRefs()
</script>

<template>
  <div class="absolute inset-4 overflow-hidden rounded md:inset-5">
    <slot />
    <Controls :class="cn('text-primary-foreground', { 'hidden text-primary md:flex': isContentOpen })" />
  </div>
</template>
