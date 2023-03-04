<script lang="ts" setup>
const props = defineProps<{
  size?: number | string
}>()

const { size } = toRefs(props)
const s = computed(() => (typeof size?.value === "number" ? `${size?.value}px` : size?.value))
</script>

<template>
  <div class="circle-wrapper" v-bind="$attrs">
    <i></i>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
div.circle-wrapper {
  --s: v-bind(s); /*Size of the circle */
  --p: 0px; /* padding */

  height: var(--s);
  width: var(--s);
  border-radius: 50%;
  overflow: hidden;
}
.circle-wrapper i,
.circle-wrapper::before {
  content: "";
  float: left;
  height: 100%;
  width: 50%;
  shape-outside: radial-gradient(farthest-side at right, transparent calc(100% - var(--p)), #fff 0);
}
.circle-wrapper i {
  float: right;
  shape-outside: radial-gradient(farthest-side at left, transparent calc(100% - var(--p)), #fff 0);
}
</style>
