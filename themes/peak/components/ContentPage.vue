<script lang="ts" setup>
const Content = defineAsyncComponent(() => import("../contents/About.vue"))

const { toggleContent } = usePeakThemeStore()
const { isContentOpen } = usePeakThemeStoreRefs()
</script>

<template>
  <div class="content-page">
    <v-icon
      class="content-page-toggler"
      :icon="isContentOpen ? '$ninaClose' : '$ninaReorder'"
      :size="22"
      @click="toggleContent"
    />
    <div class="content-page-box">
      <div class="container">
        <Content />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
$half-margin: calc($margin-global / 2);

.content-page {
  pointer-events: none;
  position: absolute;
  left: $margin-global;
  right: $margin-global;
  top: $margin-global;
  bottom: $margin-global;
  overflow: hidden;
  @include respond-to(phone) {
    left: $margin-global-sm;
    top: $margin-global-sm;
    right: $margin-global-sm;
    bottom: $margin-global-sm;
  }
  * {
    pointer-events: all;
  }
}

.content-page-toggler {
  position: absolute;
  top: calc($half-margin + 3px);
  right: calc($half-margin + 5px);
  @include prefix(transition, $animation-nobg);
  @include respond-to(small-height) {
    opacity: 0;
  }
  @include respond-to(tablet) {
    z-index: 10;
  }
  .v-application.content & {
    z-index: 10;
    background: transparent;
    color: $color-info-text;
  }
  .v-application.content.dark & {
    color: $night-color-info-text;
  }
  .v-application.content.details & {
    display: none !important;
  }
}

.content-page-box {
  @include prefix(transition, $animation);
  width: 50%;
  z-index: 5;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  overflow-y: scroll;

  @include respond-to(tablet) {
    top: 220px !important;
    width: 100% !important;
    left: 100% !important;
  }
  .container {
    position: absolute;
    top: 60px;
    left: 40px;
    right: 40px;
    margin-bottom: 40px;

    @include respond-to(tablet) {
      top: 0px !important;
    }
  }
  .v-application.content & {
    left: 50%;
    @include respond-to(tablet) {
      left: 0 !important;
    }
  }
  .v-application.details & {
    left: 100%;

    @include respond-to(tablet) {
      left: 100% !important;
    }
  }
}
</style>
