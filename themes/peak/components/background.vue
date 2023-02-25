<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
// @ts-nocheck
const maskLight = (await import(`../assets/images/mask.png`)).default
// @ts-nocheck
const maskDark = (await import(`../assets/images/mask-night.png`)).default
// @ts-nocheck
const imgLight = (await import(`../assets/images/background.jpg`)).default
// @ts-nocheck
const imgDark = (await import(`../assets/images/background-night.jpg`)).default
// @ts-nocheck
const animatedLight = (await import(`../assets/images/animated-background.gif`)).default
// @ts-nocheck
const animatedDark = (await import(`../assets/images/animated-background-night.gif`)).default

const { isDarkModeActive } = useThemeStoreRefs()
const { isPlaying } = useAudioStoreRefs()

const mask = computed(() => (isDarkModeActive.value ? maskDark : maskLight))
const img = computed(() => (isDarkModeActive.value ? imgDark : imgLight))
const animated = computed(() => (isDarkModeActive.value ? animatedDark : animatedLight))
const bg = computed(() => (isPlaying.value ? animated : img))
</script>

<template>
  <v-sheet class="background">
    <v-sheet class="background-image" :style="{ backgroundImage: `url(${bg.value})` }" />
    <img :src="mask" class="backround-mask" />
  </v-sheet>
</template>

<style lang="scss" scoped>
.background {
  position: relative;
  height: 100%;

  .background-image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: left center;
    background-size: cover;
  }

  .backround-mask {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
