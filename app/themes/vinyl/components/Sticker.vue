<script lang="ts" setup>
  defineProps<{
    title?: string
    artist?: string
  }>()
</script>

<template>
  <div class="flex aspect-square flex-col gap-0 rounded-full bg-primary text-primary-foreground">
    <div class="flex h-1/2 w-full flex-col items-center justify-end bg-transparent pb-6 text-current">
      <div class="w-36">
        <BrandLogo />
      </div>
    </div>
    <div class="flex h-1/2 w-full flex-col items-center justify-start bg-transparent px-8 pt-6 text-current">
      <div class="flex flex-col items-center">
        <div class="text-center text-lg font-bold leading-5">
          {{ title ?? '' }}
        </div>
        <div class="text-xs">
          {{ artist ?? '' }}
        </div>
      </div>
    </div>
  </div>
</template>
