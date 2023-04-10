<script lang="ts" setup>
const { streamRef, streamUrl } = useAudioStoreRefs()
</script>

<template>
  <ClientOnly>
    <audio ref="streamRef" :src="streamUrl" type="audio/mpeg" autoplay>
      Votre navigateur est un vieux machin dépassé. Il ne supporte pas la musique, ce qui est un peu con quand on veut
      écouter la radio.
    </audio>
  </ClientOnly>
</template>
