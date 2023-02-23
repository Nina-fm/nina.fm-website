<script lang="ts" setup>
import IconButton from "./IconButton.vue"

defineEmits<{
  (e: "click"): void
}>()

const msg = {
  locked: "Cliquez pour lancer la lecture",
  loading: "Recherche des infos...",
  mixtape: "Une mixtape Nina.fm",
  listening: "À l'écoute sur Nina.fm",
}
const { detailsOpen } = useAppStoreRefs()
const { toggleDetails } = useAppStore()
const { isLocked, isLoading, isMuted, isPlaying } = useAudioStoreRefs()
const { toggleMute } = useAudioStore()
const { isNight } = useDaylightStoreRefs()
const { isMixtape, liveQuery } = useMetadataStoreRefs()

const shouldPlay = computed(() => !isLocked.value || isLoading.value)
const initMsg = computed(() => (shouldPlay.value ? msg.loading : msg.locked))
const typeText = computed(() => (shouldPlay.value ? (isMixtape.value ? msg.mixtape : msg.listening) : false))
const artist = computed(() => liveQuery.value?.authors)
const title = computed(() => liveQuery.value?.name)
const controlsMsg = computed(
  () => `${isMuted ? "Activer" : "Désactiver"} le son (vous pouvez aussi utiliser la barre d'espace)`
)
const equalizerPath = ref<string | null>(null)

const updateEqualizer = async () => {
  equalizerPath.value = (
    await import(`../assets/images/equalizer${!isPlaying.value ? "-loader" : ""}${isNight.value ? "-night" : ""}.gif`)
  ).default
}

watch([isPlaying, isNight], () => {
  updateEqualizer()
})

onMounted(() => {
  updateEqualizer()
})
</script>

<template>
  <client-only>
    <div class="player">
      <div class="player-track">
        <div
          class="equalizer"
          :title="controlsMsg"
          :style="{ ...(equalizerPath ? { backgroundImage: `url(${equalizerPath})` } : {}) }"
          @click="toggleMute"
        />
        <div class="track-viewer">
          <div :class="{ animated: typeText }" class="slider" @click="$emit('click')">
            <div class="track-text" data-append="trackinfo">
              <span v-if="shouldPlay && artist && title">
                <strong v-if="artist">{{ artist }}</strong>
                <span>{{ title }}</span>
              </span>
              <span v-else>{{ initMsg }}</span>
            </div>
            <div class="track-type" data-append="tracktype">{{ typeText }}</div>
          </div>
        </div>
        <IconButton
          v-if="isMixtape && (shouldPlay || isPlaying)"
          class="player-toggle"
          :size="10"
          :active="detailsOpen"
          icon-active="nina-icon-remove_circle_outline"
          icon-inactive="nina-icon-add_circle_outline"
          @click="toggleDetails"
        />
      </div>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
@include keyframes(playerLoop) {
  0% {
    top: 0;
  }
  78% {
    top: 0;
  }
  80% {
    top: -20px;
  }
  99% {
    top: -20px;
  }
  100% {
    top: 0;
  }
}
.player {
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
.player-track {
  z-index: 100;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  padding: 15px 40px 0 20px;
  color: $color-main-text;
  background-color: rgba($color-main-bg, 0);
  .v-application.dark & {
    color: $night-color-main-text;
    background-color: rgba($night-color-main-bg, 0);
  }
  @extend .noSelect;
  overflow: hidden;
  font-size: 1.1em;
  font-family: $font-condensed;
  i {
    position: relative;
    top: 0.1em;
  }
  @include respond-to(phone) {
    max-width: calc(100% - #{$margin-global * 3});
    i {
      top: 0.2em;
    }
  }
  &.fullscreen {
    max-width: 100%;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
  }
}
.track-viewer {
  height: 20px;
  overflow: hidden;
  .slider {
    position: relative;
    top: 0;
    &.animated {
      @include prefix(animation, playerLoop 10s infinite);
    }
  }
}
.track-text {
  margin: 0;
  width: auto;
  margin-left: #{$margin-global + 15};
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  strong {
    text-transform: uppercase;
    margin-right: #{$margin-global - 10};
  }
}
.track-type {
  margin-left: 35px;
  height: 20px;
  white-space: nowrap;
}
.player-toggle {
  right: 10px;
  top: 50%;
  @include prefix(transform, translateY(-50%));
  margin-top: 0.25em;
  @include respond-to(tablet) {
    /*margin-top: 0;*/
  }
}
.equalizer {
  z-index: 10;
  width: $equalizer-size;
  height: $equalizer-size;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  @include prefix(transform, translateY(-50%));
  margin-top: 0.05em;
  cursor: pointer;
  .v-application.muted & {
    opacity: 0.2;
  }
}
</style>
