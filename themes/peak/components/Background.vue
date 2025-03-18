<script lang="ts" setup>
const maskLight = (await import(`../assets/images/mask.png`)).default;
const maskDark = (await import(`../assets/images/mask-night.png`)).default;
const imgLight = (await import(`../assets/images/background.jpg`)).default;
const imgDark = (await import(`../assets/images/background-night.jpg`)).default;
const animatedLight = (await import(`../assets/images/animated-background.gif`))
  .default;
const animatedDark = (
  await import(`../assets/images/animated-background-night.gif`)
).default;

const { isDarkModeActive } = useThemeStoreRefs();
const { isPlaying } = useAudioStoreRefs();

const mask = computed(() => (isDarkModeActive.value ? maskDark : maskLight));
const img = computed(() => (isDarkModeActive.value ? imgDark : imgLight));
const animated = computed(() =>
  isDarkModeActive.value ? animatedDark : animatedLight
);
const bg = computed(() => (isPlaying.value ? animated : img));
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <div
      class="w-full h-full bg-[left_15%_center] md:bg-left bg-cover bg-no-repeat"
      :style="{ backgroundImage: `url(${bg.value})` }"
    />
    <img :src="mask" class="absolute bottom-0 left-0" />
  </div>
</template>
