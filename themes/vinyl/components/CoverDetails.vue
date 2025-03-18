<script lang="ts" setup>
defineProps<{
  title?: string;
  artist?: string;
  tracks?: Obj[];
  isMixtape?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col justify-center items-center size-full gap-16">
    <div class="font-condensed text-6xl font-black leading-5 text-primary mt-5 mb-10">{{ title }}</div>
    <div :class="cn('text-sm text-center text-primary', { 'columns-2': (tracks?.length ?? 0) > 10 })">
      <div v-for="(track, idx) in tracks" :key="`track-${idx}`">
        <span class="font-bold text-foreground">{{ track.artist }}</span>
        <span class="mx-2">•</span>
        {{ track.title }}
      </div>
    </div>
    <div v-if="artist" class="flex flex-col items-center gap-0">
      <span v-if="isMixtape" class="text-sm">Une mixtape signée</span>
      <span class="font-cursive text-primary text-3xl">{{ artist }}</span>
      <span v-if="!isMixtape" class="text-sm">à l'écoute sur Nina.fm</span>
    </div>
  </div>
</template>
