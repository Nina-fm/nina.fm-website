<script lang="ts" setup>
  import { usePeakThemeStore } from '~/themes/peak/stores/peakTheme'

  const { toggleDetails, closeContent, closeDetails } = usePeakThemeStore()

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Tab':
        e.preventDefault()
        toggleDetails()
        break
      case 'Escape':
        closeDetails()
        closeContent()
        break
      default:
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
</script>

<template>
  <PeakBackground />
  <PeakAudience />
  <PeakCredits />
  <PeakPlayer />
  <PeakAnimatedLogo />
  <PeakMixtapeDetails />
  <PeakContentPage />
  <Controls />
</template>
