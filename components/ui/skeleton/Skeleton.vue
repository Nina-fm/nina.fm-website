<script setup lang="ts">
  import { cn } from '@/utils/utils'
  import type { HTMLAttributes } from 'vue'

  interface SkeletonProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<SkeletonProps>()
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-primary/10', props.class)" />
</template>
