<script lang="ts" setup>
  defineProps({
    blur: Boolean,
  })
</script>

<template>
  <div
    :class="
      cn('absolute inset-0 z-0 bg-background/50', {
        'backdrop-blur-[2px]': blur,
      })
    "
  />
</template>
