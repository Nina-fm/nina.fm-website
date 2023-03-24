<script lang="ts" setup>
import HalfCircleTextWrapper from "./HalfCircleTextWrapper.vue"

const props = defineProps<{
  title?: string
  artist?: string
  cover?: string
  rotate?: boolean
}>()

const { title, artist, rotate, cover } = toRefs(props)
</script>

<template>
  <ClientOnly>
    <div class="vinyl">
      <v-sheet color="transparent" class="sticker" :class="{ rotate }">
        <v-avatar color="primary" :size="300" class="sticker-background" />
        <v-sheet rounded="circle" class="sticker-content">
          <HalfCircleTextWrapper :radius="300" :padding="20" position="top">
            <div class="sticker-top">
              <BrandLogo class="logo" />
            </div>
          </HalfCircleTextWrapper>
          <HalfCircleTextWrapper :radius="300" :padding="40" position="bottom">
            <div class="sticker-bottom">
              <div class="title">{{ title ?? "" }}</div>
              <div class="artist mt-2">{{ artist ?? "" }}</div>
            </div>
          </HalfCircleTextWrapper>
        </v-sheet>
      </v-sheet>
      <div class="sharp" />
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
@import "../assets/scss/theme.scss";

.vinyl {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(var(--v-theme-background));
    height: 1000px;
    width: 1000px;
    border-radius: 50%;
  }

  .sharp {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: rgb(var(--v-theme-background));
    &::before {
      content: "";
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-60%, -60%) rotate(45deg);
      height: 70%;
      width: 60%;
      border-radius: 50%;
      background-color: rgba(var(--v-theme-primary), 0.15);
    }
    &::after {
      content: "";
      z-index: 2;
      position: absolute;
      top: calc(50% - 3px);
      left: calc(50% - 5px);
      background-color: rgb(var(--v-theme-primary));
      height: 5px;
      width: 5px;
      display: flex;
      border-radius: 50%;
      transform-origin: center;
      transform: translate(-50%, -50%);
    }
  }
}
.sticker {
  width: 300px;
  height: 300px;
  position: relative;
}

.sticker-background {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.sticker-content {
  position: absolute;
  z-index: 2;
  color: currentColor;
  background: transparent;
  width: 100%;
  height: 100%;
}
:deep(.half-circle-wrapper) {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  color: rgb(var(--v-theme-surface));
}
.sticker-bottom {
  transform: translateY(30px);
  line-height: 1em;
}
.sticker-top {
  text-align: center;
  transform: translateY(15px);
  line-height: 1em;
}
:deep(h1) {
  font-family: $font-family-cursive;
  font-size: 3rem;
}
.logo {
  position: relative;
  display: inline-block;
  width: 140px;
}
.title {
  font-size: 1.2em;
  line-height: 1.1em;
  letter-spacing: -0.04em;
  font-weight: 600;
}
.artist {
  font-size: 0.8em;
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
