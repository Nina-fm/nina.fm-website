<script lang="ts" setup>
import Daylight from "../components/daylight.vue"
import Player from "../components/player.vue"
import Metadata from "../components/metadata.vue"
</script>

<template>
  <v-row>
    <v-col cols="12">
      <h1>Nina.fm</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <Player />
    </v-col>
    <v-col cols="6">
      <Daylight />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <Metadata />
    </v-col>
  </v-row>
</template>

<style scoped></style>
