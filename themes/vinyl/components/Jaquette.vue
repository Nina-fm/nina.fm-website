<script lang="ts" setup>
const props = defineProps<{
  open?: boolean
  title?: string
  artist?: string
  cover?: string
  tracks?: Obj[]
  isMixtape?: boolean
}>()

defineEmits<{
  (e: "click"): void
}>()

const { open, title, artist, tracks, cover, isMixtape } = toRefs(props)
</script>

<template>
  <v-sheet class="jaquette" :class="{ open, disabled: !isMixtape }" elevation="10" @click="$emit('click')">
    <div class="back-face">
      <div class="more-btn">
        <TipIcon class="mt-5" :icon="'$ninaSpiral'" :size="15" location="left" @click="() => {}">{{
          "Voir la pochette"
        }}</TipIcon>
      </div>
      <div class="d-flex flex-column justify-center align-center h-100">
        <div class="jaquette-title">{{ title }}</div>
        <div class="jaquette-tracks" :class="{ split: (tracks?.length ?? 0) > 10 }">
          <div v-for="(track, idx) in tracks" :key="`track-${idx}`">
            <span class="track-artist">{{ track.artist }}</span>
            <div class="separator" />
            {{ track.title }}
          </div>
        </div>
        <div v-if="artist" class="jaquette-artist">
          {{ isMixtape ? "Une mixtape signée " : "" }}
          <div class="mixtape-authors">{{ artist }}</div>
          {{ !isMixtape ? " à l'écoute sur Nina.fm" : "" }}
        </div>
      </div>
    </div>
    <div class="front-face">
      <div>
        <v-img :src="cover" class="jaquette-image ma-10" />
      </div>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
.jaquette {
  height: 900px;
  width: 900px;
  position: absolute;
  left: -900px;
  top: 70vh;
  transform: rotate(15deg);
  transition: all 0.4s ease-in-out;

  &.open {
    left: 80px;
    top: 50%;
    transform: rotate(-10deg) translateY(-50%);
  }

  &.disabled {
    left: -100%;
    top: 100vh;
    transform: rotate(-20deg) translateY(-50%);
  }
}
.back-face {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(var(--v-theme-surface));
  padding: 3rem;

  .more-btn  {
    position: absolute;
    top: $margin-global;
    right: $margin-global;
  }
}
.front-face {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  background-color: rgb(var(--v-theme-surface));
}
.jaquette-image {
  opacity: 0.75;
}

.jaquette-title {
  font-family: $font-family-title;
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.2em;
  //   border-bottom: 1px solid currentColor;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 75px;
}
.jaquette-artist {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1em;
  font-size: 1em;
  margin-top: 75px;

  .mixtape-authors {
    margin-top: 0.5em;
    font-family: $font-family-cursive;
    font-size: 2rem;
    color: rgb(var(--v-theme-primary));
  }
}
.jaquette-tracks {
  font-size: 0.9em;
  text-align: center;
  color: rgb(var(--v-theme-primary));

  &.split {
    columns: 2;
  }

  .separator {
    display: inline-block;
    &:before {
      content: "•";
      margin-left: 0.5em;
      margin-right: 0.5em;
    }
  }
  .track-artist {
    font-weight: bold;
    color: rgb(var(--v-theme-on-surface));
  }
}
</style>
