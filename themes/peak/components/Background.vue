<script lang="ts" setup>
  const maskLight = (await import(`../assets/images/mask.png`)).default
  const maskDark = (await import(`../assets/images/mask-night.png`)).default
  const imgLight = (await import(`../assets/images/background.jpg`)).default
  const imgDark = (await import(`../assets/images/background-night.jpg`)).default
  const animatedLight = (await import(`../assets/images/animated-background.gif`)).default
  const animatedDark = (await import(`../assets/images/animated-background-night.gif`)).default

  const { isDarkModeActive } = useThemeStoreRefs()
  const { playing } = useAudioStoreRefs()

  const mask = computed(() => (isDarkModeActive.value ? maskDark : maskLight))
  const img = computed(() => (isDarkModeActive.value ? imgDark : imgLight))
  const animated = computed(() => (isDarkModeActive.value ? animatedDark : animatedLight))
  const bg = computed(() => (playing.value ? animated : img))
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <div
      class="h-full w-full bg-cover bg-[left_15%_center] bg-no-repeat md:bg-left"
      :style="{ backgroundImage: `url(${bg.value})` }"
    />
    <img :src="mask" class="absolute bottom-0 left-0 max-h-[65%] max-w-[105%]" />
  </div>
</template>
