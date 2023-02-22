<script lang="ts" setup>

const { isPlaying, isMuted } = useAudioStoreRefs()
const { togglePlay, toggleMute } = useAudioStore()
const { metadata, liveQuery, progress } = useMetadataStoreRefs();
</script>

<template>
    <h1>Nina.fm</h1>
    <v-card>
        <v-card-title>{{ liveQuery?.authors }} - {{ liveQuery?.name }}</v-card-title>
        <v-card-subtitle>
            <v-progress-linear :model-value="Math.ceil(Number(progress))"></v-progress-linear>
        </v-card-subtitle>
        <v-card-text v-if="metadata?.cover_url">
            <v-img :src="metadata.cover_url" />
        </v-card-text>
        <v-card-actions>
            <v-btn @click="togglePlay">{{ isPlaying ? "Pause" : "Play" }}</v-btn>
            <v-btn @click="toggleMute">{{ isMuted ? "Unmute" : "Mute" }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped></style>
