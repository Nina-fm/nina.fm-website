<script lang="ts" setup>
defineProps<{
  title?: string
  artist?: string
  tracks?: Track[]
  isMixtape?: boolean
}>()
</script>

<template>
  <div class="flex flex-col justify-center items-center size-full gap-16">
    <div class="font-condensed text-6xl font-black leading-5 text-primary mt-5 mb-10">{{ title }}</div>
    <div :class="cn('text-xs text-center', { 'columns-2': (tracks?.length ?? 0) > 10 })">
      <div
        v-for="(track, idx) in tracks"
        :key="`track-${idx}`"
        :class="cn('text-primary', { 'italic  text-foreground/50': isInterlude(track) })"
      >
        <span :class="cn('text-foreground font-bold', { 'font-normal text-foreground/70': isInterlude(track) })">{{
          track.artist
        }}</span>
        <span :class="cn('mx-2')">•</span>
        {{ track.title }}
      </div>
    </div>
    <div v-if="artist" class="flex flex-col items-center gap-0">
      <span class="text-xs">Une mixtape signée</span>
      <span class="font-cursive text-primary text-3xl">{{ artist }}</span>
    </div>
  </div>
</template>
