<script setup lang="ts">
defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <div class="absolute right-5 bottom-5">
    <ControlButton icon="loop1" tooltip="Retourner la pochette" @click.stop.prevent="$emit('click')" />
  </div>
</template>
