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
  <div
    :class="
      cn(
        'pointer-events-auto perspective z-10 absolute size-[1000px] transition-all duration-700 ease-in-out bg-transparent origin-top-left ',
        {
          'left-0 top-0 -translate-x-1/3 md:-translate-x-3/4 translate-y-[75vh] sm:translate-y-[65vh] md:translate-y-[70vh] lg:translate-y-[65vh] rotate-[6deg] cursor-pointer':
            !isDetailsOpen,
          'left-0 top-0 translate-x-[-9%] md:translate-x-[-18%] lg:translate-x-[-8%] xl:translate-x-[-5%] translate-y-[10%] sm:translate-y-0 lg:translate-y-[-5%] xl:translate-y-[-5%] rotate-[-2deg] sm:rotate-[-12deg] md:rotate-[-4deg] lg:rotate-[-6deg] xl:rotate-[-8deg]':
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
