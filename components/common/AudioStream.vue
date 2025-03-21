<script lang="ts" setup>
const { streamRef } = useAudioStoreRefs()
console.log("AudioStrem render")
</script>

<template>
  <Teleport to="body">
    <audio v-once ref="streamRef" src="https://flux.nina.fm/nina.mp3" type="audio/mpeg" autoplay>
      Votre navigateur est un vieux machin dépassé. Il ne supporte pas la musique, ce qui est un peu con quand on veut
      écouter la radio.
    </audio>
  </Teleport>
</template>
