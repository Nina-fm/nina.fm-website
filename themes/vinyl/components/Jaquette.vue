<script lang="ts" setup>
const props = defineProps<{
  open?: boolean
  turnedBack?: boolean
  title?: string
  artist?: string
  cover?: string
  tracks?: Obj[]
  isMixtape?: boolean
}>()

defineEmits<{
  (e: "click"): void
  (e: "turn"): void
}>()

const { open, turnedBack, title, artist, tracks, cover, isMixtape } = toRefs(props)
</script>

<template>
  <v-sheet class="jaquette" :class="{ open, turnedBack, disabled: !isMixtape }" @click="$emit('click')">
    <div class="jaquette-inner">
      <div class="back-face">
        <div class="more-btn">
          <TipIcon :icon="'$ninaloop1'" :size="15" location="left" @click.stop.prevent="$emit('turn')">{{
            "Retourner la pochette"
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
        <div class="front-face-inner">
          <img :src="cover" class="jaquette-image" />
        </div>
        <div class="more-btn">
          <TipIcon :icon="'$ninaloop1'" :size="15" location="left" @click.stop.prevent="$emit('turn')">{{
            "Retourner la pochette"
          }}</TipIcon>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
.jaquette {
  z-index: 10;
  height: 900px;
  width: 900px;
  position: absolute;
  left: -900px;
  top: 70vh;
  transform: rotate(15deg);
  transition: all 0.8s ease-in-out;
  background-color: transparent;
  perspective: 1000px;

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

.jaquette-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: all 0.8s ease-in-out;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
}

.jaquette.open .jaquette-inner {
  transform: rotateY(10deg);
}

.jaquette.turnedBack .jaquette-inner {
  transform: rotateY(190deg);
}

.back-face,
.front-face {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.back-face {
  width: 100%;
  height: 100%;
  background-color: rgb(var(--v-theme-surface));
  padding: 3rem;
}

.front-face {
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  background-color: rgb(var(--v-theme-surface));
}

.front-face-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--v-theme-surface));
  padding: 65px;
}

.more-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-surface));
  position: absolute;
  z-index: 3;
  bottom: $margin-global;
  right: $margin-global;
}

.jaquette-image {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.jaquette-title {
  font-family: $font-family-title;
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.2em;
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
    margin-bottom: 0.4em;
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
