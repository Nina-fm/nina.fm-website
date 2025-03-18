<script setup lang="ts">
const { isPlaying } = useAudioStoreRefs();
const { liveQuery, listeners, progress, metadata, isMixtape } = useMetadataStoreRefs();
const { isContentOpen, isJaquetteTurnedBack } = useVinylThemeStoreRefs();
const { toggleDetails, closeDetails, toggleJaquette } = useVinylThemeStore();
const artist = computed(() => liveQuery.value?.authors);
const title = computed(() => liveQuery.value?.name);
const cover = computed(() => (metadata.value?.cover_url as string) ?? undefined);
const tracks = computed(() => (metadata.value?.tracks as Obj[]) ?? undefined);

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Tab":
      toggleDetails();
      break;
    case "Escape":
      closeDetails();
      break;
    default:
      break;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div
    :class="cn('absolute inset-0 transition-main', { 'right-full md:right-1/2 border-r border-muted': isContentOpen })"
  >
    <div class="z-0 h-full w-full overflow-hidden relative bg-primary">
      <div
        class="absolute left-1/2 translate-x-[-55%] sm:translate-x-[-62%] md:-translate-x-1/2 top-1/2 -translate-y-1/2 mt-0 sm:mt-4 md:mt-0 scale-50 sm:scale-75 md:scale-100"
      >
        <VinylDisk :artist="artist" :title="title" :rotate="isPlaying" :cover="cover" />
        <VinylToneArm :progress="progress" />
        <VinylLcdCounter :count="listeners" />
      </div>
    </div>
    <VinylCover
      :active="isMixtape"
      :turned-back="isJaquetteTurnedBack"
      :artist="artist"
      :title="title"
      :tracks="tracks"
      :cover="cover"
      :is-mixtape="!!metadata"
      @click="toggleDetails"
      @turn="toggleJaquette"
      @close="closeDetails"
    />
  </div>
  <VinylContentPage />
</template>

<style scoped>
.transition-main {
  transition: all 0.3s ease-in-out;
}
</style>
