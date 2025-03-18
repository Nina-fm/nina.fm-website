<script setup lang="ts">
const { isMuted, isPlaying } = useAudioStoreRefs();
const { toggleMute } = useAudioStore();
const { isDarkModeActive } = useThemeStoreRefs();

const equalizerPath = ref<string | null>(null);

const controlsMsg = computed(
  () => `${isMuted ? "Activer" : "Désactiver"} le son (vous pouvez aussi utiliser la barre d'espace)`
);

const updateEqualizer = async () => {
  equalizerPath.value = (
    await import(
      `../assets/images/equalizer${!isPlaying.value ? "-loader" : ""}${isDarkModeActive.value ? "-night" : ""}.gif`
    )
  ).default;
};

watch([isPlaying, isDarkModeActive], () => {
  updateEqualizer();
});

onMounted(() => {
  updateEqualizer();
});
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div
          :class="
            cn('bg-no-repeat bg-center bg-contain -mt-0.5 size-4 pointer-events-auto cursor-pointer', {
              'opacity-20': isMuted,
            })
          "
          :style="{
            ...(equalizerPath ? { backgroundImage: `url(${equalizerPath})` } : {}),
          }"
          @click="() => toggleMute()"
        />
      </TooltipTrigger>
      <TooltipContent arrow>
        {{ controlsMsg }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
