<script setup lang="ts">
import { cn } from "@/utils/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('rounded-xl border bg-card text-card-foreground shadow', props.class)">
    <slot />
  </div>
</template>
