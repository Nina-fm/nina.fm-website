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
  const { darkMode, isFullscreen, isRainbowMode, nextTheme, themeOptions, hasManyThemes } = useThemeStoreRefs()

  const themeToggleTooltip = computed(() => `Passer au thème ${nextTheme.value.name}`)
  const rainbowTooltip = computed(() =>
    isRainbowMode.value ? 'Quitter le mode psychédélique' : 'Passer en mode psychédélique',
  )
  const darkModeTooltip = computed(() => {
    if (darkMode.value === 'auto') return '<b>Luminosité automatique</b><br/>Cliquer pour passer en mode nuit'
    else if (darkMode.value === true) return '<b>Mode nuit</b><br/>Cliquer pour passer en mode jour'
    return '<b>Mode jour</b><br/>Cliquer pour passer en mode lumière automatique'
  })
  const muteTooltip = computed(() =>
    isMuted.value
      ? '<b>Son coupé</b><br/>Cliquer pour réactiver le son'
      : '<b>Son actif</b><br/>Cliquer pour couper le son',
  )
  const fullscreenTooltip = computed(() =>
    isFullscreen.value ? 'Quitter le mode plein écran' : 'Passer en mode plein écran',
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
    <ControlButton v-if="hasManyThemes" :tooltip="themeToggleTooltip" @click="toggleTheme">
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
