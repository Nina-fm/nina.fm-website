<script lang="ts" setup>
/* eslint-disable vue/no-v-html */
const props = defineProps<{
  icon: string
  tooltip?: string
  size?: string | number
  color?: string
  location?: Position
}>()
const emit = defineEmits<{
  (e: "click", event: Event): void
}>()

const handleClick = (event: Event) => {
  emit("click", event)
}
</script>

<template>
  <client-only>
    <v-tooltip :location="props.location ?? 'bottom'">
      <slot><div v-html="props.tooltip" /></slot>
      <template #activator="{ props: activatorProps }">
        <v-icon
          class="tip-icon"
          :class="$attrs.class"
          :icon="props.icon"
          :color="color ?? 'default'"
          :size="props.size ?? 'default'"
          v-bind="activatorProps"
          @click="handleClick"
        />
      </template>
    </v-tooltip>
  </client-only>
</template>

<style lang="scss" scoped>
.v-tooltip {
  :deep(.v-overlay__content) {
    font-size: 0.75rem;
  }
}
</style>
