<script lang="ts" setup>
  import { MenuIcon, XIcon } from 'lucide-vue-next'
  import type { ButtonVariants } from '~/components/ui/button'

  const props = withDefaults(
    defineProps<{
      open?: boolean
      variant?: ButtonVariants['variant']
    }>(),
    {
      open: false,
      variant: 'default',
    },
  )

  defineEmits<{
    (event: 'click'): void
  }>()
</script>

<template>
  <ControlButton
    :variant="props.variant"
    class="absolute right-1 top-1 z-10 md:right-2 md:top-2"
    @click="$emit('click')"
  >
    <XIcon v-if="props.open" />
    <MenuIcon v-else />
  </ControlButton>
</template>
