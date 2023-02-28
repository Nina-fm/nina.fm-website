<script lang="ts" setup>
interface Star {
  styles: {
    width: string
    height: string
    top: string
    left: string
    opacity: number
  }
}
const params = {
  sizes: { min: 3, max: 6 },
  positions: {
    left: { min: 5, max: 95 },
    top: { min: 5, max: 35 },
  },
}

const { listeners } = useMetadataStoreRefs()
const stars = ref<Star[]>()
const count = computed(() => (listeners.value <= 0 ? 0 : listeners.value - 1))

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min) + min)

const getRandomStyles = (): Star => {
  const { sizes, positions } = params
  const size = getRandom(sizes.min, sizes.max)
  const range = sizes.max - sizes.min + 1
  const step = (size - range + 2) * (100 / range)
  const opacity = step + 50 * ((100 - step) / 100)
  return {
    styles: {
      width: `${size}px`,
      height: `${size}px`,
      left: `${getRandom(positions.left.min, positions.left.max)}%`,
      top: `${getRandom(positions.top.min, positions.top.max)}%`,
      opacity: opacity / 100,
    },
  }
}

const updateStars = () => {
  stars.value = Array.from(Array(count.value), (e, i) => {
    if (stars?.value?.[i]) {
      return stars.value[i]
    }
    return getRandomStyles()
  })
}

watch(count, () => updateStars())

onMounted(() => updateStars())
</script>

<template>
  <v-sheet class="audience" color="transparent">
    <div
      v-for="(star, index) in stars"
      :key="index"
      :style="star.styles"
      :title="`Vous partagez actuellement Nina.fm avec ${count} auditeurs !`"
      class="auditor"
    />
  </v-sheet>
</template>

<style lang="scss" scoped>
@import "../assets/scss/base";
$brightness: 0 0 3em 0 $color-audience, 0 0 5em 0.3em $color-audience;

.audience {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;

  .auditor {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    opacity: 0;
    background: $color-audience;
    @include prefix(animation, appear 1s ease-in);
    @include prefix(box-shadow, $brightness);
    @include prefix(border-radius, 50%);
    @include prefix(transition, $animation);

    &:hover {
      @include prefix(transform, scale(2));
    }

    @include respond-to(phone) {
      @include prefix(transform, scale(0.6));
    }

    @include respond-to(tablet) {
      @include prefix(transform, scale(0.8));
    }
  }
}

@include keyframes(appear) {
  from {
    opacity: 0;
  }
}
</style>
