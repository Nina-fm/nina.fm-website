<script lang="ts" setup>
  import {
    CandyIcon,
    CandyOffIcon,
    Disc3Icon,
    MaximizeIcon,
    MinimizeIcon,
    MoonIcon,
    MountainSnowIcon,
    SunIcon,
    SunMoonIcon,
    Volume2Icon,
    VolumeOffIcon,
  } from 'lucide-vue-next'

  const { isMuted, isPlaying } = useAudioStoreRefs()
  const { toggleMute } = useAudioStore()
  const { toggleFullscreen, toggleRainbowMode, toggleDarkMode, toggleTheme } = useThemeStore()
  const { darkMode, isFullscreen, isRainbowMode, theme, nextTheme, themeOptions, hasManyThemes } = useThemeStoreRefs()

  const themeToggleIcon = computed(() => nextTheme.value.icon ?? 'color_lens')

  const themeToggleTooltip = computed(
    () => `<b>Thème ${theme.value.name} actif.</b><br/>Cliquer pour passer au thème ${nextTheme.value.name}`,
  )
  const rainbowTooltip = computed(() =>
    isRainbowMode.value
      ? '<b>Mode psychédélique actif</b><br/>Cliquer pour quitter le mode psychédélique'
      : '<b>Mode psychédélique inactif</b><br/>Cliquer pour passer en mode psychédélique',
  )
  const muteTooltip = computed(() =>
    isMuted.value
      ? '<b>Son coupé</b><br/>Cliquer pour réactiver le son'
      : '<b>Son actif</b><br/>Cliquer pour couper le son',
  )
  const darkModeTooltip = computed(() => {
    if (darkMode.value === 'auto') return '<b>Mode lumière automatique actif</b><br/>Cliquer pour passer en mode nuit'
    else if (darkMode.value === true) return '<b>Mode nuit actif</b><br/>Cliquer pour passer en mode jour'
    return '<b>Mode jour actif</b><br/>Cliquer pour passer en mode lumière automatique'
  })
  const fullscreenTooltip = computed(() =>
    isFullscreen.value
      ? '<b>Mode plein écran actif</b><br/>Cliquer pour quitter le mode plein écran'
      : '<b>Mode plein écran inactif</b><br/>Cliquer pour passer en mode plein écran',
  )
</script>

<template>
  <div class="absolute bottom-1 right-1 z-0 flex flex-col items-center justify-end md:bottom-3 md:right-3">
    <ControlButton v-if="themeOptions.darkMode" :tooltip="darkModeTooltip" @click="toggleDarkMode">
      <SunMoonIcon v-if="darkMode === 'auto'" class="h-1 w-1" />
      <MoonIcon v-else-if="darkMode === true" class="h-1 w-1" />
      <SunIcon v-else class="h-1 w-1" />
    </ControlButton>
    <ControlButton
      v-if="!!themeOptions.rainbow"
      :tooltip="rainbowTooltip"
      :class="cn({ spin: isRainbowMode })"
      @click="toggleRainbowMode"
    >
      <CandyOffIcon v-if="isRainbowMode" class="h-1 w-1" />
      <CandyIcon v-else class="h-1 w-1" />
    </ControlButton>
    <ControlButton v-if="hasManyThemes" :icon="themeToggleIcon" :tooltip="themeToggleTooltip" @click="toggleTheme">
      <MountainSnowIcon v-if="nextTheme.key === 'peak'" class="h-1 w-1" />
      <Disc3Icon v-else-if="nextTheme.key === 'vinyl'" class="h-1 w-1" />
    </ControlButton>
    <ControlButton v-if="isPlaying" :tooltip="muteTooltip" @click="() => toggleMute()">
      <VolumeOffIcon v-if="isMuted" class="h-1 w-1" />
      <Volume2Icon v-else class="h-1 w-1" />
    </ControlButton>
    <ControlButton :tooltip="fullscreenTooltip" @click="toggleFullscreen">
      <MinimizeIcon v-if="isFullscreen" class="h-1 w-1" />
      <MaximizeIcon v-else class="h-1 w-1" />
    </ControlButton>
  </div>
</template>
