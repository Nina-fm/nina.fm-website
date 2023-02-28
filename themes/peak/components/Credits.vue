<script lang="ts" setup></script>

<template>
  <div class="credits">© PHOTO:BOBIN - MONTAGE:120</div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
.credits {
  z-index: 0;
  position: absolute;
  bottom: 20px;
  left: 22px;
  font-size: 0.5em;
  font-weight: 500;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  line-height: 1em;
  padding: 0;
  color: $color-main-text;
  .v-application.dark & {
    color: $night-color-main-text;
  }
  @include prefix(transition, $animation-nobg);
  @include respond-to(tablet) {
    font-size: 0.3em;
    #app.show-posts &,
    #app.show-details & {
      opacity: 0;
    }
  }
}
</style>
