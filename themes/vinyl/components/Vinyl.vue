<script lang="ts" setup>
const LogoSvg = defineAsyncComponent(() => import("~/assets/svg/logo-stroke.svg"))

const props = defineProps<{
  title?: string
  artist?: string
}>()

const { title, artist } = toRefs(props)
const config = useRuntimeConfig()
</script>

<template>
  <v-container class="d-flex h-100 align-center">
    <v-row align-content="center">
      <v-col class="d-flex justify-center">
        <v-avatar color="primary" :size="300">
          <div class="rotate d-flex flex-column align-center">
            <h1>{{ config.public.sitename }}</h1>
            <!-- <LogoSvg /> -->
            <v-avatar color="background" :size="30" class="my-5" />
            <b>{{ title ?? " " }}</b>
            <p>{{ artist ?? " " }}</p>
          </div>
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import "../assets/scss/theme.scss";
:deep(svg) {
  width: 120px;
}
:deep(.line) {
  fill: none;
  stroke: cur;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1000 1000;
  stroke-dashoffset: 0;
  stroke-width: 2px;
  transition: all 3s ease-out, stroke-dasharray 0s, stroke-dashoffset 0s;
}
.rotate {
  animation: rotation 8s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
