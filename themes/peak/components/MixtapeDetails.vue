<script lang="ts" setup>
  import uniqid from 'uniqid'

  const { metadata, progress } = useMetadataStoreRefs()
  const { isDetailsOpen } = usePeakThemeStoreRefs()
  const { closeDetails } = usePeakThemeStore()

  const tracks = computed(
    () =>
      (metadata?.value?.tracks as Track[])?.map((t) => ({
        ...t,
        key: uniqid(),
      })) ?? [],
  )
</script>

<template>
  <div v-if="isDetailsOpen" class="absolute inset-0 z-0 bg-transparent" @click.stop.prevent="closeDetails" />
  <div
    :class="
      cn(
        'details-transition absolute inset-y-0 -left-full z-0 w-full bg-background md:-left-1/2 md:w-1/2',
        [$attrs.class],
        {
          'left-0 md:left-0': isDetailsOpen,
        },
      )
    "
  >
    <div class="absolute inset-0 top-14 overflow-y-auto overflow-x-hidden">
      <div
        class="font-condensed absolute bottom-5 left-2 right-2 top-0 flex flex-col gap-3 text-sm after:sticky after:inset-x-0 after:bottom-0 after:z-10 after:min-h-16 after:bg-gradient-to-t after:from-background after:to-transparent after:content-[''] md:left-5 md:right-10"
      >
        <div v-if="metadata?.cover_url" class="flex flex-col gap-2">
          <img :src="`${metadata?.cover_url}`" />
          <Progress :model-value="progress" class="h-0.5" />
        </div>
        <div class="space-x-1 text-right">
          <span>Une Mixtape proposée par</span>
          <span class="font-bold">{{ metadata?.authors_text }}</span>
          <span v-if="metadata?.year">en {{ metadata.year }}</span>
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
    transition:
      all 0.3s ease-in-out,
      background-color 0s linear,
      color 0s linear;
  }
</style>
