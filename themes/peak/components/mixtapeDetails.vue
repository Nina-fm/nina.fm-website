<script lang="ts" setup>
import uniqid from "uniqid"

const { metadata, progress } = useMetadataStoreRefs()
const tracks = computed(
  () =>
    (metadata?.value?.tracks as Track[])?.map((t) => ({
      ...t,
      key: uniqid(),
    })) ?? []
)
</script>

<template>
  <client-only>
    <div class="details">
      <div class="track-details">
        <div class="container">
          <div v-if="metadata?.cover_url" class="track-details-cover">
            <img :src="`${metadata?.cover_url}`" />
          </div>
          <div class="track-details-type">
            <v-progress-linear :model-value="`${progress}`" :height="2" />
            Une Mixtape proposée par
            <span class="artist">{{ metadata?.authors_text }}</span>
          </div>
          <div class="track-details-text">
            <div data-append="tracklist">
              <div v-if="!tracks.length" class="text-tracks">
                {{ metadata?.tracks_text }}
              </div>
              <div v-else>
                <v-list class="tracklist">
                  <v-list-item v-for="(track, i) in tracks" :key="track.key">
                    <template #prepend>
                      <span class="num">{{ i + 1 }}</span>
                    </template>
                    <span class="artist">{{ track.artist }}</span> –
                    <span class="title">{{ track.title }}</span>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
.details {
  /*z-index: 10;*/
  @include prefix(transition, $animation-nobg);
  width: calc(50% - $margin-global);
  position: absolute;
  top: $margin-global;
  bottom: $margin-global;
  left: -50%;
  color: $color-info-text;
  background-color: rgba($color-info-bg, $opacity-details-bg);
  .v-application.dark & {
    color: $night-color-info-text;
    background-color: rgba($night-color-info-bg, $opacity-details-bg);
  }
  @include respond-to(tablet) {
    width: 100%;
    left: -100%;
  }
  .container {
    position: absolute;
    top: 0;
    overflow: hidden;
    width: calc(100% - ($margin-global * 3));
    left: $margin-global;
    margin-bottom: $margin-global;
  }
  .v-application.details & {
    left: $margin-global;
  }
  :deep(.artist) {
    font-weight: bold;
  }
}
.track-details {
  overflow-y: scroll;
  position: absolute;
  top: $margin-global * 2.5;
  bottom: 0;
  left: 0;
  right: 0;
}
.track-details-type {
  font-family: $font-condensed;
  text-align: right;
  color: $color-info-text;
  .v-application.dark & {
    color: $night-color-info-text;
  }
  :deep(span) {
    position: relative;
    display: inline-block;
    &.artist {
      margin-left: 0.2em;
    }
    &:not(:empty) {
      margin-bottom: 1em;
    }
  }
  :deep(.v-progress-linear) {
    margin-bottom: 1em;
  }
}
.track-details-text {
  font-family: $font-condensed;
  overflow: scroll;
  color: $color-info-text;
  .v-application.dark & {
    color: $night-color-info-text;
  }
  :deep(ol),
  :deep(ul) {
    margin: 0;
    padding: 0 0 0 0;
    line-height: 1.5em;
    :deep(li) {
      margin-left: 1.5em;
      padding-left: 0.6em;
      white-space: nowrap;
    }
  }
  :deep(p) {
    margin: 35px 0px 25px 0px;
  }
  .tracklist {
    font-size: 1em;
    line-height: 0.9em;
    color: $color-info-text;
    padding-top: 0;

    :deep(.v-list-item) {
      padding-left: 1em;
      padding-right: 0;
      font-size: 1em;
      min-height: 18px !important;
    }
    :deep(.v-list-item__prepend) {
      width: 0.2em;
      justify-content: flex-end;
      margin-right: 1em;
    }
    .v-application.dark & {
      background-color: $night-color-main-bg;
      color: currentColor;
    }
  }
}
.track-details-cover {
  z-index: 10000000000;
  position: relative;
  margin-bottom: 0;

  :deep(img) {
    margin: auto;
    width: 100%;
  }
}
.text-tracks {
  white-space: pre-line;
}
</style>
