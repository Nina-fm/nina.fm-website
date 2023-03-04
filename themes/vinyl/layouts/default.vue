<script lang="ts" setup></script>

<template>
  <v-container fluid class="h-100 pa-5">
    <slot />
  </v-container>
  <ThemeToggler class="theme-toggler" />
</template>

<style lang="scss" scoped>
.theme-toggler {
  :deep(.v-btn) {
    color: rgb(var(--v-theme-primary));
  }
}
</style>
