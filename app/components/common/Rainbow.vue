<script lang="ts" setup>
  import { useThemeStoreRefs } from '~/stores/theme'

  const { isRainbowMode, themeOptions } = useThemeStoreRefs()

  const interval = ref<ReturnType<typeof setInterval>>()
  const current = ref<number>(0)

  const themeRainbow = computed(() => themeOptions.value?.rainbow ?? {})
  const delay = computed(() => themeRainbow.value?.duration ?? 10000)
  const colors = computed(() => themeRainbow.value?.colors || basicColors)
  const count = computed(() => colors.value.length)
  const styles = computed(() => ({
    backgroundColor: colors.value[current.value],
    transitionProperty: 'background-color',
    transitionDuration: `${delay.value}ms`,
    transitionTimingFunction: 'linear',
  }))

  const animate = () => {
    current.value = current.value + 1 === count.value ? 0 : current.value + 1
  }

  const start = () => {
    animate()
    interval.value = setInterval(() => {
      animate()
    }, delay.value)
  }

  const reset = () => {
    clearInterval(interval.value)
    current.value = 0
  }

  watch(isRainbowMode, (value) => {
    if (value) {
      start()
    } else {
      reset()
    }
  })

  onBeforeMount(() => {
    if (isRainbowMode.value) {
      start()
    }
  })

  onUnmounted(() => {
    reset()
  })
</script>

<template>
  <ClientOnly>
    <div
      v-if="isRainbowMode"
      :class="
        cn(
          'pointer-events-none absolute inset-0 z-50 bg-transparent opacity-0 transition-opacity duration-300 ease-in-out',
          themeOptions.rainbow?.class,
          $attrs.class as string,
          { 'opacity-100': isRainbowMode },
        )
      "
    >
      <div class="pointer-events-none absolute inset-0 z-50 bg-transparent" :style="styles" />
    </div>
  </ClientOnly>
</template>
