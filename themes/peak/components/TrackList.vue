<script lang="ts" setup>
defineProps<{
  tracks: Track[];
}>();
</script>

<template>
  <ul class="flex flex-col">
    <li v-for="(track, i) in tracks" :key="track.id" class="flex gap-4">
      <span class="w-3 text-right">{{ i + 1 }}</span>
      <span>
        <strong>{{ track.artist }}</strong> –
        <span>{{ track.title }}</span>
      </span>
    </li>
  </ul>
</template>
