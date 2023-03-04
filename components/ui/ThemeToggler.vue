<script lang="ts" setup>
const { current } = useThemeStoreRefs()
const { publicThemes, switchTheme } = useThemeStore()
</script>

<template>
  <client-only>
    <div v-if="publicThemes.length" class="theme-toggler">
      <v-btn-toggle :model-value="current" density="compact" divided variant="flat">
        <v-btn v-for="t in publicThemes" :key="t" size="small" :active="t === current" @click="switchTheme(t)">
          {{ t }}
        </v-btn>
      </v-btn-toggle>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
.theme-toggler {
  z-index: 3000;
  position: fixed;
  top: 1.5rem;
  right: 5rem;
  :deep(.v-btn-group) {
    height: 1.2rem;
  }
  :deep(.v-btn--size-small) {
    font-size: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    min-width: auto;
  }
}
</style>
