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
  import type { ButtonVariants } from '~/components/ui/button'

  const props = withDefaults(
    defineProps<{
      controlsVariant?: ButtonVariants['variant']
      controlsClass?: string
    }>(),
    {
      controlsVariant: 'ghost',
      controlsClass: '',
    },
  )

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
  <ClientOnly>
    <div class="absolute bottom-1 right-1 z-0 flex flex-col items-center justify-end gap-1 md:bottom-3 md:right-3">
      <ControlButton
        v-if="themeOptions.darkMode"
        :tooltip="darkModeTooltip"
        :variant="props.controlsVariant"
        :class="props.controlsClass"
        @click="toggleDarkMode"
      >
        <SunMoonIcon v-if="darkMode === 'auto'" />
        <MoonIcon v-else-if="darkMode === true" />
        <SunIcon v-else />
      </ControlButton>
      <ControlButton
        v-if="!!themeOptions.rainbow"
        :tooltip="rainbowTooltip"
        :variant="props.controlsVariant"
        :class="cn(props.controlsClass, { spin: isRainbowMode })"
        @click="toggleRainbowMode"
      >
        <CandyOffIcon v-if="isRainbowMode" />
        <CandyIcon v-else />
      </ControlButton>
      <ControlButton
        v-if="hasManyThemes"
        :tooltip="themeToggleTooltip"
        :variant="props.controlsVariant"
        :class="props.controlsClass"
        @click="toggleTheme"
      >
        <MountainSnowIcon v-if="nextTheme.key === 'peak'" />
        <Disc3Icon v-else-if="nextTheme.key === 'vinyl'" />
      </ControlButton>
      <ControlButton
        v-if="isPlaying"
        :tooltip="muteTooltip"
        :variant="props.controlsVariant"
        :class="props.controlsClass"
        @click="() => toggleMute()"
      >
        <VolumeOffIcon v-if="isMuted" />
        <Volume2Icon v-else />
      </ControlButton>
      <ControlButton
        :tooltip="fullscreenTooltip"
        :variant="props.controlsVariant"
        :class="props.controlsClass"
        @click="toggleFullscreen"
      >
        <MinimizeIcon v-if="isFullscreen" />
        <MaximizeIcon v-else />
      </ControlButton>
    </div>
  </ClientOnly>
</template>
