<script setup lang="ts">
  import { RefreshCcwIcon } from 'lucide-vue-next'

  defineEmits<{
    (e: 'click'): void
  }>()
</script>

<template>
  <div class="absolute bottom-5 right-5">
    <ControlButton tooltip="Retourner la pochette" @click.stop.prevent="$emit('click')">
      <RefreshCcwIcon />
    </ControlButton>
  </div>
</template>
