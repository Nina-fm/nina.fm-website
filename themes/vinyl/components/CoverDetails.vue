<script lang="ts" setup>
  defineProps<{
    title?: string
    artist?: string
    year?: number | string
    tracks?: Track[]
    isMixtape?: boolean
  }>()
</script>

<template>
  <div class="flex size-full flex-col items-center justify-center gap-16">
    <div class="font-condensed mb-10 mt-5 text-6xl font-black leading-5 text-primary">
      {{ title }}
    </div>
    <div :class="cn('text-center text-xs', { 'columns-2': (tracks?.length ?? 0) > 10 })">
      <div
        v-for="(track, idx) in tracks"
        :key="`track-${idx}`"
        :class="cn('text-primary', { 'italic text-foreground/50': isInterlude(track) })"
      >
        <span :class="cn('font-bold text-foreground', { 'font-normal text-foreground/70': isInterlude(track) })">
          {{ track.artist }}
        </span>
        <span :class="cn('mx-2')">•</span>
        {{ track.title }}
      </div>
    </div>
    <div v-if="artist" class="flex flex-col items-center gap-0">
      <span class="text-xs">
        Une mixtape
        <span v-if="year" class="inline-flex">de {{ year }}</span>
        signée
      </span>
      <span class="font-cursive text-3xl text-primary">{{ artist }}</span>
    </div>
  </div>
</template>
