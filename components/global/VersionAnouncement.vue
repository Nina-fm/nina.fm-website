<script lang="ts" setup>
import { useDisplay } from "vuetify"

const { $version } = useNuxtApp()
const { xs, mdAndDown, update } = useDisplay()
const isOpened = computed(() => $version.messages.value.length > 0)
const currentMessage = computed(() => $version.messages.value?.[0])

const handleClose = () => {
  $version.messages.value = $version.messages.value.length > 1 ? $version.messages.value.slice(1) : []
}

onMounted(() => {
  document.addEventListener("resize", update)
})

onUnmounted(() => {
  document.removeEventListener("resize", update)
})
</script>

<template>
  <ClientOnly>
    <v-dialog
      v-if="currentMessage"
      v-model="isOpened"
      class="versionAnouncement"
      :class="{ 'w-100': xs, 'w-75': !xs && mdAndDown, 'w-50': !xs && !mdAndDown }"
      transition="dialog-bottom-transition"
      attach=".v-app"
    >
      <v-card>
        <v-card-text>
          <div class="versionAnouncement-title">{{ currentMessage.title }}</div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="versionAnouncement-message" v-html="currentMessage.message" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="handleClose">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.versionAnouncement {
}
.versionAnouncement-title {
  font-size: 2em;
  text-align: center;
  line-height: 0.75em;
  padding-top: 0.5em;
  padding-bottom: 0.75em;
}
:deep(.signature) {
  margin-top: 1em;
  padding-right: 1em;
  text-align: right;
}
</style>
