<script lang="ts" setup>
import Controls from "../components/Controls.vue"
import ToneArm from "../components/ToneArm.vue"
import Vinyl from "../components/Vinyl.vue"

const { isPlaying } = useAudioStoreRefs()
const { liveQuery, progress, metadata } = useMetadataStoreRefs()
const { isRainbowMode } = useThemeStoreRefs()
const artist = computed(() => liveQuery.value?.authors)
const title = computed(() => liveQuery.value?.name)
const cover = computed(() => (metadata.value?.cover_url as string) ?? undefined)
</script>

<template>
  <v-sheet color="primary" class="h-100 w-100">
    <Vinyl :artist="artist" :title="title" :rotate="isPlaying" :cover="cover" />
    <ToneArm :progress="progress" />
    <Controls />
    <Rainbow v-if="isRainbowMode" />
  </v-sheet>
</template>

<style lang="scss" scoped>
.logo {
  position: absolute;
  left: 0;
  bottom: 5%;
  width: 200px;
}
</style>
