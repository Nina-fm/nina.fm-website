<template>
  <div class="edito">
    <h2>
      <small>Saison 4</small><br />
      <strong>Un avenir radio</strong>
    </h2>
  </div>
  <div class="block">
    <blockquote>
      <p>
        Webradio artisanale et associative, Nina.fm diffuse des pépites musicales en continu, sans publicité, jusqu'aux
        confins du cosmos. <br />
      </p>
    </blockquote>
  </div>
  <div class="block">
    <p class="text-center spaced">PROJET RADIOPHONIQUE À LONGUE PORTÉE</p>
  </div>
  <div class="footer">
    <v-btn
      href="https://www.facebook.com/nina.webradio/"
      target="_blank"
      rel="noopener noreferrer"
      icon="mdi:mdi-facebook"
      variant="outlined"
      class="social-icon"
    />
    <v-btn
      href="mailto:infos@nina.fm"
      rel="noopener noreferrer"
      icon="mdi:mdi-email-fast-outline"
      variant="outlined"
      class="social-icon"
    />
    <v-btn
      href="https://www.mixcloud.com/Nina_fm/"
      target="_blank"
      rel="noopener noreferrer"
      icon="mdi:mdi-soundcloud"
      variant="outlined"
      class="social-icon"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
.block {
  background: rgba($color-info-bg, $opacity-info-bg);
  color: $color-info-text;
  .v-application.dark & {
    background: rgba($night-color-info-bg, $opacity-info-bg);
    color: $night-color-info-text;
  }
  padding: $margin-global;
  margin-bottom: calc($margin-global/2);
  @include prefix(border-radius, 3px);

  &:last-child {
    margin-bottom: 0;
  }
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: $color-main-text;
  .v-application.dark & {
    color: $night-color-main-text;
  }
  font-weight: 700;
}
.spaced {
  letter-spacing: 0.1em !important;
}
.edito {
  background: transparent;
  color: $color-info-text;
  .v-application.dark & {
    color: $night-color-info-text;
  }
  padding: $margin-global;
  margin-bottom: calc($margin-global/2);

  &:first-child {
    padding-top: 0 !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: $color-info-text;
    .v-application.dark & {
      color: $night-color-info-text;
    }
    font-family: $font-condensed;
    font-size: 1.6em;
    font-weight: 300;
    line-height: 1.2em;
    text-align: center;
  }
  small {
    text-transform: uppercase;
    font-size: 0.5em;
    border-bottom: 1px solid $color-main-text;
    .v-application.dark & {
      border-bottom: 1px solid $night-color-main-text;
    }
  }
  strong {
    letter-spacing: 0;
    font-weight: bold;
  }
}

blockquote {
  position: relative;
  padding: 0 $margin-global;
  margin: 0 0 0 0;
  color: $color-info-text;
  .v-application.dark & {
    color: $night-color-info-text;
  }

  p {
    position: relative;
    z-index: 1;
    font-family: $font-cursive;
    font-size: 2vw;
    line-height: 1.2em;
    @include respond-to(tablet) {
      font-size: 4vw;
    }
    @include respond-to(tablet) {
      font-size: 5vw;
    }
  }

  &:before {
    content: "\e902";
    font-family: $font-icons !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    font-size: 4em;
    color: $color-progress-track;
    .v-application.dark & {
      color: $night-color-progress-track;
    }
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  cite {
    font-family: $font-family;
    font-size: 0.8em;
    font-style: normal;
    text-align: right;
    display: block;
    color: inherit;
  }
}
.footer {
  padding-top: $margin-global;
  text-align: center;
  :deep(.v-btn) {
    margin-left: 6px;
    margin-right: 6px;
  }
}
</style>
