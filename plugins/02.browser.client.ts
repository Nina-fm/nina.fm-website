/**
 * Plugin client-only pour initialiser le browser store
 * Init différée APRÈS le mount complet pour ne PAS bloquer l'app
 */
export default defineNuxtPlugin((nuxtApp) => {
  // Hook qui s'exécute APRÈS le mount complet de l'app
  nuxtApp.hook('app:mounted', () => {
    // Initialisation différée dans nextTick pour être sûr
    nextTick(() => {
      const browserStore = useBrowserStore()
      // Le onMounted du store ne se déclenche pas depuis un plugin
      // donc on appelle init() manuellement
      browserStore.init()
      console.log('[Plugin] Browser store initialisé après mount')
    })
  })
})
