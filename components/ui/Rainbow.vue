<script lang="ts" setup>
const rainbow = ["red", "yellow", "green", "aqua", "blue", "dodgerblue", "fuchsia"]
const delay = 10500

const { isRainbowMode } = usePeakThemeStoreRefs()
const interval = ref<NodeJS.Timer>()
const current = ref<number>(0)
const count = ref<number>(0)
const styles = computed(() => ({
  backgroundColor: rainbow[current.value],
}))

const animate = () => {
  current.value = current.value + 1 === count.value ? 0 : current.value + 1
}
const start = () => {
  animate()
  interval.value = setInterval(() => {
    animate()
  }, delay)
}
const reset = () => {
  clearInterval(interval.value)
  current.value = 0
}

onBeforeMount(() => {
  start()
})
onUnmounted(() => {
  reset()
})
</script>

<template>
  <v-fade-transition>
    <v-sheet class="rainbow" :class="{ active: isRainbowMode }">
      <v-sheet :style="styles" class="rainbow-content" />
    </v-sheet>
  </v-fade-transition>
</template>

<style lang="scss" scoped>
.rainbow {
  background: transparent;
  z-index: 1000000000;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  mix-blend-mode: difference;

  &.active {
    opacity: 1;
  }

  .rainbow-content {
    z-index: 1000000000;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    background-color: transparent;
    transition: background-color 10s linear;
  }
}
</style>
