<script setup lang="ts">
  import '@/assets/css/fonts/nina-icons.css'

  const props = defineProps<{
    icon: string
    class?: string
    size?: number | string
  }>()

  const fontSize = computed(() => {
    if (typeof props.size === 'number') {
      return `${props.size}px`
    }
    return props.size ?? '1em'
  })
</script>

<template>
  <i :class="cn(`nina-icon-${icon}`, 'aspect-square text-current', props.class)" :style="{ fontSize }" />
</template>
