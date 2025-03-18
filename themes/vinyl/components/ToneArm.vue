<script lang="ts" setup>
const ToneArmSvg = defineAsyncComponent(() => import("../assets/svg/tonearm.svg"));

const props = defineProps<{
  progress?: number;
}>();

// Angle range is 10deg
const angleStart = 0;
const angleEnd = 25;

const config = useRuntimeConfig();
const { isMixtape } = useMetadataStoreRefs();

const { progress } = toRefs(props);
const progressAngle = computed(() => `${(angleEnd * (progress?.value ?? angleStart)) / 100}deg`);

const defaultDelay = `${config.public.streamRefreshTime}ms`;
const delay = computed(() => (isMixtape.value ? defaultDelay : "3000ms"));
const back = ref<boolean>(false);

const updatePosition = () => {
  back.value = true;
  setTimeout(() => (back.value = false), 1000);
};

watch(
  () => progress,
  (value, oldValue) => {
    if ((value ?? 0) < (oldValue ?? 0)) {
      updatePosition();
    }
  }
);

onMounted(() => {
  updatePosition();
});
</script>

<template>
  <div
    :class="
      cn(
        'text-background h-[900px] absolute top-[calc(50%-450px-170px)] left-[calc(50%+450px-80px)] origin-[50%_21.25%]',
        { back }
      )
    "
    :style="{ transform: `rotate(${progressAngle})`, transition: `transform ${delay} linear` }"
  >
    <ToneArmSvg class="fill-current h-full [&_.arm]:stroke-primary" />
  </div>
</template>
