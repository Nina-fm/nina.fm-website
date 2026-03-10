<script lang="ts" setup>
  defineProps<{
    tracks: Track[]
  }>()
</script>

<template>
  <ul class="flex flex-col">
    <li v-for="(track, i) in tracks" :key="track.id" :class="cn('flex gap-4')">
      <span class="w-3 text-right">{{ i + 1 }}</span>
      <span :class="cn({ 'italic text-foreground/50': isInterlude(track) })">
        <span :class="cn('font-bold', { 'font-normal text-foreground/70': isInterlude(track) })">
          {{ track.artist }}
        </span>
        –
        <span>{{ track.title }}</span>
      </span>
    </li>
  </ul>
</template>
