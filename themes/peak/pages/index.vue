<script lang="ts" setup>
import Audience from "../components/Audience.vue"
import Background from "../components/Background.vue"
import Brand from "../components/Brand.vue"
import ContentPage from "../components/ContentPage.vue"
import Controls from "../components/Controls.vue"
import Credits from "../components/Credits.vue"
import MixtapeDetails from "../components/MixtapeDetails.vue"
import Player from "../components/Player.vue"
import Rainbow from "../components/Rainbow.vue"

const { toggleDetails, closeContent, closeDetails } = usePeakThemeStore()

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      toggleDetails()
      break
    case "Escape":
      closeDetails()
      closeContent()
      break
    default:
      break
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown)
})
</script>

<template>
  <Background />
  <Audience />
  <Credits />
  <Player />
  <Brand />
  <MixtapeDetails />
  <ContentPage />
  <Controls />
  <Rainbow />
</template>

<style scoped></style>
