<script setup lang="ts">
  defineProps<{
    size: number
  }>()
</script>

<template>
  <div class="rounded-full bg-secondary" :style="{ width: size + 'px', height: size + 'px' }">
    <div
      class="absolute left-1/2 top-1/2 h-[70%] w-[60%] -translate-x-[60%] -translate-y-[60%] rotate-45 rounded-full bg-primary/15"
    />
    <div class="absolute-center -ml-[16.66%] -mt-[10%] size-1/6 rounded-full bg-primary" />
  </div>
</template>
