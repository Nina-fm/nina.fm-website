<script setup lang="ts">
/**
 * Composant invisible pour initialiser le browser store
 * Client-only avec onMounted - aucun risque SSR
 */

const browserStore = useBrowserStore()

// onMounted s'exécute uniquement côté client après le render complet
onMounted(() => {
  console.log('[BrowserInitializer] Initialisation des features browser')
  // Le store s'initialise automatiquement via son propre onMounted
  // On n'a rien à faire, juste l'instancier ici déclenche son init
})
</script>

<template>
  <!-- Composant invisible -->
  <div style="display: none" />
</template>
