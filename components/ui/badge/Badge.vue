<script setup lang="ts">
  import { cn } from '@/utils/utils'
  import type { HTMLAttributes } from 'vue'
  import { type BadgeVariants, badgeVariants } from '.'

  const props = defineProps<{
    variant?: BadgeVariants['variant']
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
