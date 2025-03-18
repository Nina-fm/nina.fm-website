<script lang="ts" setup>
interface Star {
  styles: {
    width: string;
    height: string;
    top: string;
    left: string;
    opacity: number;
  };
}
const params = {
  sizes: { min: 3, max: 6 },
  positions: {
    left: { min: 5, max: 95 },
    top: { min: 5, max: 35 },
  },
};

const { listeners } = useMetadataStoreRefs();
const stars = ref<Star[]>();
const count = computed(() => (listeners.value <= 0 ? 0 : listeners.value - 1));

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min) + min);

const getRandomStyles = (): Star => {
  const { sizes, positions } = params;
  const size = getRandom(sizes.min, sizes.max);
  const range = sizes.max - sizes.min + 1;
  const step = (size - range + 2) * (100 / range);
  const opacity = step + 50 * ((100 - step) / 100);
  return {
    styles: {
      width: `${size}px`,
      height: `${size}px`,
      left: `${getRandom(positions.left.min, positions.left.max)}%`,
      top: `${getRandom(positions.top.min, positions.top.max)}%`,
      opacity: opacity / 100,
    },
  };
};

const updateStars = () => {
  stars.value = Array.from(Array(count.value), (e, i) => {
    if (stars?.value?.[i]) {
      return stars.value[i];
    }
    return getRandomStyles();
  });
};

watch(count, () => updateStars());

onMounted(() => updateStars());
</script>

<template>
  <div class="absolute left-0 right-0 top-0 bottom-0 w-full h-full" color="transparent">
    <div
      v-for="(star, index) in stars"
      :key="index"
      class="absolute left-0 top-0"
      :style="{ left: star.styles.left, top: star.styles.top }"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div class="p-3 transition-transform duration-200 ease-in-out hover:scale-[2]">
              <div
                :style="{
                  width: star.styles.width,
                  height: star.styles.height,
                  opacity: star.styles.opacity,
                }"
                class="w-0 h-0 opacity-0 bg-white rounded-full brightness fadeIn"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent class="text-2xs" arrow>
            <strong>Une constellation d'auditeurs !</strong><br />
            Actuellement {{ count }} personnes écoutent Nina.fm.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

<style scoped>
.brightness {
  box-shadow: 0 0 3em 0 #fff, 0 0 5em 0.3em #fff;
  transition: all 0.3s ease-in-out;
}
.fadeIn {
  animation: appear 1s ease-in;
}
@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
