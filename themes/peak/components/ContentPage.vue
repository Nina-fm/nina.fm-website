<script lang="ts" setup>
const Content = defineAsyncComponent(() => import("@/components/contents/About.vue"));

const { toggleContent, closeContent } = usePeakThemeStore();
const { isContentOpen, isDetailsOpen } = usePeakThemeStoreRefs();
</script>

<template>
  <div v-if="isContentOpen" class="absolute inset-0 z-0 bg-transparent" @click.stop.prevent="closeContent" />
  <div :class="cn('flex md:flex', [$attrs.class], { 'hidden md:flex': isDetailsOpen })">
    <ControlButton
      class="absolute z-10 top-2 md:top-4 right-2 md:right-4 cursor-pointer"
      :icon="isContentOpen ? 'close' : 'reorder'"
      :size="22"
      @click="toggleContent"
    />
    <div
      :class="
        cn(
          'absolute w-full md:w-1/2 inset-y-0 left-full overflow-y-auto pointer-events-none transition-content content-page-box bg-background/90 md:bg-transparent',
          { 'left-0 md:left-1/2': isContentOpen, 'left-full': isDetailsOpen }
        )
      "
    >
      <div class="absolute top-20 md:top-16 left-0 md:left-10 right-0 md:right-10 mb-10 pointer-events-auto">
        <Content />
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-content {
  transition: all 0.3s ease-in-out;
}
</style>
