import { useBrowserStore } from '~/stores/browser'

/**
 * Plugin client-only pour initialiser le browser store.
 * onNuxtReady garantit l'exécution après hydratation complète.
 * Les actions init() et checkAutoplay() sont appelées explicitement
 * plutôt que via onMounted/onBeforeMount dans le store.
 */
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const browserStore = useBrowserStore()
    await browserStore.checkAutoplay()
    browserStore.init()
  })
})
