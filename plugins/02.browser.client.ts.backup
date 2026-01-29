/**
 * Plugin client-only pour initialiser le browser store
 * Doit s'exécuter uniquement côté client pour éviter les erreurs SSR
 * avec useScreenOrientation, useWakeLock, navigator.mediaSession, etc.
 */
export default defineNuxtPlugin(() => {
  const browserStore = useBrowserStore()

  // Le store s'initialise automatiquement via onMounted dans sa définition
  return {
    provide: {
      browserStore,
    },
  }
})
