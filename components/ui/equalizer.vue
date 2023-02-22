<script lang="ts" setup>
import AudioMotionAnalyzer from 'audiomotion-analyzer';

const { audioContext, stream } = useAudioStoreRefs()
const container = ref<HTMLDivElement | null>(null);
const audioMotion = ref<AudioMotionAnalyzer>();

const options = {
  mode: 5,
  barSpace: 0.25,
  gradient: 'rainbow',
  ledBars: false,
  lumiBars: false,
  radial: false,
  reflexAlpha: 0.25,
  reflexBright: 1,
  reflexFit: true,
  reflexRatio: 0.3,
  showBgColor: false,
  showPeaks: true,
  overlay: false,
}

onMounted(() => {
  audioMotion.value = new AudioMotionAnalyzer(container.value ?? undefined, {
    width: 200,
    height: 150,
    source: audioContext.value?.destination
  });
})
</script>

<template><div ref="container"></div></template>

<style scoped></style>
