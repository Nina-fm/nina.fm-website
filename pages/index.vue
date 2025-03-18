<script lang="ts" setup>
const { metaTitle } = useAppStoreRefs();

watch(metaTitle, (value) => {
  useHead({ title: value });
});
</script>

<template>
  <ThemePage name="index" />
</template>
