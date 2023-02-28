<script lang="ts" setup>
import Vinyl from "../components/Vinyl.vue"

const { liveQuery } = useMetadataStoreRefs()
const artist = computed(() => liveQuery.value?.authors)
const title = computed(() => liveQuery.value?.name)
</script>

<template>
  <Vinyl :artist="artist" :title="title" />
</template>

<style lang="scss" scoped></style>
