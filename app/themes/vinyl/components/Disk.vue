<script lang="ts" setup>
  const props = defineProps<{
    title?: string
    artist?: string
    cover?: string
    rotate?: boolean
  }>()

  const { title, artist, rotate } = toRefs(props)
</script>

<template>
  <div class="relative size-[1000px]">
    <div class="absolute-center aspect-square size-full rounded-full bg-secondary" />
    <div class="absolute-center flex flex-col items-center justify-center">
      <VinylSticker :title="title" :artist="artist" :class="cn('size-[300px]', { 'animate-spin-slow': rotate })" />
      <VinylSharp :size="30" class="absolute-center" />
    </div>
  </div>
</template>
