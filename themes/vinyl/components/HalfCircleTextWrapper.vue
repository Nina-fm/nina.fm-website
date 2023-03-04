<script lang="ts" setup>
const props = defineProps<{
  radius?: number | string
  padding?: number | string
  position?: "top" | "bottom"
}>()

const { radius, position, padding } = toRefs(props)
const s = computed(() => (typeof radius?.value === "number" ? `${radius?.value}px` : radius?.value))
const p = computed(() => (typeof padding?.value === "number" ? `${padding?.value}px` : padding?.value ?? "0px"))
const top = computed(() => position?.value === "top" || position?.value === undefined)
const bottom = computed(() => !top.value)
</script>

<template>
  <div class="half-circle-wrapper" v-bind="$attrs">
    <i></i>
    <div class="content" :class="{ top, bottom }"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
div.half-circle-wrapper {
  --s: v-bind(s); /*Size of the circle */
  --p: v-bind(p);

  height: var(--s);
  width: var(--s);
  border-radius: 50% 50% 0 0;
  // padding: var(--p);
  // overflow: hidden;
  color: currentColor;
}
.half-circle-wrapper i,
.half-circle-wrapper::before {
  content: "";
  float: left;
  height: 100%;
  width: 50%;
  shape-outside: radial-gradient(farthest-side at right, transparent calc(100% - var(--p)), #fff 0);
}
.half-circle-wrapper i {
  float: right;
  shape-outside: radial-gradient(farthest-side at left, transparent calc(100% - var(--p)), #fff 0);
}
.content {
  height: calc(var(--s) / 2);
  width: var(--s);
  text-align: center;
  &.top {
    margin-top: 0;
  }
  &.bottom {
    margin-top: 50%;
  }
}
</style>
