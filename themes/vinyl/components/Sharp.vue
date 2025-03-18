<script setup lang="ts">
defineProps<{
  size: number;
}>();
</script>

<template>
  <div class="rounded-full bg-secondary" :style="{ width: size + 'px', height: size + 'px' }">
    <div
      class="w-[60%] h-[70%] bg-primary/15 rounded-full absolute left-1/2 top-1/2 -translate-x-[60%] -translate-y-[60%] rotate-45"
    />
    <div class="bg-primary rounded-full absolute-center -ml-[16.66%] -mt-[10%] size-1/6" />
  </div>
</template>
