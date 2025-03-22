<script lang="ts" setup>
  const props = defineProps<{
    count: number
  }>()

  const lcdDigitNumber = 3
  const numberCount = computed(() => props.count.toString().length)
  const emptyZeros = computed(() => lcdDigitNumber - numberCount.value)
</script>

<template>
  <Card
    v-if="count"
    class="md:portrait::-right-8 absolute bottom-16 right-10 rounded-2xl border-2 border-muted/20 bg-transparent sm:portrait:-bottom-6 sm:portrait:right-44 md:portrait:-bottom-8 sm:landscape:-right-20 sm:landscape:bottom-36 md:landscape:bottom-28 md:landscape:right-3 lg:landscape:-right-10"
  >
    <div class="m-0 rounded-xl bg-background px-3 py-2">
      <div class="flex items-center gap-3">
        <NinaIcon icon="headphones3" :size="24" class="text-primary/30" />
        <div class="rounded-md bg-muted px-2 py-0">
          <div class="font-lcd text-xl tracking-wider">
            <span v-for="i in emptyZeros" :key="i" class="text-foreground/20">0</span>
            <span class="text-primary">{{ count }}</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style></style>
