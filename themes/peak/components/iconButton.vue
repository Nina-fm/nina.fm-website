<script lang="ts" setup>
const props = defineProps<{
  id?: string
  active?: boolean
  iconActive?: string
  iconInactive?: string
  iconActiveAnimated?: string
  iconInactiveAnimated?: string
  infoText?: string
  size?: number
  circle?: boolean
}>()

const emit = defineEmits<{
  (e: "click", event: Event): void
}>()

const { id, active, iconActive, iconInactive, iconActiveAnimated, iconInactiveAnimated, infoText, size, circle } =
  toRefs(props)

const activeIcon = computed(() => iconActiveAnimated?.value || iconActive?.value)
const inactiveIcon = computed(() => iconInactiveAnimated?.value || iconInactive?.value)
const iconClasses = computed(() => ({
  ...(activeIcon.value ? { [activeIcon.value]: [true, undefined].includes(active.value) } : {}),
  ...(inactiveIcon.value ? { [inactiveIcon.value]: [false].includes(active.value) } : {}),
  animated: !!iconActiveAnimated?.value || !!iconInactiveAnimated?.value,
}))
const styles = computed(() => ({ height: `${size?.value}px`, width: `${size?.value}px` }))
const iconStyles = computed(() => ({ fontSize: (size?.value ?? 10) / 10 + "em" }))

const handleClick = (event: Event) => {
  emit("click", event)
}
</script>

<template>
  <button
    :id="id ?? ''"
    :class="{ iconButton: true, circle: circle }"
    :title="infoText"
    :style="styles"
    @keydown.space.prevent
    @click="handleClick"
  >
    <i :class="iconClasses" :style="iconStyles"></i>
  </button>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
@keyframes spin {
  from {
    @include prefix(transform, translate(-50%, -50%) rotate(0deg));
  }
  to {
    @include prefix(transform, translate(-50%, -50%) rotate(360deg));
  }
}
.iconButton {
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  font-size: 1em;
  z-index: 10;
  position: relative;
  color: $color-info-text;
  @include prefix(transition, $animation);
  .v-application.dark & {
    color: $night-color-info-text;
  }
  :deep(i) {
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 50%;
    @include prefix(transform, translate(-50%, -50%));
    font-size: 1em;

    &.animated {
      animation-name: spin;
      animation-duration: 1000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  &.circle {
    @include prefix(border-radius, 50%);
    background: rgba($color-main-bg, 0.01);
    padding: 10px;
    width: 30px;
    height: 30px;
    .v-application.dark & {
      background: rgba($night-color-main-bg, 0.01);
    }
  }
}
</style>
