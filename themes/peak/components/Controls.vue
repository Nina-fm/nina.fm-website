<script lang="ts" setup>
const { isFullscreen } = useAppStoreRefs()
const { toggleFullscreen } = useAppStore()
const { toggleDarkMode } = useThemeStore()
const { darkMode } = useThemeStoreRefs()
const isRainbow = ref<boolean>(false)
const darkModeTooltip = computed(() => {
  if (darkMode.value === "auto") return "<b>Mode lumière automatique</b><br/>Cliquer pour passer en mode nuit"
  else if (darkMode.value === true) return "<b>Mode nuit actif</b><br/>Cliquer pour passer en mode jour"
  return "<b>Mode jour actif</b><br/>Cliquer pour passer en mode lumière automatique"
})
const darkModeIcon = computed(() => {
  if (darkMode.value === "auto") return "$ninaBright2"
  else if (darkMode.value === true) return "$ninaSunny"
  return "$ninaBright4"
})
// const rainbow = ["red", "yellow", "green", "aqua", "blue", "dodgerblue", "fuchsia"]

const handleToggleFullScreen = async () => {
  await toggleFullscreen()
}

const toggleRainbowMode = () => {
  isRainbow.value = !isRainbow.value
}
</script>

<template>
  <div class="controls">
    <TipIcon
      class="mt-5"
      :class="{ spin: isRainbow }"
      :icon="'$ninaSpiral'"
      :size="15"
      location="left"
      @click="toggleRainbowMode"
      >{{ "Passer en mode Rainbow" }}</TipIcon
    >
    <TipIcon
      class="mt-5"
      :icon="darkModeIcon"
      :size="15"
      location="left"
      :tooltip="darkModeTooltip"
      @click="toggleDarkMode"
    />
    <TipIcon
      class="mt-5"
      :icon="isFullscreen ? '$ninaFullscreenExit' : '$ninaFullscreen'"
      :size="18"
      location="left"
      @click="handleToggleFullScreen"
    >
      {{ `${isFullscreen ? "Quitter le" : "Passer en"} mode plein écran` }}
    </TipIcon>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
.controls {
  position: absolute;
  bottom: $margin-global * 1.5;
  right: $margin-global * 1.5;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: $color-main-text;
  .v-application.dark & {
    color: $night-color-main-text;
  }
}
</style>
