<script lang="ts" setup>
const { toggleFullscreen, toggleRainbowMode } = usePeakThemeStore()
const { isFullscreen, isRainbowMode } = usePeakThemeStoreRefs()
</script>

<template>
  <div class="controls">
    <TipIcon
      class="mt-5"
      :class="{ spin: isRainbowMode }"
      :icon="'$ninaSpiral'"
      :size="15"
      location="left"
      @click="toggleRainbowMode"
      >{{ "Passer en mode Rainbow" }}</TipIcon
    >
    <TipIcon
      class="mt-5"
      :icon="isFullscreen ? '$ninaFullscreenExit' : '$ninaFullscreen'"
      :size="18"
      location="left"
      @click="toggleFullscreen"
    >
      {{ `${isFullscreen ? "Quitter le" : "Passer en"} mode plein écran` }}
    </TipIcon>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
.controls {
  z-index: 10;
  position: absolute;
  bottom: $margin-global * 2;
  right: $margin-global * 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: rgb(var(--v-theme-background));
  .v-application.dark & {
    color: rgb(var(--v-theme-background));
  }
}
</style>
