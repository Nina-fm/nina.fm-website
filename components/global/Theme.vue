<script lang="ts" setup>
const props = defineProps<{
  name: ThemeKey
}>()
const { name } = toRefs(props)
const theme = computed(() => defineAsyncComponent(() => import(`../../themes/${name.value}/theme.vue`)))
</script>

<template>
  <component :is="theme" :key="name" />
</template>
