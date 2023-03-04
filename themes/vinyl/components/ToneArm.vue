<script lang="ts" setup>
const ToneArmSvg = defineAsyncComponent(() => import("../assets/svg/tonearm.svg"))

const props = defineProps<{
  progress?: number
}>()

// Angle range is 10deg
const angleStart = 0
const angleEnd = 25

const config = useRuntimeConfig()
const { progress } = toRefs(props)
const progressAngle = computed(() => `${(angleEnd * (progress?.value ?? angleStart)) / 100}deg`)
const defaultDelay = `${config.public.streamRefreshTime}ms`
const delay = ref<string>(defaultDelay)
const back = ref<boolean>(false)

const updatePosition = () => {
  back.value = true
  setTimeout(() => (back.value = false), 1000)
}

watch(
  () => progress,
  (value, oldValue) => {
    if ((value ?? 0) < (oldValue ?? 0)) {
      updatePosition()
    }
  }
)

onMounted(() => {
  updatePosition()
})
</script>

<template>
  <div class="tone-arm text-background" :class="{ back }">
    <ToneArmSvg class="tone-arm-svg" />
  </div>
</template>

<style lang="scss" scoped>
.tone-arm {
  position: absolute;
  top: calc(50% - 450px - 170px);
  left: calc(50% + 450px - 80px);
  height: 900px;
  transform-origin: 50% 21.25%;
  transform: rotate(v-bind(progressAngle));
  transition: transform v-bind(delay) linear;
  //   transition: box-shadow 2s ease-in-out;

  &.back {
    transition: transform 0.5s linear !important;
  }

  :deep(svg) {
    fill: currentColor;
    // stroke-width: 2px;
    height: 100%;
    // filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));

    .arm {
      stroke: rgb(var(--v-theme-primary));
    }

    .v-application.muted & {
      // filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.9));
    }
  }
}
</style>
