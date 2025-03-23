<script lang="ts" setup>
  import { MenuIcon, XIcon } from 'lucide-vue-next'

  const Content = defineAsyncComponent(() => import('@/components/contents/About.vue'))

  const { toggleContent, closeContent } = useVinylThemeStore()
  const { isContentOpen, isDetailsOpen } = useVinylThemeStoreRefs()
</script>

<template>
  <div v-if="isContentOpen" class="absolute inset-0 z-0 bg-transparent" @click.stop.prevent="closeContent" />
  <div :class="cn('flex md:flex', [$attrs.class], { 'hidden md:flex': isDetailsOpen })">
    <ControlButton
      :class="
        cn(
          'absolute right-2 top-2 z-10 cursor-pointer text-primary-foreground hover:text-primary md:right-4 md:top-4',
          {
            'text-foreground': isContentOpen,
          },
        )
      "
      :size="22"
      @click="toggleContent"
    >
      <XIcon v-if="isContentOpen" class="h-2 w-2" />
      <MenuIcon v-else class="h-2 w-2" />
    </ControlButton>
    <div
      :class="
        cn(
          'transition-content content-page-box pointer-events-none absolute inset-y-0 left-full w-full overflow-y-auto bg-background/90 md:w-1/2 md:bg-transparent',
          { 'left-0 md:left-1/2': isContentOpen, 'left-full': isDetailsOpen },
        )
      "
    >
      <div class="pointer-events-auto absolute left-0 right-0 top-14 pb-10 md:left-10 md:right-10 md:top-16">
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
