<script lang="ts" setup>
  import type { AcceptableValue } from 'reka-ui'
  import { key, type TogglerContext } from './types'

  type Props = {
    modelValue?: AcceptableValue
    direction?: 'horizontal' | 'vertical'
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    direction: 'horizontal',
  })

  const emit = defineEmits(['update:modelValue'])

  const value = ref<AcceptableValue>(props.modelValue ?? null)

  const setValue = (v: AcceptableValue) => {
    value.value = v
    emit('update:modelValue', v)
  }

  provide<TogglerContext>(key, { value, setValue })
</script>

<template>
  <div
    :class="
      cn('flex gap-1 rounded-3xl bg-background p-2', {
        'flex-row': props.direction === 'horizontal',
        'flex-col': props.direction === 'vertical',
      })
    "
  >
    <slot />
  </div>
</template>

<style></style>
