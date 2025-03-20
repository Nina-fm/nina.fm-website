<script lang="ts" setup>
const props = defineProps<{
  title?: string
  artist?: string
  cover?: string
  tracks?: Track[]
}>()

const { toggleDetails, closeDetails, toggleJaquette } = useVinylThemeStore()
const { isContentOpen, isDetailsOpen, isJaquetteTurnedBack } = useVinylThemeStoreRefs()
const { title, artist, tracks, cover } = toRefs(props)
</script>

<template>
  <div v-if="isDetailsOpen" class="absolute z-0 inset-0 bg-transparent" @click.stop.prevent="closeDetails()" />
  <div
    :class="
      cn(
        'perspective z-10 absolute size-[900px] scale-50 sm:scale-75 md:scale-100 top-[45vh] sm:top-[60vh] md:top-[70vh] rotate-[15deg] transition-all duration-700 ease-in-out bg-transparent',
        [$attrs.class],
        {
          'left-[-600px] sm:left-[-750px] md:left-[-900px] cursor-pointer': !isDetailsOpen,
          'left-1/2 md:left-1/3 -translate-x-1/2 top-1/2 sm:top-1/2 md:top-1/2 -translate-y-1/2 mt-2 -ml-10 sm:-ml-5 md:-ml-5 rotate-[-5deg] md:rotate-[-8deg]':
            isDetailsOpen,
          'left-[-1200px]': isContentOpen && !isDetailsOpen,
          'left-[-900px] top-[100vh] rotate-[-20deg] -translate-y-1/2': isContentOpen && isDetailsOpen,
        }
      )
    "
    @click="!isDetailsOpen ? toggleDetails() : null"
  >
    <div
      :class="
        cn(
          'relative size-full transition-all ease-in-out duration-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] preserve-3d rotate-y-0',
          {
            'rotate-y-10': isDetailsOpen,
            'rotate-y-190': isJaquetteTurnedBack,
          }
        )
      "
    >
      <div class="absolute bg-muted size-full p-12 backface">
        <VinylCoverDetails :title="title" :tracks="tracks" :artist="artist" />
        <VinylCoverSwitchButton @click="toggleJaquette()" />
      </div>
      <div class="absolute bg-muted size-full backface rotate-y-180">
        <div class="flex justify-center items-center size-full bg-muted p-16">
          <img :src="cover" class="relative size-full object-contain z-10" />
        </div>
        <VinylCoverSwitchButton @click="toggleJaquette()" />
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
