<script lang="ts" setup>
const { toggleFullscreen, toggleRainbowMode, toggleDarkMode, toggleTheme } = useThemeStore();
const { darkMode, isFullscreen, isRainbowMode, theme, nextTheme, themeOptions, hasManyThemes } = useThemeStoreRefs();

const themeToggleTooltip = computed(
  () => `<b>Thème ${theme.value.name} actif.</b><br/>Cliquezr pour passer au thème ${nextTheme.value.name}`
);
const themeToggleIcon = computed(() => nextTheme.value.icon ?? "color_lens");

const rainbowTooltip = "Passer en mode Rainbow";
const rainbowIcon = "noun_spiral";

const darkModeTooltip = computed(() => {
  if (darkMode.value === "auto") return "<b>Mode lumière automatique actif</b><br/>Cliquer pour passer en mode nuit";
  else if (darkMode.value === true) return "<b>Mode nuit actif</b><br/>Cliquer pour passer en mode jour";
  return "<b>Mode jour actif</b><br/>Cliquer pour passer en mode lumière automatique";
});
const darkModeIcon = computed(() => {
  if (darkMode.value === "auto") return "brightness_2";
  else if (darkMode.value === true) return "wb_sunny";
  return "brightness_4";
});

const fullscreenTooltip = computed(() =>
  isFullscreen.value ? "Quitter le mode plein écran" : "Passer en mode plein écran"
);
const fullscreenIcon = computed(() => (isFullscreen.value ? "fullscreen_exit" : "fullscreen"));
</script>

<template>
  <div class="absolute z-0 bottom-1 md:bottom-3 right-1 md:right-3 flex flex-col justify-end items-center">
    <ControlButton v-if="hasManyThemes" :icon="themeToggleIcon" :tooltip="themeToggleTooltip" @click="toggleTheme" />
    <ControlButton
      v-if="!!themeOptions.rainbow"
      :icon="rainbowIcon"
      :tooltip="rainbowTooltip"
      :class="cn({ spin: isRainbowMode })"
      @click="toggleRainbowMode"
    />
    <ControlButton
      v-if="themeOptions.darkMode"
      :icon="darkModeIcon"
      :tooltip="darkModeTooltip"
      @click="toggleDarkMode"
    />
    <ControlButton :icon="fullscreenIcon" :tooltip="fullscreenTooltip" @click="toggleFullscreen" />
  </div>
</template>
