<script lang="ts" setup>
  const { streamRef, streamUrl, isKilled } = useAudioStoreRefs()
  const { initPlaying } = useAudioStore()
  const { debug } = useDebugStore()

  if (debug) {
    console.log('AudioStrem render')
  }

  onNuxtReady(() => {
    streamUrl.value = 'https://flux.nina.fm/nina.mp3'
    initPlaying()
  })
</script>

<template>
  <Teleport v-if="!isKilled" to="body">
    <audio v-once ref="streamRef" type="audio/mpeg" autoplay>
      Votre navigateur est un vieux machin dépassé. Il ne supporte pas la musique, ce qui est un peu con quand on veut
      écouter la radio.
    </audio>
  </Teleport>
</template>
