<script lang="ts" setup>
  const LogoSvg = defineAsyncComponent(() => import('@/assets/svg/logo-stroke.svg'))

  const { isDetailsOpen, isContentOpen } = usePeakThemeStoreRefs()

  const init = ref<boolean>(true)
</script>

<template>
  <ClientOnly>
    <div
      :class="
        cn(
          'transition-logo absolute left-1/2 top-[31%] w-[150px] -translate-x-1/2 -translate-y-1/2 text-background dark:text-foreground md:w-[200px]',
          {
            init,
            'left-3/4': isDetailsOpen,
            '-left-full md:left-1/4': !isDetailsOpen && isContentOpen,
          },
        )
      "
      @mouseover="init = false"
    >
      <LogoSvg class="hover:opacity-20" />
    </div>
  </ClientOnly>
</template>

<style scoped>
  :root {
    --main-word-stroke-w: 6.4px;
    --sub-word-stroke-w: 2.5px;
    --delay-before: 1.5s;
    --anim-out: exit 3s 7s linear infinite forwards;
  }

  @keyframes dash {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes dash2 {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes exit {
    to {
      stroke-width: 0;
    }
  }

  .transition-logo {
    transition: all 0.3s ease-in-out;
  }

  :deep(svg:hover .letter-a-bar),
  :deep(svg:hover .letter-i-dot),
  :deep(svg:hover .sub-word) {
    opacity: 0;
  }

  :deep(svg:hover .letter-n),
  :deep(svg:hover .letter-i),
  :deep(svg:hover .letter-n2),
  :deep(svg:hover .letter-a) {
    transition: stroke-dasharray 0s;
    stroke-dashoffset: 0;
    animation: dash2 5s 0s linear infinite forwards;
    animation-delay: 0s !important;
    stroke-dasharray: 100 100 !important;
  }

  :deep(svg .line) {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1000 1000;
    stroke-dashoffset: 0;
    stroke-width: 1px;
    transition:
      all 3s ease-out,
      stroke-dasharray 0s,
      stroke-dashoffset 0s;
  }
  .init {
    :deep(svg .line) {
      stroke-dashoffset: 1000;
      animation: dash 1s 0s linear 1 forwards;
    }
  }

  :deep(svg .letter-n) {
    animation-duration: 1.8s !important;
    animation-delay: calc(1.5s + 0ms) !important;
    stroke-width: var(--main-word-stroke-w);
  }
  :deep(svg .letter-i) {
    animation-duration: 2.2s !important;
    animation-delay: calc(1.5s + 400ms) !important;
    stroke-width: var(--main-word-stroke-w);
  }
  :deep(svg .letter-i-dot) {
    animation-duration: 1s !important;
    animation-delay: calc(1.5s + 600ms) !important;
    stroke-width: var(--main-word-stroke-w) * 1.25;
  }
  :deep(svg .letter-n2) {
    animation-duration: 1.8s !important;
    animation-delay: calc(1.5s + 800ms) !important;
    stroke-width: var(--main-word-stroke-w);
  }
  :deep(svg .letter-a) {
    animation-duration: 1.8s !important;
    animation-delay: calc(1.5s + 1200ms) !important;
    stroke-width: var(--main-word-stroke-w);
  }
  :deep(svg .letter-a-bar) {
    animation-duration: 1.5s !important;
    animation-delay: calc(1.5s + 1400ms) !important;
    stroke-width: var(--main-word-stroke-w);
  }
  .dot-fm {
    animation-duration: 1.8s !important;
    animation-delay: calc(1.5s + 2000ms) !important;
    stroke-width: var(--sub-word-stroke-w) * 1.25;
  }
  :deep(svg .letter-f) {
    animation-duration: 1.2s !important;
    animation-delay: calc(1.5s + 2100ms) !important;
    stroke-width: var(--sub-word-stroke-w);
  }
  :deep(svg .letter-f-bar) {
    animation-duration: 1.6s !important;
    animation-delay: calc(1.5s + 2100ms) !important;
    stroke-width: var(--sub-word-stroke-w);
  }
  :deep(svg .letter-m) {
    animation-duration: 1s !important;
    animation-delay: calc(1.5s + 2200ms) !important;
    stroke-width: var(--sub-word-stroke-w);
  }
  :deep(svg .letter-a-bar),
  :deep(svg .letter-i-dot),
  :deep(svg .sub-word) {
    transition: opacity 0.3s;
  }
  :deep(svg:hover) {
    opacity: 0.8;
  }
</style>
