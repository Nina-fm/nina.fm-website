<script lang="ts" setup>

const { isPlaying, isMuted } = useAudioStoreRefs()
const { togglePlay, toggleMute } = useAudioStore()
const { metadata, liveQuery, progress } = useMetadataStoreRefs();
</script>

<template>
    <h1>Nina.fm</h1>
    Vinyl…
</template>

<style scoped></style>
