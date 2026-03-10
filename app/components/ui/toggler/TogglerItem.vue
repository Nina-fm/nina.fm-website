<script lang="ts" setup>
  import type { AcceptableValue } from 'reka-ui'
  import { key, type TogglerContext } from './types'

  const props = defineProps<{
    value: AcceptableValue
  }>()

  const ctx = inject<TogglerContext>(key)

  const isActive = computed(() => {
    return ctx?.value?.value === props.value
  })

  const handleClick = () => {
    ctx?.setValue?.(props.value)
  }
</script>

<template>
  <Button size="icon" :variant="isActive ? 'default' : 'ghost'" class="size-7 rounded-full" @click="handleClick">
    <slot />
  </Button>
</template>

<style></style>
