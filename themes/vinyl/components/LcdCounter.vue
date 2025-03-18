<script lang="ts" setup>
defineProps<{
  count: number
}>()
</script>

<template>
  <Card
    v-if="count"
    class="absolute right-44 sm:right-24 md:right-0 -bottom-10 sm:bottom-0 md:bottom-28 rounded-2xl bg-transparent border-2 border-muted/20"
  >
    <div class="rounded-xl m-0 px-4 py-2 bg-background">
      <div class="bg-muted rounded-md px-3 py-0">
        <div class="flex gap-4 items-center text-primary">
          <NinaIcon icon="headphones" :size="20" class="text-foreground/20" />
          <div class="font-lcd font-bold text-2xl">{{ count }}</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style></style>
