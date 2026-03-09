<script lang="ts" setup>
  import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <ClientOnly>
    <Toaster
      position="bottom-center"
      :duration="5000"
      :toast-options="{
        classes: {
          icon: 'w-6',
        },
      }"
    />
  </ClientOnly>
</template>

<style></style>
