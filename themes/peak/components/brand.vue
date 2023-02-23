<script lang="ts" setup>
const LogoSvg = defineAsyncComponent(() => import("~/assets/svg/logo-stroke.svg"))
const animated = ref<boolean>(false)
const init = ref<boolean>(true)

const toggleAnimation = () => {
  animated.value = !animated.value
}
</script>

<template>
  <div class="brand" :class="{ init, animated }" @click="toggleAnimation" @mouseover="init = false">
    <LogoSvg />
  </div>
</template>

<style lang="scss" module>
@import "../assets/scss/base";
$stroke-color: $color-main-bg;
$main-word-stroke-w: 6.4px;
$sub-word-stroke-w: 2.5px;
$delay-before: 1.5s;
$anim-out: exit 3s 7s linear infinite forwards;

@keyframes dash {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes dash2 {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes exit {
  to {
    stroke-width: 0;
  }
}
.brand {
  padding-top: 0;
  z-index: 0;
  position: absolute;
  top: 31%;
  left: 50%;
  @include prefix(transform, translate(-50%, -50%));
  @include prefix(transition, $animation);
  @include respond-to(small-height) {
    opacity: 0;
  }

  img,
  svg {
    pointer-events: auto;
    transition: all 0.2s ease-out;
    width: 200px;
    @include respond-to(phone) {
      width: 150px;
    }
  }
  .line {
    fill: none;
    stroke: $stroke-color;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1000 1000;
    stroke-dashoffset: 0;
    stroke-width: 1px;
    transition: all 3s ease-out, stroke-dasharray 0s, stroke-dashoffset 0s;
  }
  &.init .line {
    stroke-dashoffset: 1000;
    @include prefix(animation, dash 1s 0s linear 1 forwards);
  }
  .letter-n {
    @include prefix(animation-duration, 1.8s !important);
    @include prefix(animation-delay, #{$delay-before + 0ms} !important);
    stroke-width: $main-word-stroke-w;
  }
  .letter-i {
    @include prefix(animation-duration, 2.2s !important);
    @include prefix(animation-delay, #{$delay-before + 400ms} !important);
    stroke-width: $main-word-stroke-w;
  }
  .letter-i-dot {
    @include prefix(animation-duration, 1s !important);
    @include prefix(animation-delay, #{$delay-before + 600ms} !important);
    stroke-width: $main-word-stroke-w * 1.25;
  }
  .letter-n2 {
    @include prefix(animation-duration, 1.8s !important);
    @include prefix(animation-delay, #{$delay-before + 800ms} !important);
    stroke-width: $main-word-stroke-w;
  }
  .letter-a {
    @include prefix(animation-duration, 1.8s !important);
    @include prefix(animation-delay, #{$delay-before + 1200ms} !important);
    stroke-width: $main-word-stroke-w;
  }
  .letter-a-bar {
    @include prefix(animation-duration, 1.5s !important);
    @include prefix(animation-delay, #{$delay-before + 1400ms} !important);
    stroke-width: $main-word-stroke-w;
  }
  .dot-fm {
    @include prefix(animation-duration, 1.8s !important);
    @include prefix(animation-delay, #{$delay-before + 2000ms} !important);
    stroke-width: $sub-word-stroke-w * 1.25;
  }
  .letter-f {
    @include prefix(animation-duration, 1.2s !important);
    @include prefix(animation-delay, #{$delay-before + 2100ms} !important);
    stroke-width: $sub-word-stroke-w;
  }
  .letter-f-bar {
    @include prefix(animation-duration, 1.6s !important);
    @include prefix(animation-delay, #{$delay-before + 2100ms} !important);
    stroke-width: $sub-word-stroke-w;
  }
  .letter-m {
    @include prefix(animation-duration, 1s !important);
    @include prefix(animation-delay, #{$delay-before + 2200ms} !important);
    stroke-width: $sub-word-stroke-w;
  }
  .letter-a-bar,
  .letter-i-dot,
  .sub-word {
    transition: opacity 0.3s;
  }
  &:hover {
    svg {
      opacity: 0.2;
    }
  }
  .v-application:not(.loading):not(.muted) &:hover {
    .letter-a-bar,
    .letter-i-dot,
    .sub-word {
      opacity: 0;
    }
    .letter-n,
    .letter-i,
    .letter-n2,
    .letter-a {
      transition: stroke-dasharray 0s;
      stroke-dashoffset: 0;
      @include prefix(animation, dash2 5s 0s linear infinite forwards);
      @include prefix(animation-delay, 0s !important);
      stroke-dasharray: 100 100 !important;
    }
  }

  .v-application.show-posts & {
    left: 25% !important;

    @include respond-to(tablet) {
      top: 150px !important;
      left: 50% !important;
    }
  }
  .v-application.show-details & {
    left: 75% !important;
  }
}
</style>
