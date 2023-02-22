<script lang="ts" setup>
const { daylight } = useDaylightStoreRefs()
</script>

<template>
    <client-only>
        <v-card>
            <v-toolbar>
                <v-card-title>The Daylight Mode</v-card-title>
            </v-toolbar>
            <v-card-text>
                Currently it is : {{ daylight }}
            </v-card-text>
        </v-card>
    </client-only>
</template>