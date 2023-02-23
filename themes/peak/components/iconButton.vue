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

const iconClasses = computed(() => {
  const classes = []
  if (active.value) {
    classes.push(iconActiveAnimated?.value || iconActive?.value)
  } else {
    classes.push(iconInactiveAnimated?.value || iconInactive?.value)
  }
  if ((active.value && iconActiveAnimated?.value) || (!active.value && iconInactiveAnimated?.value)) {
    classes.push("animated")
  }
  return classes
})
const styles = computed(() => {
  return { height: size?.value, width: size?.value }
})
const iconStyles = computed(() => {
  return { fontSize: (size?.value ?? 10) / 10 + "em" }
})

const handleClick = (event: Event) => {
  emit("click", event)
}
</script>

<template>
  <button
    :id="id"
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
  position: absolute;
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
