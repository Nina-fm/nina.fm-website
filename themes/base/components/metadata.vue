<script lang="ts" setup>
const { metadata, liveQuery, progress } = useMetadataStoreRefs();
const tracks = computed(() => (metadata.value?.tracks ?? []) as Track[])
</script>

<template>
    <v-card>
        <v-toolbar>
            <v-card-title>The Metadata</v-card-title>
        </v-toolbar>
        <v-card-text>
            <div v-if="liveQuery">
                <b>Currently played ({{ Math.ceil(Number(progress)) }}%):</b>
                <p>{{ liveQuery?.authors }} - {{ liveQuery?.name }}</p>
                <template v-if="metadata">
                    <div v-if="metadata?.cover_url">
                        <v-img :src="metadata.cover_url" />
                    </div>
                    <div>
                        <b>Mixtape tracks details</b>
                        <div v-if="tracks">
                            <v-list>
                                <v-list-item v-for="(track, i) in tracks" density="compact">
                                    <template v-slot:prepend>
                                        <v-avatar>{{ i + 1 }}</v-avatar>
                                    </template>
                                    <v-list-item-title>{{ track.title }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ track.artist }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </div>
                    </div>
                </template>
            </div>
            <div v-else>Nothing to display…</div>
        </v-card-text>
    </v-card>
</template>