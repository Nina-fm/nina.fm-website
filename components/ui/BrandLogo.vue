<script lang="ts" setup>
const LogoSvg = defineAsyncComponent(() => import("~/assets/svg/logo-stroke.svg"))
</script>

<template>
  <div class="brand-logo" :class="$attrs.class">
    <LogoSvg />
  </div>
</template>

<style lang="scss" scoped>
.brand-logo {
  width: 100%;
  :deep(.line) {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1000 1000;
    stroke-dashoffset: 0;
    stroke-width: 4%;
  }
  :deep(.sub-word) {
    stroke-width: 1.25%;
  }
}
</style>
