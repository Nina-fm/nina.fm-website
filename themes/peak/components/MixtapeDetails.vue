<script lang="ts" setup>
import uniqid from "uniqid";

const { metadata, progress } = useMetadataStoreRefs();
const { isDetailsOpen } = usePeakThemeStoreRefs();
const { closeDetails } = usePeakThemeStore();

const tracks = computed(
  () =>
    (metadata?.value?.tracks as Track[])?.map((t) => ({
      ...t,
      key: uniqid(),
    })) ?? []
);
</script>

<template>
  <div v-if="isDetailsOpen" class="absolute inset-0 z-0 bg-transparent" @click.stop.prevent="closeDetails" />
  <div
    :class="
      cn(
        'absolute z-0 inset-y-0 -left-full md:-left-1/2 w-full md:w-1/2 bg-background details-transition',
        [$attrs.class],
        {
          'left-0 md:left-0': isDetailsOpen,
        }
      )
    "
  >
    <div class="absolute inset-0 top-14 overflow-x-hidden overflow-y-auto">
      <div
        class="absolute top-0 left-2 md:left-5 bottom-5 right-2 md:right-10 flex flex-col gap-3 font-condensed text-sm after:content-[''] after:sticky after:inset-x-0 after:bottom-0 after:min-h-16 after:z-10 after:bg-gradient-to-t after:from-background after:to-transparent"
      >
        <div v-if="metadata?.cover_url" class="flex flex-col gap-2">
          <img :src="`${metadata?.cover_url}`" />
          <Progress :model-value="progress" class="h-0.5" />
        </div>
        <div class="text-right">
          Une Mixtape proposée par
          <strong>{{ metadata?.authors_text }}</strong>
        </div>
        <div data-type="tracklist" class="pb-14">
          <div v-if="!tracks.length" class="white-space-pre-line">
            {{ metadata?.tracks_text }}
          </div>
          <div v-else>
            <PeakTrackList :tracks="tracks" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-transition {
  transition: all 0.3s ease-in-out, background-color 0s linear, color 0s linear;
}
</style>
