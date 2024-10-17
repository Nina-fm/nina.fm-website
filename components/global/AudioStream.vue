<script lang="ts" setup>
const { streamRef } = useAudioStoreRefs()
</script>

<template>
  <audio ref="streamRef" src="https://flux.nina.fm/nina.mp3" type="audio/mpeg" autoplay>
    Votre navigateur est un vieux machin dépassé. Il ne supporte pas la musique, ce qui est un peu con quand on veut
    écouter la radio.
  </audio>
</template>
