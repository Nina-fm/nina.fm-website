<script lang="ts" setup>
import Audience from "../components/Audience.vue"
import Background from "../components/Background.vue"
import Brand from "../components/Brand.vue"
import Controls from "../components/Controls.vue"
import Credits from "../components/Credits.vue"
import MixtapeDetails from "../components/MixtapeDetails.vue"
import Player from "../components/Player.vue"
import Rainbow from "../components/Rainbow.vue"

const rainbowMode = useCookie("nina-user-rainbowMode", { default: () => false })
const { setClasses } = useAppStore()

const handleToggleRainbowMode = () => {
  rainbowMode.value = !rainbowMode.value
  setClasses({
    rainbow: rainbowMode.value,
  })
}
</script>

<template>
  <Background />
  <Audience />
  <Credits />
  <Player />
  <Brand />
  <Controls @toggle-rainbow-mode="handleToggleRainbowMode" />
  <MixtapeDetails />
  <Rainbow :active="rainbowMode" />
</template>

<style scoped></style>
