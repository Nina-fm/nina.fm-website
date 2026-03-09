<script lang="ts" setup>
  const props = defineProps<{
    name: ThemeKey
  }>()
  const { name } = toRefs(props)
  const componentRef = ref<string | null>(null)

  const theme = computed(() => defineAsyncComponent(() => import(`../../themes/${name.value}/theme.vue`)))

  watch(name, (value) => {
    componentRef.value = `${value}-${Date.now()}`
  })
</script>

<template>
  <component :is="theme" :ref="componentRef" />
</template>
