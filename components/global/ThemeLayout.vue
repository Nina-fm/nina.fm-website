<script lang="ts" setup>
const props = defineProps<{
  name?: string
}>()
const { current } = useThemeStoreRefs()
const { name } = toRefs(props)
const layout = computed(() =>
  defineAsyncComponent(() => import(`../../themes/${current.value}/layouts/${name?.value ?? "default"}.vue`))
)
</script>

<template>
  <component :is="layout" :key="`${current}-${name}`">
    <NuxtPage />
  </component>
</template>
