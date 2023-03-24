<script lang="ts" setup>
const props = defineProps<{
  name: string
}>()
const { current } = useThemeStoreRefs()
const { name } = toRefs(props)
const page = computed(() =>
  defineAsyncComponent(() => import(`../../themes/${current.value}/pages/${name?.value}.vue`))
)
</script>

<template>
  <component :is="page" :key="`${current}-${name}`">
    <slot />
  </component>
</template>
