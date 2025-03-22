<script lang="ts" setup>
  defineEmits<{
    (e: 'click'): void
  }>()

  const msg = {
    locked: 'Cliquez pour lancer la lecture',
    loading: 'Recherche des infos...',
    mixtape: 'Une mixtape Nina.fm',
    listening: "À l'écoute sur Nina.fm",
  }
  const { isLocked, isLoading, isPlaying } = useAudioStoreRefs()
  const { isMixtape, liveQuery } = useMetadataStoreRefs()
  const { toggleDetails } = usePeakThemeStore()
  const { isDetailsOpen } = usePeakThemeStoreRefs()

  const shouldPlay = computed(() => !isLocked.value || isLoading.value)
  const initMsg = computed(() => (shouldPlay.value ? msg.loading : msg.locked))
  const typeText = computed(() => (shouldPlay.value ? (isMixtape.value ? msg.mixtape : msg.listening) : false))
  const artist = computed(() => liveQuery.value?.authors)
  const title = computed(() => liveQuery.value?.name)
</script>

<template>
  <ClientOnly>
    <div class="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <div
        class="font-condensed pointer-events-auto flex h-fit max-w-[80vw] items-center gap-5 px-4 py-3.5 md:px-5 md:py-4"
      >
        <PeakPlayerEqualizer />
        <div class="h-5 overflow-hidden">
          <div
            :class="
              cn('relative top-0', {
                'animate-[playerLoop_10s_infinite]': typeText,
              })
            "
            @click="$emit('click')"
          >
            <div
              class="m-0 h-5 w-auto max-w-[70vw] overflow-hidden text-ellipsis whitespace-nowrap"
              data-append="trackinfo"
            >
              <span v-if="shouldPlay && artist && title">
                <strong v-if="artist" class="mr-2 uppercase">
                  {{ artist }}
                </strong>
                <span>{{ title }}</span>
              </span>
              <span v-else>{{ initMsg }}</span>
            </div>
            <div class="h-5 whitespace-nowrap" data-append="tracktype">
              {{ typeText }}
            </div>
          </div>
        </div>
        <ControlButton
          v-if="isMixtape && (shouldPlay || isPlaying)"
          :icon="isDetailsOpen ? 'remove_circle_outline' : 'add_circle_outline'"
          class="-mb-3 -mt-2"
          @click="toggleDetails"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<style>
  @keyframes playerLoop {
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
</style>
