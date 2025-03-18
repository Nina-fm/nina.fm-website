<script lang="ts" setup>
const props = defineProps<{
  name: ThemeKey
}>()
const { name } = toRefs(props)
const componentRef = ref<ThemeKey | null>(null)

const theme = computed(() => {
  componentRef.value = name.value
  return defineAsyncComponent(() => import(`../../themes/${name.value}/theme.vue`))
})
</script>

<template>
  <component :is="theme" :ref="componentRef" />
</template>
