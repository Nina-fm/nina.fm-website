export const useFullscreen = () => {
  const isFullscreen = ref(false)

  const toggle = () => {
    if (!document.fullscreenElement) {
      // Entrer en mode plein écran
      document.documentElement
        .requestFullscreen()
        .then(() => {
          isFullscreen.value = true
        })
        .catch((err) => {
          console.warn("Erreur lors de l'activation du mode plein écran:", err)
        })
    } else {
      // Quitter le mode plein écran
      document
        .exitFullscreen()
        .then(() => {
          isFullscreen.value = false
        })
        .catch((err) => {
          console.warn('Erreur lors de la sortie du mode plein écran:', err)
        })
    }
  }

  // Écouter les changements d'état du plein écran
  const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
  })

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
  })

  return {
    isFullscreen: readonly(isFullscreen),
    toggle,
  }
}
