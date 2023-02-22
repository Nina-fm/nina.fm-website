<script lang="ts" setup>
import { Snackbar } from '~~/stores/snackbar';

const props = defineProps<{
  modelValue: Snackbar[],
}>()

const { modelValue } = toRefs(props);

</script>

<template>
  <v-snackbar v-for="snack in modelValue" :model-value="true" :timeout="snack.duration" :color="snack.color">
    {{ snack.message }}
</v-snackbar>
</template>

<style scoped></style>
