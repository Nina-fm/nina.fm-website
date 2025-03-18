<script lang="ts" setup>
const props = defineProps<{
  isDetailsOpen?: boolean;
  turnedBack?: boolean;
  title?: string;
  artist?: string;
  cover?: string;
  tracks?: Obj[];
  isMixtape?: boolean;
}>();

defineEmits<{
  (e: "click"): void;
  (e: "turn"): void;
  (e: "close"): void;
}>();

const { isContentOpen, isDetailsOpen } = useVinylThemeStoreRefs();
const { turnedBack, title, artist, tracks, cover, isMixtape } = toRefs(props);
</script>

<template>
  <div v-if="isDetailsOpen" class="absolute z-0 inset-0 bg-transparent" @click.stop.prevent="$emit('close')" />
  <div
    :class="
      cn(
        'perspective z-10 absolute size-[900px] scale-50 sm:scale-75 md:scale-100 top-[45vh] sm:top-[60vh] md:top-[70vh] rotate-[15deg] transition-all duration-700 ease-in-out bg-transparent',
        [$attrs.class],
        {
          'left-[-600px] sm:left-[-750px] md:left-[-900px] cursor-pointer': !isDetailsOpen,
          'left-1/2 md:left-1/3 -translate-x-1/2 top-1/2 sm:top-1/2 md:top-1/2 -translate-y-1/2 mt-2 -ml-10 sm:-ml-5 md:-ml-5 rotate-[-5deg] md:rotate-[-10deg]':
            isDetailsOpen,
          '-left-full top-[100vh] rotate-[-20deg] -translate-y-1/2': !isMixtape,
          'left-[-1200px]': isContentOpen && !isDetailsOpen,
          'left-[-900px] top-[100vh] rotate-[-20deg] -translate-y-1/2': isContentOpen && isDetailsOpen,
        }
      )
    "
    @click="!isDetailsOpen ? $emit('click') : null"
  >
    <div
      :class="
        cn(
          'relative size-full transition-all ease-in-out duration-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] preserve-3d rotate-y-0',
          {
            'rotate-y-10': isDetailsOpen,
            'rotate-y-190': turnedBack,
          }
        )
      "
    >
      <div class="absolute bg-muted size-full p-12 backface">
        <VinylCoverDetails :title="title" :tracks="tracks" :artist="artist" :is-mixtape="isMixtape" />
        <VinylCoverSwitchButton @click="$emit('turn')" />
      </div>
      <div class="absolute bg-muted size-full backface rotate-y-180">
        <div class="flex justify-center items-center size-full bg-muted p-16">
          <img :src="cover" class="relative size-full object-contain z-10" />
        </div>
        <VinylCoverSwitchButton @click="$emit('turn')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}
.backface {
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.rotate-y-0 {
  transform: rotateY(0deg);
}
.rotate-y-10 {
  transform: rotateY(10deg);
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.rotate-y-190 {
  transform: rotateY(190deg);
}
</style>

<!-- <style lang="scss" scoped>
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

  &.isDetailsOpen {
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

.jaquette.isDetailsOpen .jaquette-inner {
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
</style> -->
