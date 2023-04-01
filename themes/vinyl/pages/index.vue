<script lang="ts" setup>
import Controls from "../components/Controls.vue"
import Jaquette from "../components/Jaquette.vue"
import ToneArm from "../components/ToneArm.vue"
import Vinyl from "../components/Vinyl.vue"
import { useVinylThemeStore, useVinylThemeStoreRefs } from "../stores/vinylTheme"

const { isPlaying } = useAudioStoreRefs()
const { liveQuery, progress, metadata, isMixtape } = useMetadataStoreRefs()
const { isRainbowMode } = useThemeStoreRefs()
const { isDetailsOpen } = useVinylThemeStoreRefs()
const { toggleDetails, closeDetails } = useVinylThemeStore()
const artist = computed(() => liveQuery.value?.authors)
const title = computed(() => liveQuery.value?.name)
const cover = computed(() => (metadata.value?.cover_url as string) ?? undefined)
const tracks = computed(() => (metadata.value?.tracks as Obj[]) ?? undefined)

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      toggleDetails()
      break
    case "Escape":
      closeDetails()
      break
    default:
      break
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown)
})
</script>

<template>
  <v-sheet color="primary" class="h-100 w-100 overflow-hidden position-relative">
    <Vinyl :artist="artist" :title="title" :rotate="isPlaying" :cover="cover" />
    <ToneArm :progress="progress" />
    <Controls />
  </v-sheet>
  <Rainbow v-if="isRainbowMode" />
  <Jaquette
    :active="isMixtape"
    :open="isDetailsOpen"
    :artist="artist"
    :title="title"
    :tracks="tracks"
    :cover="cover"
    :is-mixtape="!!metadata"
    @click="toggleDetails"
  />
</template>

<style lang="scss" scoped>
.logo {
  position: absolute;
  left: 0;
  bottom: 5%;
  width: 200px;
}
</style>
