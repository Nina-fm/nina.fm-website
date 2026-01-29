<script setup lang="ts">
  /**
   * Composant invisible pour initialiser le browser store
   * Client-only avec onMounted - aucun risque SSR
   * Le onMounted du store browser.ts se déclenche automatiquement
   */
  useBrowserStore()
</script>

<template>
  <!-- Composant invisible -->
  <div style="display: none" />
</template>
