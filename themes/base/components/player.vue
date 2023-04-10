<script lang="ts" setup>
const { isPlaying, isMuted, isLocked, isLoading } = useAudioStoreRefs()
const { toggleMute } = useAudioStore()

const displayStatus = computed(() => {
  if (isLocked.value) return "locked"
  else if (isLoading.value) return "loading"
  else if (isMuted.value) return "muted"
  else if (isPlaying.value) return "playing"
  else if (!isPlaying.value) return "paused"
  else return "down"
})
</script>

<template>
  <v-card>
    <v-toolbar>
      <v-card-title>The Player</v-card-title>
    </v-toolbar>
    <!-- <Equalizer/> -->
    <v-card-text> Stream is {{ displayStatus }}… </v-card-text>
    <v-card-text v-if="isLocked">Click anywhere to play music!</v-card-text>
    <v-card-actions>
      <v-btn @click="toggleMute">{{ isMuted ? "Unmute" : "Mute" }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
