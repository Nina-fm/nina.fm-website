<script lang="ts" setup>
defineProps<{
  title?: string;
  artist?: string;
}>();
</script>

<template>
  <div class="rounded-full bg-primary text-primary-foreground flex flex-col gap-0 aspect-square">
    <div class="text-current bg-transparent w-full h-1/2 flex flex-col justify-end items-center pb-6">
      <div class="w-36">
        <BrandLogo />
      </div>
    </div>
    <div class="text-current bg-transparent w-full h-1/2 flex flex-col justify-start items-center pt-6 px-8">
      <div class="flex flex-col items-center">
        <div class="text-lg font-bold text-center leading-5">{{ title ?? "" }}</div>
        <div class="text-xs">{{ artist ?? "" }}</div>
      </div>
    </div>
  </div>
</template>
