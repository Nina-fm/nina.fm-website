<script lang="ts" setup>
  import { useVinylThemeStore, useVinylThemeStoreRefs } from '~/themes/vinyl/stores/vinylTheme'

  const props = defineProps<{
    title?: string
    artist?: string
    year?: number | string
    cover?: string
    tracks?: Track[]
  }>()

  const { toggleDetails, toggleJaquette } = useVinylThemeStore()
  const { isContentOpen, isDetailsOpen, isJaquetteTurnedBack } = useVinylThemeStoreRefs()
  const { title, artist, tracks, cover } = toRefs(props)
</script>

<template>
  <div
    :class="
      cn(
        'perspective pointer-events-auto absolute z-10 size-[1000px] origin-top-left bg-transparent transition-all duration-700 ease-in-out',
        {
          'left-0 top-0 -translate-x-1/3 translate-y-[75vh] rotate-[6deg] cursor-pointer sm:translate-y-[65vh] md:-translate-x-3/4 md:translate-y-[70vh] lg:translate-y-[65vh]':
            !isDetailsOpen,
          'left-0 top-0 translate-x-[-9%] translate-y-[10%] rotate-[-2deg] sm:translate-y-0 sm:rotate-[-12deg] md:translate-x-[-18%] md:rotate-[-4deg] lg:translate-x-[-8%] lg:translate-y-[0%] lg:rotate-[-6deg] xl:translate-x-[-5%] xl:translate-y-[0%] xl:rotate-[-8deg]':
            isDetailsOpen,
          'left-[-1200px]': isContentOpen && !isDetailsOpen,
          'left-[-900px] top-[100vh] -translate-y-1/2 rotate-[-20deg]': isContentOpen && isDetailsOpen,
        },
      )
    "
    @click="!isDetailsOpen ? toggleDetails() : null"
  >
    <div
      :class="
        cn(
          'preserve-3d rotate-y-0 relative size-full shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-700 ease-in-out',
          {
            'rotate-y-10': isDetailsOpen,
            'rotate-y-190': isJaquetteTurnedBack,
          },
        )
      "
    >
      <div class="backface absolute size-full bg-muted p-12">
        <VinylCoverDetails :title="title" :tracks="tracks" :artist="artist" :year="year" />
        <VinylCoverSwitchButton @click="toggleJaquette()" />
      </div>
      <div class="backface rotate-y-180 absolute size-full bg-muted">
        <div class="flex size-full items-center justify-center bg-muted p-16">
          <img :src="cover" class="relative z-10 size-full object-contain" />
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
